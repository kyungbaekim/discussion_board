discussion.controller('UsersController', function(userFactory, $scope, $location, $routeParams){
  $('#name').focus();
  if(Object.keys($routeParams).length > 0){
    userFactory.searchUser($routeParams, function(data){
      console.log(data);
      $scope.searchedUser = data;
    });
  } else {
    userFactory.getUser(function(info){
      $scope.user = info
      console.log($scope.user);
      if($scope.user.sessionUser.loggedIn == false){
        $location.url('/')
      }
    });
    categoryFactory.getCategories(function(categories){
      $scope.categories = categories;
    })
  }
  $scope.login = function(){
    if(Object.keys($scope.user).length > 0){
      userFactory.userLogin($scope.user, function(data) {
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
      if(!info.sessionUser.loggedIn){
        $scope.user = info.sessionUser
        $location.url('/')
      }
      else {
        $scope.error = {message: 'logout failed'}
      }
    })
  };
});

discussion.controller('TopicsController', function(topicFactory, userFactory, postFactory, commentFactory, $scope, $location, $routeParams){
  console.log($routeParams);
  if(Object.keys($routeParams).length > 0){
    topicFactory.getTopic($routeParams, function(data){
      console.log(data);
      $scope.topic = data;
    });
  } else {
    topicFactory.index(function(data) {
      $scope.topics = data;
      console.log($scope.topics);
      $('#topic').focus();
    });
  }
  userFactory.getUser(function(info){
    $scope.user = info
    if($scope.user.sessionUser.loggedIn == false){
      $location.url('/')
    }
  });
  $scope.addTopic = function(){
    var user_id = {id: $scope.user.sessionUser.id};
    topicFactory.addTopic(angular.extend($scope.new_topic, user_id), function(data){
      console.log(data);
      $scope.topics = data;
      $scope.new_topic = {};
      $('#topic').focus();
    })
  }
  $scope.searchTopic = function(){
    console.log($scope.topic);
    topicFactory.searchTopic($scope.topic, function(data){
      $scope.topics = data;
    });
  };
  $scope.getTopic = function(topic){
    $location.url('/topic/' + topic._id);
  }
  $scope.getUser = function(user){
    $location.url('/user/' + user);
  }
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
  $scope.logout = function(){
    userFactory.logout(function(info){
      if(!info.sessionUser.loggedIn){
        $scope.user = info.sessionUser
        $location.url('/')
      }
      else {
        $scope.error = {message: 'logout failed'}
      }
    })
  };
});
