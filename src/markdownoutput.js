const fm = require('front-matter');
const slugify = require("slugify");

// read in markdown file
function readFile(filePath) {
    // throw error if file not found

    // throw error if file unreadable

    return ''; // file contents
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

module.exports = readFile;
module.exports = parseTemplate;
module.exports = parseMatter;
