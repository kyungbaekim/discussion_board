var users = require('../controllers/users.js');
var topics = require('../controllers/topics.js');
var posts = require('../controllers/posts.js');

module.exports = function(app) {
  app.get('/users', function(req, res) {
    users.index(req, res);
  })

  app.get('/topics', function(req, res) {
    topics.index(req, res);
  })

  app.get('/posts', function(req, res) {
    posts.index(req, res);
  })

  app.post('/find_user', function(req, res) {
    users.find(req, res);
  })

  app.get('/session_user', function(req,res){
    users.session_user(req,res)
  })

  app.post('/create_user', function(req, res) {
    users.create(req, res);
  })

  app.get('/logout', function(req,res){
    users.logout(req,res)
  })

  app.post('/create_topic/:id', function(req, res) {
    topics.create(req, res);
  })

  app.get('/get_topic/:id', function(req, res) {
    topics.find(req, res);
  })

  app.post('/create_post/:id', function(req, res) {
    posts.create(req, res);
  })
}
