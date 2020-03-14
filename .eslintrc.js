module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint', 
  'env': {
    'browser': true,
    'node': true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  'rules': {
    'indent': ['error', 2, { "SwitchCase": 1 }],
    'jsx-quotes': ['error', 'prefer-single'],
    'import/prefer-default-export': ['off', 0],
    'no-console': ['off', 0],
    'import/no-named-as-default': ['off', 0],
    'import/no-named-as-default-member': ['off', 0],
    "max-len": ["error", { "code": 130, "ignoreComments": true, "ignoreTrailingComments": true, "ignoreRegExpLiterals": true }],
    "no-restricted-syntax": "off",
    "class-methods-use-this": "off",
    "react/prop-types": "off",
    "object-curly-newline": "off",
    "no-underscore-dangle": "off",
    "no-shadow": ["error", { "allow": ["error", "result", "value", "id", "index"] }],
    "react/sort-comp": "off",
    "no-param-reassign": "off",
    "no-restricted-globals": "off",
    "no-plusplus": "off",
    "no-case-declarations": "off",
    "no-prototype-builtins": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/no-unused-state": "off",
    "no-unused-expressions": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "react/forbid-prop-types": "off",
    "import/no-cycle": "off",
    "no-confusing-arrow": "off",
    "no-unneeded-ternary": "off",
    "react/jsx-no-target-blank": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-one-expression-per-line": "off",
    "consistent-return": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off"
  }
}