module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ["babel"],
  "rules": {
    // we don't import React directly
    "react/react-in-jsx-scope": 0,
    // .js extension is easier to manage
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    // allow to use while(true) in sagas
    "no-constant-condition": 0,
    // allow to use for..of
    "no-restricted-syntax": 0,

    // allow to use package-like dependency "src"
    "import/extensions": 0,
    "import/no-unresolved": 0,

    // we can export and import both default and named
    "import/prefer-default-export": 0,

    // we don/t use default props
    "react/require-default-props": 0,

    // identifiers like foo_bar are used as server request params
    "camelcase": 0,

    // allow to use meta-component Base
    "react/jsx-no-undef": [2, { "allowGlobals": true }],

    // disable some jsx-a11y rules for now
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-static-element-interactions": 0,

    // we should avoid long JS files
    "max-lines": ["error", {"max": 160, "skipBlankLines": true}],

    // unary operators are useful :)
    "no-plusplus": 0,

    // allows to store dev stuff at devDependencies
    "import/no-extraneous-dependencies":  ["error", {"devDependencies": true}]
  },
  globals: {
    __CLIENT__: true,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
    window: true,
    Base: true
  }
};
