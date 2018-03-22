eslint-plugin-jsxspacing
========================

An eslint rule to line jsx things up vertically, so they look prettier to people who like that sort of thing ;p E.g. unreformed C++ programmers.

This plugin aims to implement a eslint rule like ``object-spacing``, but for JSX properties.

It is currently a proof of concept that relies on the code already being sensibly formatted, e.g. by running prettier-eslint

## Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies.

Install [Prettier-ESLint](https://github.com/prettier/prettier-eslint) and this plugin:

``` code
npm install --save-dev prettier-eslint eslint-plugin-jsxspacing
```

 ## Configuration

This plugin must be added to the ``plugins`` section in the ``.eslintrc``:

``` json
{
  "plugins": [
    "jsxspacing"
  ]
}
```

# Use rules

This plugin contains one rule only, the ``jsx-prop-columns`` rule:

```json
{
    "rules": {
        "jsxspacing/jsx-prop-columns": "error"
    }
}

```

### Available rules

- [jsx-prop-columns](https://github.com/alexbird/eslint-plugin-jsxspacing/blob/master/docs/rules/jsx-prop-columns.md)

