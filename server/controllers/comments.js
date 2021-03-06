var mongoose = require('mongoose');
var Posts = mongoose.model('Posts');
var Users = mongoose.model('Users');
var Comments = mongoose.model('Comments');

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
    Posts.findOne({_id: req.params.id}, function(err, post){
      var comment = new Comments({comment: req.body.comment, _user: req.body.commentter_id, _post: req.body.post_id});
      comment.save(function(err){
        if(err){
          console.log('Error occurred while saving your comment', err);
        }
        else{
          post.comments.push(comment._id);
          post.save(function(err) {
            if(err) {
              res.json({message: 'Error occurred while updating your message', error: topic.errors});
            } else {
              Users.findOne({_id: req.body.commentter_id}, function(err, user){
                user.comments.push(comment._id);
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
  }
}
