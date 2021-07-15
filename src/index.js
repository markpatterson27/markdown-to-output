const core = require('@actions/core');
const mto = require('./markdownoutput');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const filePath = core.getInput('filepath');

        // read in markdown file

        // pass to templating

        // pass to frontmatter

        // process outputs

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
