module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "linebreak-style": 0,
    'no-plusplus': 'off',
    "no-shadow": "off",
    "eol-last": 0,
    "no-console": [
      "warn",
      { "allow": ["clear", "info", "error", "dir", "trace", "log"] }
     ]
  },
};
