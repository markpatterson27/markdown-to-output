const process = require('process');
const cp = require('child_process');
const path = require('path');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    // process.env['INPUT_FILEPATH'] = path.join(__dirname, '../examples/project.md');  // #TODO process spaces in paths
    // const ip = path.join(__dirname, '../src/index.js');
    process.env['INPUT_FILEPATH'] = 'examples/project.md';
    const ip = 'src/index.js';
    console.log(ip)
    console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
});
