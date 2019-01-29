var artists = require('../controllers/artists_controller')

module.exports = function(app) {
    app.get('/api/artists', artists.findAll)
    app.get('/api/artists/:id', artists.findOne)
    app.post('/api/artists', artists.create)
    app.put('/api/artists/:id', artists.update)
    app.delete('/api/artists/:id', artists.delete)

}