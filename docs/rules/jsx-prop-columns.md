# Lines up the keys and values of JSX props. (jsx-prop-columns)

**Fixable:** This rule is automatically fixable using the `--fix` flag on the command line.

## Rule Details

This rule aims to align property assignments in columns.

Examples of **incorrect** code for this rule:

```js

<TextInput
    style = {styles.textInput}
    placeholder = "Password"
    defaultValue = "a"
    secureTextEntry = {true}
    onChangeText = {passwordInput =>
                       this.setState({ passwordInput })
                   }
/>

```

Examples of **correct** code for this rule:

```js

<TextInput
    style           = {styles.textInput}
    placeholder     = "Password"
    defaultValue    = "a"
    secureTextEntry = {true}
    onChangeText    = {passwordInput =>
                            this.setState({ passwordInput })
                        }
/>

```

## When Not To Use It

If you don't like it. It's whitespace, welp!

## Further Reading

See also `eslint-plugin-varspacing` and the ESLint built-in `object-spacing`.