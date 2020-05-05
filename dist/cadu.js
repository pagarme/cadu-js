module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(1),
	    mappersmith = _require.default,
	    configs = _require.configs;
	
	var _require2 = __webpack_require__(2),
	    encodeJson = _require2.default;
	
	var headerAuth = __webpack_require__(3);
	
	var _require3 = __webpack_require__(9),
	    always = _require3.always,
	    equals = _require3.equals,
	    ifElse = _require3.ifElse,
	    assoc = _require3.assoc;
	
	var _require4 = __webpack_require__(10),
	    memberRoutes = _require4.memberRoutes,
	    contactRoutes = _require4.contactRoutes,
	    bankAccountRoutes = _require4.bankAccountRoutes,
	    emailRoutes = _require4.emailRoutes,
	    addressRoutes = _require4.addressRoutes,
	    partnerRoutes = _require4.partnerRoutes,
	    phoneRoutes = _require4.phoneRoutes,
	    countryRoutes = _require4.countryRoutes,
	    economicActivitiesRoutes = _require4.economicActivitiesRoutes,
	    analysisRoutes = _require4.analysisRoutes;
	
	var adapters = __webpack_require__(21);
	
	var _require5 = __webpack_require__(26),
	    validateConfig = _require5.validateConfig;
	
	configs.Promise = __webpack_require__(28);
	
	var chooseHost = ifElse(equals('live'), always('https://api-cadu.stone.com.br'), always('https://api-sandbox-cadu.stone.com.br'));
	
	var connect = function connect() {
	  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  validateConfig(config);
	
	  var environment = config.environment,
	      secret = config.secret,
	      clientApplicationKey = config.clientApplicationKey,
	      userIdentifier = config.userIdentifier;
	
	
	  var library = mappersmith({
	    middlewares: [encodeJson, headerAuth({
	      secret: secret,
	      clientApplicationKey: clientApplicationKey,
	      userIdentifier: userIdentifier
	    })],
	    host: chooseHost(environment),
	    resources: {
	      Member: memberRoutes,
	      Contact: contactRoutes,
	      BankAccount: bankAccountRoutes,
	      Email: emailRoutes,
	      Address: addressRoutes,
	      Partner: partnerRoutes,
	      Phone: phoneRoutes,
	      Country: countryRoutes,
	      EconomicActivity: economicActivitiesRoutes,
	      Analysis: analysisRoutes
	    }
	  });
	
	  return assoc('adapters', adapters, library);
	};
	
	module.exports = {
	  connect: connect,
	  adapters: adapters
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("mappersmith");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("mappersmith/middlewares/encode-json");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hmacSha256 = __webpack_require__(4);
	var encodeBase64 = __webpack_require__(5);
	var encodeHex = __webpack_require__(6);
	var encodeUTF8 = __webpack_require__(7);
	var moment = __webpack_require__(8);
	
	var _require = __webpack_require__(9),
	    join = _require.join,
	    replace = _require.replace,
	    toLower = _require.toLower,
	    toUpper = _require.toUpper;
	
	var createAuthorization = function createAuthorization(request, config) {
	  var secret = config.secret,
	      clientApplicationKey = config.clientApplicationKey,
	      userIdentifier = config.userIdentifier;
	
	
	  var schema = 'CADU';
	  var timestamp = moment().utc().unix();
	  var method = request.method();
	  var cleanUrl = replace(/\?.+/g, '', request.url());
	
	  var macValues = [toLower(schema), clientApplicationKey, toUpper(method), cleanUrl, timestamp];
	
	  var macString = join('.', macValues);
	
	  var macSHA256 = hmacSha256(macString, secret);
	  var macHex = toUpper(macSHA256.toString(encodeHex));
	  var macUTF8 = encodeUTF8.parse(macHex);
	  var macBase64 = encodeBase64.stringify(macUTF8);
	
	  var id = 'id="' + clientApplicationKey + '",';
	  var ts = 'ts="' + timestamp + '",';
	  var mac = 'mac="' + macBase64 + '"';
	
	  var authorizationValues = [schema, id, ts, mac];
	
	  var Authorization = join(' ', authorizationValues);
	
	  var header = { Authorization: Authorization };
	
	  if (method !== 'get') {
	    header['User-Identifier'] = userIdentifier;
	  }
	
	  return header;
	};
	
	var HeaderAuth = function HeaderAuth(authConfig) {
	  return function () {
	    return {
	      request: function request(_request) {
	        return _request.enhance({
	          headers: createAuthorization(_request, authConfig)
	        });
	      }
	    };
	  };
	};
	
	module.exports = HeaderAuth;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("crypto-js/hmac-sha256");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("crypto-js/enc-base64");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("crypto-js/enc-hex");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("crypto-js/enc-utf8");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var memberRoutes = __webpack_require__(11);
	var contactRoutes = __webpack_require__(12);
	var bankAccountRoutes = __webpack_require__(13);
	var emailRoutes = __webpack_require__(14);
	var addressRoutes = __webpack_require__(15);
	var partnerRoutes = __webpack_require__(16);
	var phoneRoutes = __webpack_require__(17);
	var countryRoutes = __webpack_require__(18);
	var economicActivitiesRoutes = __webpack_require__(19);
	var analysisRoutes = __webpack_require__(20);
	
	module.exports = {
	  memberRoutes: memberRoutes,
	  contactRoutes: contactRoutes,
	  bankAccountRoutes: bankAccountRoutes,
	  emailRoutes: emailRoutes,
	  addressRoutes: addressRoutes,
	  partnerRoutes: partnerRoutes,
	  phoneRoutes: phoneRoutes,
	  countryRoutes: countryRoutes,
	  economicActivitiesRoutes: economicActivitiesRoutes,
	  analysisRoutes: analysisRoutes
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var memberAPI = '/membership/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: memberAPI
	  },
	
	  byId: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: memberAPI
	  },
	
	  update: {
	    method: 'put',
	    path: memberAPI + '/{memberKey}'
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	var memberAPI = '/membership/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/contacts'
	  },
	
	  byId: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: memberAPI + '/{memberKey}/contacts'
	  },
	
	  update: {
	    method: 'put',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}'
	  },
	
	  remove: {
	    method: 'delete',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}'
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var memberAPI = '/membership/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/bankaccounts'
	  },
	
	  byId: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/bankaccounts/{bankAccountKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: memberAPI + '/{memberKey}/bankaccounts'
	  },
	
	  update: {
	    method: 'put',
	    path: memberAPI + '/{memberKey}/bankaccounts/{bankAccountKey}'
	  },
	
	  remove: {
	    method: 'delete',
	    path: memberAPI + '/{memberKey}/bankaccounts/{bankAccountKey}'
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	var memberAPI = '/membership/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/emails'
	  },
	  byId: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/emails/{emailKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/emails'
	  },
	
	  update: {
	    method: 'put',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/emails/{emailKey}'
	  },
	
	  remove: {
	    method: 'delete',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/emails/{emailKey}'
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var memberAPI = '/membership/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/addresses'
	  },
	
	  byId: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/addresses/{addressKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: memberAPI + '/{memberKey}/addresses'
	  },
	
	  update: {
	    method: 'put',
	    path: memberAPI + '/{memberKey}/addresses/{addressKey}'
	  },
	
	  remove: {
	    method: 'delete',
	    path: memberAPI + '/{memberKey}/addresses/{addressKey}'
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	var memberAPI = '/membership/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/partners'
	  },
	
	  byId: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/partners/{partnerKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: memberAPI + '/{memberKey}/partners'
	  },
	
	  update: {
	    method: 'put',
	    path: memberAPI + '/{memberKey}/partners/{partnerKey}'
	  },
	
	  remove: {
	    method: 'delete',
	    path: memberAPI + '/{memberKey}/partners/{partnerKey}'
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	var memberAPI = '/membership/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/phones'
	  },
	
	  byId: {
	    method: 'get',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/phones/{phoneKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/phones'
	  },
	
	  update: {
	    method: 'put',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/phones/{phoneKey}'
	  },
	
	  remove: {
	    method: 'delete',
	    path: memberAPI + '/{memberKey}/contacts/{contactKey}/phones/{phoneKey}'
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	var countryAPI = '/membership/v1/countries';
	
	module.exports = {
	  list: {
	    method: 'get',
	    path: countryAPI
	  },
	
	  byId: {
	    method: 'get',
	    path: countryAPI + '/{countryCode}'
	  },
	
	  listSubDivisions: {
	    method: 'get',
	    path: countryAPI + '/{countryCode}/subdivisions'
	  },
	
	  subDivisionById: {
	    method: 'get',
	    path: countryAPI + '/{countryCode}/subdivisions/{subDivisionCode}'
	  },
	
	  listCities: {
	    method: 'get',
	    path: countryAPI + '/{countryCode}/subdivisions/{subDivisionCode}/cities'
	  },
	
	  cityById: {
	    method: 'get',
	    path: countryAPI + '/{countryCode}/subdivisions/{subDivisionCode}/cities/{cityCode}'
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	var economicActivitioesAPI = '/membership/v1/economicactivities';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: economicActivitioesAPI
	  },
	
	  byId: {
	    method: 'get',
	    path: economicActivitioesAPI + '/{key}'
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var riskAPI = '/risk/v1/members';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: riskAPI + '/{memberKey}/analyses'
	  },
	
	  byId: {
	    method: 'get',
	    path: riskAPI + '/{memberKey}/analyses/{analysisKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: riskAPI + '/{memberKey}/analyses'
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pagarmeRecipientAdapter = __webpack_require__(22);
	var pagarmeBankAccountAdapter = __webpack_require__(23);
	var pagarmeAddressAdapter = __webpack_require__(24);
	var pagarmeRiskAnalysisAdapter = __webpack_require__(25);
	
	module.exports = {
	  pagarme: {
	    address: pagarmeAddressAdapter,
	    bankAccount: pagarmeBankAccountAdapter,
	    recipient: pagarmeRecipientAdapter,
	    riskAnalysis: pagarmeRiskAnalysisAdapter
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var moment = __webpack_require__(8);
	var bankAccountAdapter = __webpack_require__(23);
	var addressAdapter = __webpack_require__(24);
	
	var _require = __webpack_require__(9),
	    always = _require.always,
	    anyPass = _require.anyPass,
	    applySpec = _require.applySpec,
	    complement = _require.complement,
	    evolve = _require.evolve,
	    filter = _require.filter,
	    has = _require.has,
	    ifElse = _require.ifElse,
	    isEmpty = _require.isEmpty,
	    isNil = _require.isNil,
	    of = _require.of,
	    path = _require.path,
	    pathEq = _require.pathEq,
	    pathSatisfies = _require.pathSatisfies,
	    propEq = _require.propEq,
	    pipe = _require.pipe,
	    prop = _require.prop,
	    reject = _require.reject,
	    replace = _require.replace,
	    uniq = _require.uniq,
	    __ = _require.__;
	
	var isNotNil = complement(isNil);
	var pathIsNotNil = pathSatisfies(isNotNil);
	var hasTradingName = pathIsNotNil(['register_information', 'trading_name']);
	
	var isIndividual = pathEq(['register_information', 'type'], 'individual');
	
	var legalNameCompany = ifElse(isIndividual, path(['register_information', 'name']), path(['register_information', 'company_name']));
	
	var tradeNameCompany = ifElse(isIndividual, path(['register_information', 'name']), ifElse(hasTradingName, path(['register_information', 'trading_name']), path(['register_information', 'company_name'])));
	
	var legalName = ifElse(has('register_information'), legalNameCompany, prop('legal_name'));
	
	var tradeName = ifElse(has('register_information'), tradeNameCompany, prop('legal_name'));
	
	var documentTypeCode = ifElse(__, always(2), always(1));
	
	var personCode = ifElse(has('register_information'), documentTypeCode(isIndividual), documentTypeCode(propEq('document_type', 'cpf')));
	
	var taxId = ifElse(has('register_information'), path(['register_information', 'document_number']), prop('document_number'));
	
	var formatedBirthDate = function formatedBirthDate(register) {
	  return moment(register.register_information.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
	};
	
	var birthdate = ifElse(path(['register_information', 'birthdate']), formatedBirthDate, always(null));
	
	var bankAccounts = ifElse(has('BankAccount'), pipe(prop('BankAccount'), bankAccountAdapter, of), always(null));
	
	var hasAddress = anyPass([path(['register_information', 'address']), path(['register_information', 'addresses']), path(['register_information', 'main_address'])]);
	
	var getAddresses = function getAddresses(recipient) {
	  var addressesArray = [];
	
	  if (hasAddress(recipient)) {
	    var _recipient$register_i = recipient.register_information,
	        _recipient$register_i2 = _recipient$register_i.addresses,
	        addresses = _recipient$register_i2 === undefined ? [] : _recipient$register_i2,
	        address = _recipient$register_i.address,
	        main_address = _recipient$register_i.main_address;
	
	
	    if (isIndividual(recipient)) {
	      addressesArray.push(addressAdapter(address));
	    } else {
	      addressesArray = addresses.map(addressAdapter);
	      addressesArray.push(addressAdapter(main_address));
	    }
	  }
	
	  return uniq(addressesArray);
	};
	
	var notEmpty = complement(isEmpty);
	var filterNotNil = filter(isNotNil);
	var filterNotEmpty = filter(notEmpty);
	
	var recipient = applySpec({
	  legalName: legalName,
	  tradeName: tradeName,
	  taxId: taxId,
	  legalPersonalityId: personCode,
	  taxIdTypeId: personCode,
	  birthdate: birthdate,
	  motherName: path(['register_information', 'mother_name']),
	  bankAccounts: bankAccounts,
	  addresses: getAddresses,
	  websiteUrl: path(['register_information', 'site_url'])
	});
	
	var rejectNullOrEmpty = reject(isNil);
	
	var caduUnsafeCharsReg = /[\\|\n]/g;
	var replaceUnsafeChars = replace(caduUnsafeCharsReg, '');
	
	var parseRecipient = evolve({
	  legalName: replaceUnsafeChars,
	  tradeName: replaceUnsafeChars
	});
	
	module.exports = pipe(rejectNullOrEmpty, recipient, filterNotEmpty, filterNotNil, parseRecipient);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(9),
	    applySpec = _require.applySpec,
	    prop = _require.prop,
	    propEq = _require.propEq,
	    always = _require.always,
	    ifElse = _require.ifElse;
	
	var getAccountTypeId = ifElse(propEq('type', 'conta_corrente'), always(1), always(2));
	
	var adapter = applySpec({
	  countryId: always(76),
	  bankId: prop('bank_code'),
	  branchCode: prop('agencia'),
	  branchCodeCheckDigit: prop('agencia_dv'),
	  accountNumber: prop('conta'),
	  accountNumberCheckDigit: prop('conta_dv'),
	  statusId: always(2),
	  accountTypeId: getAccountTypeId
	});
	
	module.exports = adapter;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(9),
	    always = _require.always,
	    anyPass = _require.anyPass,
	    applySpec = _require.applySpec,
	    is = _require.is,
	    isEmpty = _require.isEmpty,
	    isNil = _require.isNil,
	    pipe = _require.pipe,
	    prop = _require.prop,
	    slice = _require.slice,
	    trim = _require.trim,
	    when = _require.when;
	
	var isString = is(String);
	
	var propAndTrim = function propAndTrim(propName) {
	  return pipe(prop(propName), when(isString, trim));
	};
	
	var complement = pipe(propAndTrim('complementary'), when(isString, slice(0, 63)));
	
	var isEmptyOrNil = anyPass([isEmpty, isNil]);
	var emptyStreetNumber = always('SN');
	
	var entranceNumber = pipe(propAndTrim('street_number'), when(isEmptyOrNil, emptyStreetNumber));
	
	var adapter = applySpec({
	  typeId: always(2),
	  streetName: propAndTrim('street'),
	  entranceNumber: entranceNumber,
	  neighborhood: propAndTrim('neighborhood'),
	  postalCode: propAndTrim('zipcode'),
	  complement: complement,
	  cityName: propAndTrim('city'),
	  countrySubdivisionCode: propAndTrim('state'),
	  countryId: always(76)
	});
	
	module.exports = adapter;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var recipientAdapter = __webpack_require__(22);
	
	var _require = __webpack_require__(9),
	    always = _require.always,
	    applySpec = _require.applySpec,
	    assoc = _require.assoc,
	    cond = _require.cond,
	    has = _require.has,
	    of = _require.of,
	    pathEq = _require.pathEq,
	    pipe = _require.pipe,
	    prop = _require.prop,
	    T = _require.T;
	
	var isIndividual = pathEq(['recipient', 'document_type'], 'cpf');
	
	var getPolicyId = cond([[has('policyId'), prop('policyId')], [isIndividual, always(6)], [T, always(5)]]);
	
	var createPolicy = applySpec({
	  id: getPolicyId,
	  forceReanalysis: always(false)
	});
	
	var serviceAgreements = [{
	  products: [{
	    id: 5, // Conta de Pagamento
	    providerId: 5 // Pagar.me
	  }]
	}];
	
	var addServiceAgreements = assoc('serviceAgreements', serviceAgreements);
	
	var policies = pipe(createPolicy, of);
	
	var adapter = applySpec({
	  policies: policies,
	  member: pipe(prop('recipient'), recipientAdapter, addServiceAgreements)
	});
	
	module.exports = adapter;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(9),
	    pluck = _require.pluck,
	    isNil = _require.isNil;
	
	var Joi = __webpack_require__(27);
	
	var configSchema = Joi.object().keys({
	  secret: Joi.string().required(),
	  environment: Joi.string().required().valid(['live', 'sandbox']),
	  clientApplicationKey: Joi.string().required(),
	  userIdentifier: Joi.string().required()
	}).required();
	
	var validateConfig = function validateConfig(config) {
	  var result = Joi.validate(config, configSchema);
	
	  if (!isNil(result.error)) {
	    throw new Error(pluck('message', result.error.details));
	  }
	};
	
	module.exports = {
	  validateConfig: validateConfig
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("joi");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ }
/******/ ]);
//# sourceMappingURL=cadu.js.map