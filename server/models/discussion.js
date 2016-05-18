var mongoose = require('mongoose');
var path = require('path');

// create mongoose schema
var DiscussionUsers = new mongoose.Schema({
  name: String,
  topics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Topics'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
}, {timestamps: true});

var DiscussionTopics = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  topic: String,
  description: String,
  category: String,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}]
}, {timestamps: true});

var DiscussionPosts = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  _topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topics'},
  post: String,
  like: Number,
  dislike: Number,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
}, {timestamps: true});

var DiscussionComments = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  _post: {type: mongoose.Schema.Types.ObjectId, ref: 'Posts'},
  comment: String,
}, {timestamps: true});

// we can add validations using the .path() method.
DiscussionUsers.path('name').required(true, 'Please enter your name to login');
DiscussionTopics.path('topic').required(true, 'Topic field cannot be blank');
DiscussionTopics.path('description').required(true, 'Description field cannot be blank');
DiscussionPosts.path('post').required(true, 'Post field cannot be blank');
DiscussionComments.path('comment').required(true, 'Comment field cannot be blank');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
DiscussionTopics.plugin(deepPopulate);

mongoose.model('Users', DiscussionUsers);
mongoose.model('Topics', DiscussionTopics);
mongoose.model('Posts', DiscussionPosts);
mongoose.model('Comments', DiscussionComments);
