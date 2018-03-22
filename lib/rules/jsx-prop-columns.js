/**
 * @fileoverview Lines up the keys and values of JSX props.
 * @author Alex Bird
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description : "Lines up the keys and values of JSX props.",
            category    : "Fill me in",
            recommended : false
        },
        fixable : "code", // or "code" or "whitespace"
        schema  : [
            // fill in your schema
        ]
    },

    create: function(context) {
        const sourceCode    = context.getSourceCode();
        const configuration = context.options[0] || {};

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function getPropName(propNode) {
            if (propNode.type === "JSXSpreadAttribute") {
                return sourceCode.getText(propNode.argument);
            }
            return propNode.name.name;
        }

        function getMaxKeyLength(jsxElement) {
            let maxKeyLength = 0;
            jsxElement.attributes.forEach(prop => {
                if (prop.value) {
                    maxKeyLength = Math.max(maxKeyLength, prop.name.name.trim().length);
                }
            });
            return maxKeyLength;
        }

        function getMaxPELength(jsxElement) {
            let maxKeyLength = 0;
            jsxElement.attributes.forEach(prop => {
                if (prop.value) {
                    const preEqualsLength = prop.value.start - " = ".length - prop.name.start;
                    maxKeyLength          = Math.max(maxKeyLength, preEqualsLength);
                }
            });
            return maxKeyLength;
        }

        function generateFixFunction(jsxElement) {
            return function(fixer) {
                let fixers = [];

                const maxKeyLength = getMaxKeyLength(jsxElement);

                jsxElement.attributes.forEach(prop => {
                    if (prop.value) {
                        fixers.push(
                            fixer.replaceTextRange([prop.name.end, prop.value.start], " = ")
                        );
                        fixers.push(
                            fixer.replaceTextRange(
                                [prop.name.start, prop.name.end],
                                prop.name.name.padEnd(maxKeyLength)
                            )
                        );
                        const lines       = sourceCode.getText(prop.value).split(/\r?\n/);
                        let replacement   = lines[0];
                        const closingLine = lines[lines.length - 1];
                        const inset       = closingLine.length - closingLine.trim().length;
                        lines.slice(1).forEach(line => {
                            const subLine = line.slice(inset);
                            replacement   +=
                                "\n" +
                                " ".repeat(maxKeyLength + " = ".length + prop.loc.start.column) +
                                subLine;
                            // replacement += "\n" + subLine;
                        });
                        fixers.push(
                            fixer.replaceTextRange([prop.value.start, prop.value.end], replacement)
                        );
                    }
                });

                return fixers;
            };
        }

        function hasProps(jsxElement) {
            return jsxElement.attributes.length;
        }

        function isMultiline(jsxElement) {
            return jsxElement.loc.start.line !== jsxElement.loc.end.line;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            JSXOpeningElement: function(jsxElement) {
                if (!hasProps(jsxElement) || !isMultiline(jsxElement)) {
                    return;
                }

                const maxKeyLength = getMaxPELength(jsxElement);
                let foundFault     = false;

                jsxElement.attributes.forEach(prop => {
                    if (!prop.value) {
                        return true;
                    }
                    const preEqualsLength = prop.value.start - " = ".length - prop.name.start;
                    if (preEqualsLength !== maxKeyLength) {
                        foundFault = true;
                        return false;
                    }
                });

                if (foundFault) {
                    context.report({
                        node    : jsxElement,
                        message : "Prop keys and values must be spaced out into distracting columns",
                        fix     : generateFixFunction(jsxElement)
                    });
                }
            }
        };
    }
};
