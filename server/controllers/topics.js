var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
// DiscussionTopics.plugin(deepPopulate);
var Topics = mongoose.model('Topics');
var Users = mongoose.model('Users');

module.exports = {
  index: function(req, res) {
    Topics.find({}).deepPopulate('_user').exec(function(err, topics){
        if(err){
          res.json(err);
        }
        else {
          res.json(topics);
        }
      })
  },
  create: function(req, res) {
    console.log(req.body);
    Users.findOne({_id: req.params.id}, function(err, user){
      var topic = new Topics({topic: req.body.topic, description: req.body.description, category: req.body.category,  _user: user._id});
      topic.save(function(err){
        if(err){
          console.log('Error occurred while saving your topic', err);
          // Users.find({})
          //   .populate('topics')
          //   .populate('posts')
          //   .populate('comments')
          //   .exec(function(err, data){
          //     if(err){
          //       res.json({error: user.errors});
          //     }
          //     else{
          //       res.json(data);
          //     }
          //   });
        }
        else{
          user.topics.push(topic._id);
          user.save(function(err) {
            if(err) {
              res.json({message: 'Error occurred while updating your message', error: topic.errors});
            } else { // else console.log that we did well and then redirect to the root route
              console.log('your topic successfully added!', topic);
              res.json(topic);
            }
          });
        }
      });
    });
  },
  find: function(req, res) {
    Topics.find({_id: req.params.id}).deepPopulate('_user posts posts._user posts.comments posts.comments._user posts.comments.comment').exec(function(err, topics){
        if(err){
          res.json(err);
        }
        else {
          res.json(topics);
        }
      })
  }
}
