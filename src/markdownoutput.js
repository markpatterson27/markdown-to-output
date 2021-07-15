const fm = require('front-matter');
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

// read in markdown file
function readTextFile(filePath) {

    // throw error if filePath not string
    if (typeof filePath !== 'string') {
        // throw new Error('content not a string');
        throw new TypeError("File path not a string");
    }

    // filePath will be relative to repo root, not to action workspace. need to use full path
    const workspace = process.env.GITHUB_WORKSPACE;
    const fullPath = path.join(workspace, filePath);

    // check file is text file
    // #TODO

    // throw error if file not found
    // if (!fs.existsSync(fullPath)) {
    //   throw new Error(`File ${filePath} could not be found in your project's workspace. You may need the actions/checkout action to clone the repository first.`)
    // }

    try {
        const contents = fs.readFileSync(fullPath, {encoding: 'utf-8'});
        return contents;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`File ${filePath} not found! You may need to use the actions/checkout action to clone the repository first.`);
        }
        throw error;
    }
}

// parse through templating
function parseTemplate(content) {
    return ''; // parsed content
}

// parse through frontmatter
function parseMatter(content) {

    // throw error if not a string
    if (typeof content !== 'string') {
        // throw new Error('content not a string');
        throw new TypeError("Content not a string");
    }

    // parse content
    const { attributes, body } = fm(content);

    // slugify attributes
    let slugAttributes = {};
    for (let k in attributes) {
        slugAttributes[slugify(k, { lower: true, strict: true })] = attributes[k];
    }

    const parsed = {
        attributes: slugAttributes,
        body: body
    };

    // console.log(parsed);

    return parsed; // parsed content

}

module.exports = { readTextFile, parseTemplate, parseMatter };
