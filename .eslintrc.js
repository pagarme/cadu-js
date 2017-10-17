module.exports = {
  extends: ['pagarme-base'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
}
