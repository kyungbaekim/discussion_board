var mongoose = require('mongoose');
var Posts = mongoose.model('Posts');
var Topics = mongoose.model('Topics');
var Users = mongoose.model('Users');

module.exports = {
  index: function(req, res) {
    Posts.find({}, function(err, posts){
      if(err){
        res.json(err);
      }
      else{
        res.json(posts);
      }
    })
  },
  create: function(req, res) {
    console.log(req.body, req.params.id);
    Topics.findOne({_id: req.params.id}, function(err, topic){
      var post = new Posts({post: req.body.post, like: 0, dislike: 0,  _user: req.body.poster_id, _topic: req.body.topic_id});
      post.save(function(err){
        if(err){
          console.log('Error occurred while saving your post', err);
        }
        else{
          topic.posts.push(post._id);
          topic.save(function(err, topic) {
            if(err) {
              res.json({message: 'Error occurred while updating your message', error: topic.errors});
            } else {
              Users.findOne({_id: req.body.poster_id}, function(err, user){
                user.posts.push(post._id);
                user.save(function(err, user) {
                  if(err) {
                    res.json({message: 'Error occurred while updating your message', error: user.errors});
                  } else {
                    console.log('your topic successfully added!', user);
                    res.json(user);
                  }
                })
              });
            }
          });
        }
      });
    });
  },
  update_like: function(req, res) {
    Posts.update({_id: req.params.id}, {$inc: {like: 1}}, function(err, post) {
      if(err){
        console.log(err);
      }
      else{
        res.json(post);
      }
    })
  },
  update_dislike: function(req, res) {
    Posts.update({_id: req.params.id}, {$inc: {dislike: 1}}, function(err, post) {
      if(err){
        console.log(err);
      }
      else{
        res.json(post);
      }
    })
  }
}
