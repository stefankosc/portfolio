const Handlebars = require('handlebars');
const fs = require('fs');

module.exports = generatePage;

var file = fs.readFileSync(__dirname + '/projects.hbs', 'UTF-8');
var myProjectsPage = Handlebars.compile(file);
function generatePage(data) {
    return myProjectsPage(data);
}
