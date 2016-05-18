var mongoose = require('mongoose');
var Users = mongoose.model('Users');
// var Topics = mongoose.model('Topics');
// var Comments = mongoose.model('Comments');
var sessionUser = {loggedIn: false};

module.exports = {
  index: function(req, res) {
    Users.find({})
      .populate('topics')
      .populate('posts')
      .populate('comments')
      .exec(function(err, data){
        if(err){
          res.json(err);
        }
        else{
          console.log(data);
          res.json(data);
        }
      })
  },
  find: function(req, res) {
    Users.findOne({name: req.body.name}, function(err, user){
      if(err){
        res.json(err);
      }
      else {
        if(!user){
          res.json(user);
        } else {
        sessionUser = {
          loggedIn: true,
          name: user.name,
          id: user._id
        }
        res.json({sessionUser: sessionUser})
        // res.json(user);
        }
      }
    })
  },
  create: function(req, res) {
    console.log('In create function', req.body.name);
    var user = new Users({name: req.body.name});
    user.save(function(err, user) {
      // if there is an error console.log that something went wrong!
      if(err) {
        res.json(err);
      }
      else {
        sessionUser = {
          loggedIn: true,
          name: user.name,
          id: user._id
        }
        console.log(sessionUser);
        res.json(user);
      }
    })
  },
  search: function(req, res) {
    Users.find({_id: req.params.id})
      .populate('topics')
      .populate('posts')
      .populate('comments')
      .exec(function(err, data){
        if(err){
          res.json(err);
        }
        else{
          console.log(data);
          res.json(data);
        }
      })
  },
  session_user: function(req, res){
    res.json({status: true, sessionUser: sessionUser})
  },
  logout: function(req, res){
    sessionUser = {loggedIn: false}
    res.json({status: true, sessionUser: sessionUser})
  // },
  // delete: function(req, res) {
  //   Customers.remove({_id: req.params.id}, function(err){
  //     if(err){
  //       console.log(err);
  //     }
  //     else {
  //       res.redirect('/');
  //     }
  //   })
  }
}
