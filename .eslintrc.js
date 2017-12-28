module.exports = {
    "extends": "airbnb",
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "linebreak-style": 0,
      "complexity": 1,
      "eqeqeq": 1,
      "no-else-return": 1,
      "no-unused-vars": 1,
      "indent": [1, 2, {
        "VariableDeclarator": {
          "var": 2,
          "let": 2,
          "const": 3
        }
      }],
      "newline-after-var": 1,
      "no-mixed-spaces-and-tabs": 1,
      "no-tabs": 1,
      "prefer-rest-params": 1,
      "prefer-spread": 1,
    }
};
