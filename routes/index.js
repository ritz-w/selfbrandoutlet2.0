const itemRoutes = require('./item_routes')
const artistRoutes = require('./artist_routes')
const userRoutes = require('./user_routes')

module.exports = function(app) {
    itemRoutes(app);
    artistRoutes(app);
    userRoutes(app);
}