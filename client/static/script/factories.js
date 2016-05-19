discussion.factory('userFactory', function($http){
  var sessionUser = {};
  var history = {};
  var users = [];
  var factory = {};
  // var getSession = function(){
  //   $http.get('/session_user').success(function(info){
  //     if(info.status){
  //       if(info.sessionUser.loggedIn){
  //         var sessionUser = info.sessionUser
  //         console.log(sessionUser)
  //       }
  //       else{
  //         console.log('Session is not set')
  //       }
  //     }
  //   })
  // }
  // getSession()

  //Restful syntax: index = get all that object
  factory.index = function(callback) {
    // Where do we get access to $http?
    $http.get('/users').success(function(data) {
      // console.log('Data received successfully');
      users = data;
      callback(users);
    })
  }
  factory.userLogin = function(User, callback) {
    // console.log('Sending user login request', User);
    $http.post('/find_user', User).success(function(data) {
      // console.log(data);
      if(!data){
        $http.post('/create_user', User).success(function(user){
          // console.log('User added', user);
          sessionUser = {message: 'user successfully added', user: user};
          callback(sessionUser);
        })
      }
      else {
        sessionUser = {message: 'user already exists', data: data};
        callback(sessionUser);
      }
    })
  }
  factory.getUser = function(callback){
    $http.get('/session_user').success(function(user){
      sessionUser = user;
      callback(sessionUser)
    })
  }
  factory.searchUser = function(user, callback){
    $http.get('/search_user/' + user.id).success(function(data){
      history = data;
      callback(history)
    })
  }
  factory.logout = function(callback){
    $http.get('/logout').success(function(data){
      if(data.status){
        sessionUser = data.sessionUser
      }
      callback(data)
    })
  }
  return factory;
});

discussion.factory('topicFactory', function($http){
  var topics = [];
  var factory = {};

  factory.index = function(callback) {
    $http.get('/topics').success(function(data) {
      // console.log('Data received successfully');
      topics = data;
      callback(topics);
    })
  }
  factory.addTopic = function(newTopic, callback){
    $http.post('/create_topic/' + newTopic.id, newTopic).success(function(topic){
      $http.get('/topics').success(function(data) {
        // console.log('Data received successfully');
        topics = data;
        callback(topics);
      })
    });
  }
  factory.getTopic = function(topic, callback){
    console.log(topic.id)
    $http.get('/get_topic/' + topic.id).success(function(data){
      topic = data;
      // console.log(topic);
      callback(topic);
    });
  }
  return factory;
});

discussion.factory('postFactory', function($http){
  var topic = [];
  var factory = {};
  factory.addPost = function(newPost, callback){
    console.log(newPost);
    $http.post('/create_post/' + newPost.topic_id, newPost).success(function(post){
      // console.log('Data received successfully');
      $http.get('/get_topic/' + topic.id).success(function(data){
        topic = data;
        // console.log(topic);
        callback(topic);
      });
    })
  }
  factory.likePost = function(Post, callback){
    $http.post('/increase_like/' + Post.post_id).success(function(post){
      $http.get('/get_topic/' + topic.id).success(function(data){
        topic = data;
        callback(topic);
      });
    })
  }
  factory.dislikePost = function(Post, callback){
    $http.post('/increase_dislike/' + Post.post_id).success(function(post){
      $http.get('/get_topic/' + topic.id).success(function(data){
        topic = data;
        callback(topic);
      });
    })
  }
  return factory;
});

discussion.factory('commentFactory', function($http){
  var topic = [];
  var factory = {};
  factory.addComment = function(newComment, callback){
    console.log(newComment);
    $http.post('/create_comment/' + newComment.post_id, newComment).success(function(comment){
      // console.log('Data received successfully');
      $http.get('/get_topic/' + topic.id).success(function(data){
        topic = data;
        // console.log(topic);
        callback(topic);
      });
    })
  }
  return factory;
});
