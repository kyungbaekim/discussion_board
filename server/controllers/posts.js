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
      var post = new Posts({post: req.body.post, like: 0, dislike: 0,  _user: req.body.poster_id, _topic: req.body.topic_owner_id});
      post.save(function(err){
        if(err){
          console.log('Error occurred while saving your topic', err);
          Topics.findOne({_id: req.params.id}).deepPopulate('_user posts posts._user posts.comments posts.comments._user posts.comments.comment').exec(function(err, topic){
              if(err){
                res.json(err);
              }
              else {
                res.json(topic);
              }
            });
        }
        else{
          topic.posts.push(post._id);
          topic.save(function(err, topic) {
            if(err) {
              res.json({message: 'Error occurred while updating your message', error: topic.errors});
            } else { // else console.log that we did well and then redirect to the root route
              Users.findOne({_id: req.body.poster_id}, function(err, user){
                user.posts.push(post._id);
                user.save(function(err, user) {
                  if(err) {
                    res.json({message: 'Error occurred while updating your message', error: user.errors});
                  } else { // else console.log that we did well and then redirect to the root route
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
  // },
  // search: function(req, res) {
  //   // console.log(req.body);
  //   Products.find({name: new RegExp(req.body.search, 'i')}, function(err, products){
  //     if(err){
  //       console.log(err);
  //     }
  //     else{
  //       res.json(products);
  //     }
  //   })
  // },
  // delete: function(req, res) {
  //   Products.remove({_id: req.params.id}, function(err){
  //     if(err){
  //       console.log(err);
  //     }
  //     else {
  //       res.redirect('/');
  //     }
  //   })
  }
}
