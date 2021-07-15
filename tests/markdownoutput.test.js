const { test, expect } = require('@jest/globals');
const parseMatter = require('../src/markdownoutput');
const mto = require('../src/markdownoutput');

// test readFile
describe("readFile function", () => {
    // test throws file not found error
    // test throws file not readable error
    // test reads mock file correctly
});

// test parseTemplate
describe("parseTemplate function", () => {
    // test throws error if input not string
    // test empty string
    // test populated string
});

// test parseMatter
describe("parseMatter function", () => {
    // test throws error if input not string
    test('throws not string', () => {
        const input = 5;
        // expect(parseMatter(5)).toThrow('content not a string');
        expect(() => {parseMatter(input);}).toThrow(TypeError);
        expect(() => {parseMatter(input);}).toThrow("Content not a string");
    });

    // test no input
    // #TODO
    
    // test empty string
    test("returns empty parsed attributes and body", () => {
        const input = "";

        const expected = {
            attributes: {},
            body: ''
        };

        expect(parseMatter(input)).toEqual(expected);
    });

    // test no front matter in string
    test("returns body with empty parsed attributes", () => {
        const input = "This is some text without front matter content.";

        const expected = {
            attributes: {},
            body: 'This is some text without front matter content.'
        };

        expect(parseMatter(input)).toEqual(expected);
    });

    // test populated string
    test("returns parsed attributes and body", () => {
        const input = `---
title: Front Matter Test
type: basic attributes and body match
---
This is some text that includes front matter content.`;

        const expected = {
            attributes: {
                title: 'Front Matter Test',
                type: 'basic attributes and body match'
            },
            body: 'This is some text that includes front matter content.'
        };

        expect(parseMatter(input)).toEqual(expected);
    });

    // test special characters string
    test("returns special characters in attributes and body", () => {
        const input = `---
t!tle: Front Matter Test
type: special characters match 'n stuff
🌎 ground control: lift-off 🚀
---
This is some text that includes '$pecial characters'.

And multiple lines.`;

        // unslugged
        // const expected = {
        //     attributes: {
        //         't!tle': 'Front Matter Test',
        //         type: 'special characters match \'n stuff',
        //         '🌎 ground control': 'lift-off 🚀'
        //     },
        //     body: 'This is some text that includes \'$pecial characters\'.\n\nAnd multiple lines.'
        // };

        // slugged
        const expected = {
            attributes: {
                'ttle': 'Front Matter Test',
                type: 'special characters match \'n stuff',
                'ground-control': 'lift-off 🚀'
            },
            body: 'This is some text that includes \'$pecial characters\'.\n\nAnd multiple lines.'
        };

        expect(parseMatter(input)).toEqual(expected);
    });
});
