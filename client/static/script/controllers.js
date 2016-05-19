discussion.controller('UsersController', function(userFactory, $scope, $location, $routeParams){
  // userFactory.index(function(data) {
  //   $scope.data = data;
  //   console.log($scope.data);
    $('#name').focus();
  // });
  console.log($routeParams);
  userFactory.searchUser($routeParams, function(data){
    console.log(data);
    $scope.searchedUser = data;
  });
  userFactory.getUser(function(info){
    $scope.user = info
    console.log($scope.user);
    if($scope.user.sessionUser.loggedIn == false){
      $location.url('/')
    }
  });
  $scope.login = function(){
    if(Object.keys($scope.user).length > 0){
      userFactory.userLogin($scope.user, function(data) {
        // console.log(data);
        $location.url('/dashboard')
      });
    }
    else {
      $location.url('/')
      $('#name').focus();
    }
  }
  $scope.logout = function(){
    userFactory.logout(function(info){
      // console.log(info);
      if(!info.sessionUser.loggedIn){
        $scope.user = info.sessionUser
        $location.url('/')
      }
      else {
        $scope.error = {message: 'logout failed'}
        // console.log($scope.error);
      }
    })
  };
});

discussion.controller('TopicsController', function(topicFactory, userFactory, $scope, $location){
  topicFactory.index(function(data) {
    $scope.topics = data;
    console.log($scope.topics);
    $('#topic').focus();
  });
  userFactory.getUser(function(info){
    $scope.user = info
    // console.log($scope.user);
    if($scope.user.sessionUser.loggedIn == false){
      $location.url('/')
    }
  });
  $scope.addTopic = function(){
    var user_id = {id: $scope.user.sessionUser.id};
    // console.log(user_id);
    // console.log(angular.extend($scope.new_topic, user_id));
    topicFactory.addTopic(angular.extend($scope.new_topic, user_id), function(data){
      console.log(data);
      $scope.topics = data;
      $scope.new_topic = {};
      $('#topic').focus();
    })
  }
  $scope.getTopic = function(topic){
    $location.url('/topic/' + topic._id);
  }
  $scope.getUser = function(user){
    $location.url('/user/' + user);
  }
  $scope.logout = function(){
    userFactory.logout(function(info){
      // console.log(info);
      if(!info.sessionUser.loggedIn){
        $scope.user = info.sessionUser
        $location.url('/')
      }
      else {
        $scope.error = {message: 'logout failed'}
        // console.log($scope.error);
      }
    })
  };
});

discussion.controller('TopicController', function(topicFactory, userFactory, postFactory, commentFactory, $scope, $location, $routeParams){
  $('#post').focus();
  userFactory.getUser(function(info){
    $scope.user = info
    // console.log($scope.user);
    if($scope.user.sessionUser.loggedIn == false){
      $location.url('/')
    }
  });
  topicFactory.getTopic($routeParams, function(data){
    console.log(data);
    $scope.topic = data;
  });
  $scope.addPost = function(topic){
    console.log(topic[0], $scope.new_post, $scope.user);
    var info = {topic_id: topic[0]._id, topic_owner_id: topic[0]._user._id, poster_id: $scope.user.sessionUser.id}
    console.log(info);
    postFactory.addPost(angular.extend($scope.new_post, info), function(){
      topicFactory.getTopic($routeParams, function(data){
        $scope.topic = data;
      })
    })
  }
  $scope.addComment = function(post, newComment){
    console.log(post, newComment);
    // console.log(post, $scope.new_comment, $scope.user);
    var info = {post_id: post._id, post_owner_id: post._user._id, commentter_id: $scope.user.sessionUser.id}
    console.log(info);
    commentFactory.addComment(angular.extend(newComment, info), function(){
      topicFactory.getTopic($routeParams, function(data){
        $scope.topic = data;
      })
    })
  }
  $scope.likePost = function(post){
    console.log(post);
    var post_id = {post_id: post};
    postFactory.likePost(post_id, function(){
      topicFactory.getTopic($routeParams, function(data){
        $scope.topic = data;
      })
    })
  }
  $scope.dislikePost = function(post){
    console.log(post);
    var post_id = {post_id: post};
    postFactory.dislikePost(post_id, function(){
      topicFactory.getTopic($routeParams, function(data){
        $scope.topic = data;
      })
    })
  }
  $scope.getUser = function(user){
    $location.url('/user/' + user);
  }
  $scope.logout = function(){
    userFactory.logout(function(info){
      // console.log(info);
      if(!info.sessionUser.loggedIn){
        $scope.user = info.sessionUser
        $location.url('/')
      }
      else {
        $scope.error = {message: 'logout failed'}
        // console.log($scope.error);
      }
    })
  };
});
