const core = require('@actions/core');
const mto = require('./markdownoutput');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const filePath = core.getInput('filepath');

        // read in markdown file
        const fileContents = mto.readTextFile(filePath);

        // pass to templating
        const parsedTemplates = mto.parseTemplate(fileContents);

        // pass to frontmatter
        const parsedFM = mto.parseMatter(parsedTemplates);

        // process outputs
        core.setOutput('attributes', parsedFM.attributes);
        core.setOutput('body', parsedFM.body);

    } catch (error) {
        core.setFailed(error.message);
    }
}

if (require.main === module) {
    run();
}

module.exports = { run };
