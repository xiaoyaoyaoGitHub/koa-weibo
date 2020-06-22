module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2020": true
    },
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["warn", "single", { "avoidEscape": true, "allowTemplateLiterals": true }]
    },
};
