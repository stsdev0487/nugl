module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier'],
    plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
    rules: {
        'arrow-parens': 0,
        'react/prop-types': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-wrap-multilines': 0,
        'prettier/prettier': ['warn'],
        'linebreak-style': 0,
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/no-unescaped-entities': 0,
        'react/destructuring-assignment': 0,
        'prefer-destructuring': 0,
        'no-underscore-dangle': 0
    }
};
