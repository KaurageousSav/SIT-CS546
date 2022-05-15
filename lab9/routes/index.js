const path = require('path'); 
const constructorMethod = (app) => {
 
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('static/palindrome.html'));
    });
 
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'File Not found' });
    });
};
 
module.exports = constructorMethod;