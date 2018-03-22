/**
 * @fileoverview Lines up the keys and values of JSX props.
 * @author Alex Bird
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule       = require("../../../lib/rules/jsx-prop-columns"),
    RuleTester = require("eslint").RuleTester;

const parserOptions = {
    ecmaVersion  : 8,
    sourceType   : "module",
    ecmaFeatures : {
        experimentalObjectRestSpread : true,
        jsx                          : true
    }
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const validCode1 =
    "<ListItem\n" +
    "    button\n" +
    "    title          = {`${item.name}`}\n" +
    "    subtitle       = {item.meetings.length}\n" +
    "    chevronColor   = {brandStyle.colors.ui.listChevrons}\n" +
    "    containerStyle = {styles.listContainer}\n" +
    "    onPress        = {() => {\n" +
    "                         this.props.navigation.navigate('MeetingList', item);\n" +
    "                     }}\n" +
    "/>\n";

let ruleTester = new RuleTester({ parserOptions });
ruleTester.run("jsx-prop-columns", rule, {
    valid   : [validCode1],
    invalid : [
        {
            code:
                "<ListItem\n" +
                "    button\n" +
                "    title={`${item.name}`}\n" +
                "    subtitle={item.meetings.length}\n" +
                "    chevronColor={brandStyle.colors.ui.listChevrons}\n" +
                "    containerStyle={styles.listContainer}\n" +
                "    onPress={() => {\n" +
                "        this.props.navigation.navigate('MeetingList', item);\n" +
                "    }}\n" +
                "/>\n",
            output : validCode1,
            errors : [
                {
                    message : "Prop keys and values must be spaced out into distracting columns",
                    type    : "JSXOpeningElement"
                }
            ]
        },
        {
            code:
                "<ListItem\n" +
                "    button\n" +
                "    title={`${item.name}`}\n" +
                "    subtitle       = {item.meetings.length}\n" +
                "    chevronColor   = {brandStyle.colors.ui.listChevrons}\n" +
                "    containerStyle = {styles.listContainer}\n" +
                "    onPress        = {() => {\n" +
                "                         this.props.navigation.navigate('MeetingList', item);\n" +
                "                     }}\n" +
                "/>\n",
            output : validCode1,
            errors : [
                {
                    message : "Prop keys and values must be spaced out into distracting columns",
                    type    : "JSXOpeningElement"
                }
            ]
        },
        {
            code:
                "<ListItem\n" +
                "    button\n" +
                "    title          ={`${item.name}`}\n" +
                "    subtitle       = {item.meetings.length}\n" +
                "    chevronColor   = {brandStyle.colors.ui.listChevrons}\n" +
                "    containerStyle = {styles.listContainer}\n" +
                "    onPress        = {() => {\n" +
                "                         this.props.navigation.navigate('MeetingList', item);\n" +
                "                     }}\n" +
                "/>\n",
            output : validCode1,
            errors : [
                {
                    message : "Prop keys and values must be spaced out into distracting columns",
                    type    : "JSXOpeningElement"
                }
            ]
        }
    ]
});
