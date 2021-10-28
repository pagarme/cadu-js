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
	    encodeJson = _require.default;
	
	var headerAuthPandaMiddleware = __webpack_require__(2);
	var buildGetJwtToken = __webpack_require__(3);
	var forge = __webpack_require__(10).default;
	
	var _require2 = __webpack_require__(10),
	    configs = _require2.configs;
	
	var _require3 = __webpack_require__(9),
	    always = _require3.always,
	    equals = _require3.equals,
	    ifElse = _require3.ifElse,
	    assoc = _require3.assoc;
	
	var _require4 = __webpack_require__(11),
	    memberRoutes = _require4.memberRoutes,
	    contactRoutes = _require4.contactRoutes,
	    bankAccountRoutes = _require4.bankAccountRoutes,
	    emailRoutes = _require4.emailRoutes,
	    addressRoutes = _require4.addressRoutes,
	    partnerRoutes = _require4.partnerRoutes,
	    phoneRoutes = _require4.phoneRoutes,
	    countryRoutes = _require4.countryRoutes,
	    economicActivitiesRoutes = _require4.economicActivitiesRoutes,
	    analysisRoutes = _require4.analysisRoutes,
	    kycProxyAnalysisRoutes = _require4.kycProxyAnalysisRoutes;
	
	var adapters = __webpack_require__(23);
	
	var _require5 = __webpack_require__(28),
	    validateConfig = _require5.validateConfig,
	    validateConnectConfig = _require5.validateConnectConfig;
	
	configs.Promise = __webpack_require__(30);
	
	configs.maxMiddlewareStackExecutionAllowed = 2;
	
	var chooseHost = ifElse(equals('live'), always('https://api-cadu.stone.com.br'), always('https://api-staging-cadu.stone.com.br'));
	
	var chooseHostKycProxy = ifElse(equals('live'), always('https://kyc-proxy.risco.pagar.me'), always('https://kyc-proxy.stg.risco.pagar.me'));
	
	var connect = function connect() {
	  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  validateConnectConfig(config);
	
	  var environment = config.environment,
	      privateKey = config.privateKey,
	      clientId = config.clientId,
	      userAgent = config.userAgent;
	
	
	  var getJwtToken = buildGetJwtToken({
	    environment: environment,
	    privateKey: privateKey,
	    clientId: clientId,
	    userAgent: userAgent
	  });
	
	  var AuthorizationTokenHeader = headerAuthPandaMiddleware(getJwtToken);
	
	  var library = forge({
	    middlewares: [AuthorizationTokenHeader, encodeJson],
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
	
	var connectKycProxy = function connectKycProxy() {
	  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  validateConfig(config);
	
	  var environment = config.environment,
	      privateKey = config.privateKey,
	      clientId = config.clientId,
	      userAgent = config.userAgent;
	
	
	  var getJwtToken = buildGetJwtToken({
	    environment: environment,
	    privateKey: privateKey,
	    clientId: clientId,
	    userAgent: userAgent
	  });
	
	  var AuthorizationTokenHeader = headerAuthPandaMiddleware(getJwtToken);
	
	  var library = forge({
	    middlewares: [AuthorizationTokenHeader, encodeJson],
	    host: chooseHostKycProxy(environment),
	    resources: {
	      Analysis: kycProxyAnalysisRoutes
	    }
	  });
	
	  return assoc('adapters', adapters, library);
	};
	
	module.exports = {
	  connectKycProxy: connectKycProxy,
	  connect: connect,
	  adapters: adapters
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("mappersmith/middlewares/encode-json");

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var handleAuthorizationToken = function handleAuthorizationToken(getJwtToken) {
	  return getJwtToken().then(function (jwtToken) {
	    return jwtToken;
	  });
	};
	
	var headerAuthPandaMiddleware = function headerAuthPandaMiddleware(getJwtToken) {
	  return function () {
	    return {
	      request: function request(_request) {
	        return Promise.resolve(handleAuthorizationToken(getJwtToken)).then(function (token) {
	          var headers = {
	            Authorization: "Bearer " + token.value
	          };
	
	          return _request.enhance({ headers: headers });
	        });
	      },
	      response: function response(next, renew) {
	        return next().catch(function (response) {
	          if (response.status() === 401) {
	            return renew();
	          }
	
	          return next();
	        });
	      }
	    };
	  };
	};
	
	module.exports = headerAuthPandaMiddleware;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var jwt = __webpack_require__(4);
	var moment = __webpack_require__(5);
	
	var _require = __webpack_require__(6),
	    uuidv4 = _require.v4;
	
	var axios = __webpack_require__(7);
	var url = __webpack_require__(8);
	
	var _require2 = __webpack_require__(9),
	    always = _require2.always,
	    equals = _require2.equals,
	    ifElse = _require2.ifElse;
	
	var buildGetJwtToken = function buildGetJwtToken(_ref) {
	  var environment = _ref.environment,
	      privateKey = _ref.privateKey,
	      clientId = _ref.clientId,
	      userAgent = _ref.userAgent;
	  var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var jwtToken = token;
	
	  var chooseAudValueEndpoint = ifElse(equals('live'), always('https://accounts.openbank.stone.com.br/auth/realms/stone_bank'), always('https://sandbox-accounts.openbank.stone.com.br/auth/realms/stone_bank'));
	
	  var chooseRequestTokenEndpoint = ifElse(equals('live'), always('https://accounts.openbank.stone.com.br/auth/realms/stone_bank/protocol/openid-connect/token'), always('https://sandbox-accounts.openbank.stone.com.br/auth/realms/stone_bank/protocol/openid-connect/token'));
	
	  var getToken = function getToken() {
	    var isTokenValid = jwtToken && jwtToken.value && jwtToken.expirationDate && jwtToken.expirationDate >= moment().unix();
	
	    if (isTokenValid) {
	      return Promise.resolve(jwtToken);
	    }
	
	    var now = moment().unix();
	    var expirationDate = now + 15 * 60;
	
	    var payload = {
	      exp: expirationDate,
	      nbf: now,
	      aud: chooseAudValueEndpoint(environment),
	      realm: 'stone_bank',
	      sub: clientId,
	      clientId: clientId,
	      jti: uuidv4(),
	      iat: now,
	      iss: clientId
	    };
	
	    try {
	      var internalToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
	
	      var tokenPayload = {
	        client_id: clientId,
	        grant_type: 'client_credentials',
	        client_assertion: internalToken,
	        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
	      };
	
	      var endpoint = chooseRequestTokenEndpoint(environment);
	      var params = new url.URLSearchParams(tokenPayload);
	
	      return axios.post(endpoint, params, {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded',
	          'User-Agent': userAgent
	        }
	      }).then(function (response) {
	        jwtToken = {
	          value: response.data.access_token,
	          expirationDate: expirationDate
	        };
	        return jwtToken;
	      }).catch(function (errorResponse) {
	        throw new Error('Unsuccessful request - ' + errorResponse);
	      });
	    } catch (error) {
	      throw new Error('Could not generate new token - ' + error);
	    }
	  };
	
	  return getToken;
	};
	
	module.exports = buildGetJwtToken;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("uuid");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("mappersmith");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var memberRoutes = __webpack_require__(12);
	var contactRoutes = __webpack_require__(13);
	var bankAccountRoutes = __webpack_require__(14);
	var emailRoutes = __webpack_require__(15);
	var addressRoutes = __webpack_require__(16);
	var partnerRoutes = __webpack_require__(17);
	var phoneRoutes = __webpack_require__(18);
	var countryRoutes = __webpack_require__(19);
	var economicActivitiesRoutes = __webpack_require__(20);
	var analysisRoutes = __webpack_require__(21);
	var kycProxyAnalysisRoutes = __webpack_require__(22);
	
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
	  analysisRoutes: analysisRoutes,
	  kycProxyAnalysisRoutes: kycProxyAnalysisRoutes
	};

/***/ },
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var riskAPI = '/risk/v2/members/analyses';
	
	module.exports = {
	  all: {
	    method: 'get',
	    path: '' + riskAPI
	  },
	
	  byId: {
	    method: 'get',
	    path: riskAPI + '/{analysisKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: '' + riskAPI
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	var riskAPI = '/risk/v2/members/analyses';
	
	module.exports = {
	  byId: {
	    method: 'get',
	    path: riskAPI + '/{analysisKey}'
	  },
	
	  create: {
	    method: 'post',
	    path: '' + riskAPI
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pagarmeRecipientAdapter = __webpack_require__(24);
	var pagarmeBankAccountAdapter = __webpack_require__(25);
	var pagarmeAddressAdapter = __webpack_require__(26);
	var pagarmeRiskAnalysisAdapter = __webpack_require__(27);
	
	module.exports = {
	  pagarme: {
	    address: pagarmeAddressAdapter,
	    bankAccount: pagarmeBankAccountAdapter,
	    recipient: pagarmeRecipientAdapter,
	    riskAnalysis: pagarmeRiskAnalysisAdapter
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var moment = __webpack_require__(5);
	var bankAccountAdapter = __webpack_require__(25);
	var addressAdapter = __webpack_require__(26);
	
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
	
	var maxLegalOrTradeNameLength = 100;
	var truncateName = function truncateName(name) {
	  return name && name.substring(0, maxLegalOrTradeNameLength);
	};
	
	var recipient = applySpec({
	  legalName: pipe(legalName, truncateName),
	  tradeName: pipe(tradeName, truncateName),
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var recipientAdapter = __webpack_require__(24);
	
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
	    propOr = _require.propOr,
	    T = _require.T;
	
	var isIndividual = pathEq(['recipient', 'document_type'], 'cpf');
	
	var getPolicyId = cond([[has('policyId'), prop('policyId')], [isIndividual, always(6)], [T, always(5)]]);
	
	var createPolicy = applySpec({
	  id: getPolicyId,
	  forceReanalysis: propOr(false, 'forceReanalysis')
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(9),
	    pluck = _require.pluck,
	    isNil = _require.isNil;
	
	var Joi = __webpack_require__(29);
	
	var configSchema = Joi.object().keys({
	  secret: Joi.string().required(),
	  environment: Joi.string().required().valid(['live', 'sandbox']),
	  clientApplicationKey: Joi.string().required(),
	  userIdentifier: Joi.string().required()
	}).required();
	
	var connectConfigSchema = Joi.object().keys({
	  environment: Joi.string().required().valid(['live', 'sandbox', 'test']),
	  privateKey: Joi.object().required(),
	  clientId: Joi.string().required(),
	  userAgent: Joi.string().required()
	}).required();
	
	var validateConfig = function validateConfig(config) {
	  var result = Joi.validate(config, configSchema);
	
	  if (!isNil(result.error)) {
	    throw new Error(pluck('message', result.error.details));
	  }
	};
	
	var validateConnectConfig = function validateConnectConfig(config) {
	  var result = Joi.validate(config, connectConfigSchema);
	
	  if (!isNil(result.error)) {
	    throw new Error(pluck('message', result.error.details));
	  }
	};
	
	module.exports = {
	  validateConfig: validateConfig,
	  validateConnectConfig: validateConnectConfig
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("joi");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ }
/******/ ]);
//# sourceMappingURL=cadu.js.map