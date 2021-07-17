const core = require('@actions/core');
const github = require('@actions/github');
const mto = require('./markdownoutput');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const filePath = core.getInput('filepath');

        // read in markdown file
        const fileContents = mto.readTextFile(filePath);

        // templates
        const templateVariables = {
            ...github.context
        };

        // pass to templating
        const parsedTemplates = mto.parseTemplate(fileContents, templateVariables);

        // pass to frontmatter
        const parsedFM = mto.parseMatter(parsedTemplates);

        // process outputs
        core.setOutput('attributes', parsedFM.attributes);
        for (let k in parsedFM.attributes) {
            core.setOutput(k, parsedFM.attributes[k]);
        }
        core.setOutput('body', parsedFM.body);

    } catch (error) {
        core.setFailed(error.message);
    }
}

if (require.main === module) {
    run();
}

module.exports = { run };
