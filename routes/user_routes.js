let users = require('../controllers/users_controller')


module.exports = function(app) {
    app.post('/auth/register', users.register);
    app.post('/auth/sign_in', users.sign_in);
}