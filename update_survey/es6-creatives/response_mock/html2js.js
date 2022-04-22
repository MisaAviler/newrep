const {readFileSync, writeFileSync} = require('fs');
const path = require('path');

let html = readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
let tpl = readFileSync(path.join(__dirname, './api-creatives.tpl'), 'utf8');

html = html.replace(/\\n/ig, "")
    .replace(/\\'/ig, "'").replace(/\'/ig, 'single_quote')
    .replace(/\\"/ig, '"').replace(/\"/ig, 'double_quote')
    .replace(/\n/g, "\\n");

tpl = tpl.replace('<%=TPL%>', html).replace(/single_quote/ig, '\\\'').replace(/double_quote/ig, '\\\"');

writeFileSync(path.join(__dirname, '../dist/tpl.js'), tpl);
