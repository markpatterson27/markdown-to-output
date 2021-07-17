const process = require('process');
const cp = require('child_process');
const path = require('path');
const core = require('@actions/core');
const action = require('../src/index');

// test outputs triggered
describe("action integration", () => {
    beforeEach(() => {
        jest.spyOn(core, "setOutput").mockImplementation();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // test throws file not found error
    test('sets failed if file not found', () => {
        jest.spyOn(core, "setFailed").mockImplementation();
        process.env['INPUT_FILEPATH'] = 'unknown.md';
        action.run();
        expect(core.setFailed).toHaveBeenCalled();

    });

    // parse empty file
    test('sets empty outputs', () => {
        process.env['INPUT_FILEPATH'] = 'tests/test-files/blank.md';
        action.run();
        expect(core.setOutput).toBeCalledWith("attributes", {});
        expect(core.setOutput).toBeCalledWith("body", '');
    });

    // parse body only file content
    test('sets body output and empty attributes output', () => {
        process.env['INPUT_FILEPATH'] = 'tests/test-files/basic-body.md';
        action.run();
        expect(core.setOutput).toBeCalledWith("attributes", {});
        expect(core.setOutput).toBeCalledWith("body", 'This is some text without front matter content.\n');
    });

    // parse basic front matter file content
    test('sets body output and basic attributes output', () => {
        process.env['INPUT_FILEPATH'] = 'examples/project.md';
        action.run();
        expect(core.setOutput).toBeCalledWith("attributes", {
            title: 'Launch :rocket:',
            columns: 'To do, In progress, Done'
        });
        expect(core.setOutput).toBeCalledWith("body", 'Tasks to complete before initial release.\n');
    });

    // parse special character front matter file content
    test('sets body and attributes outputs with special character', () => {
        process.env['INPUT_FILEPATH'] = 'tests/test-files/special-chars.md';
        action.run();
        expect(core.setOutput).toBeCalledWith("attributes", {
            'ttle': 'Front Matter Test',
            type: 'special characters match \'n stuff',
            'ground-control': 'lift-off 🚀'
        });
        expect(core.setOutput).toBeCalledWith("body", 'This is some text that includes \'$pecial characters\'.\n\nAnd multiple lines.\n');
    });

    // parse templated file content
    test('sets body and attributes outputs with templates', () => {
        process.env['INPUT_FILEPATH'] = 'tests/test-files/templates.md';
        action.run();
        expect(core.setOutput).toBeCalledWith("attributes", {
            title: 'Templating Test',
            person: 'jest tests'
        });
        expect(core.setOutput).toBeCalledWith("body", 'The test action is just tesing.\n');
    });
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    // process.env['INPUT_FILEPATH'] = path.join(__dirname, '../examples/project.md');  // #TODO process spaces in paths
    // const ip = path.join(__dirname, '../src/index.js');
    process.env['INPUT_FILEPATH'] = 'examples/project.md';
    process.env.GITHUB_WORKSPACE = path.join(__dirname, '..');
    const ip = 'src/index.js';
    console.log(ip);
    console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
});
