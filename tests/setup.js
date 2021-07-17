const path = require('path');

Object.assign(process.env, {
    GITHUB_EVENT_PATH: path.join(__dirname, 'fixtures', 'event.json'),
    GITHUB_ACTION: 'test',
    GITHUB_ACTOR: 'jest tests'
})
