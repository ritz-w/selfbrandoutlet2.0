// const verifyToken = require('../auth/verifyToken');

module.exports = function(app) {
    var items = require('../controllers/items_controller.js'),
        userHandlers = require('../controllers/users_controller')
    app.get('/api/items/:id', items.findOne);
    app.get('/api/items', items.findAll);
    app.post('/api/items/:id/add-to-cart', userHandlers.loginRequired, items.addToCart);
    app.post('/api/items/checkout', userHandlers.loginRequired, items.checkout);
    app.put('/api/items/:id/update-cart', userHandlers.loginRequired, items.updateCart);
    app.get('/api/items/artists/:artistId', items.findByArtistId);
    app.post('/api/items', items.create);
    app.delete('/api/items/:id', items.delete)
    app.put('/api/items/:id', items.update)
};