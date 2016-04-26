var welcome = angular.module('welcome', ['ngRoute','ngCookies']);
welcome.config(function ($routeProvider) {
      
    $routeProvider
      .when("/home", {
        templateUrl:'/ci/assets/angular_pages/home.html',
        controller: "homeController"
    }).when("/login", {
        templateUrl:'/ci/assets/angular_pages/login.html',
        controller: "loginController"
     }).when("/profile", {
        templateUrl:'/ci/assets/angular_pages/profile.html',
        controller: "profileController"
    }).when("/userdata", {
        templateUrl:'/ci/assets/angular_pages/userlist.html',
        controller: "usersController"
    }).when("/editData/:user_id", {
        templateUrl:'/ci/assets/angular_pages/profileEdit.html',
        controller: "profileEditController"
    }).when("/addNewUser", {
        templateUrl:'/ci/assets/angular_pages/addNewUser.html',
        controller: "addUserController"
    })
    .otherwise({
        redirectTo: "/home"
    });
});



angular.module('welcome')
.run(['$rootScope', '$location', '$cookies', '$http',
    function ($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            //$http.defaults.headers.common['Authorization'] = 'Basic'; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
}]);


  
angular.module('welcome')
.factory('AuthenticationService',
    [ '$http', '$cookies', '$rootScope', '$timeout',
    function ( $http, $cookies, $rootScope, $timeout) {
        var service = {};

        //change to string data
        Object.toparams = function ObjecttoParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        };
 
        service.Login = function (username, password, callback) {
            /* Use this for real authentication
             ----------------------------------------------*/

            data['email'] = username;
            data['password'] = password;
            $http({
                url: 'angular_controller/checkLogin/',
                method: "POST",
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                data:Object.toparams(data)

            }).success(function (data)
            {   
                callback(data);
            });


            /*
            $http.post('/api/authenticate', { username: username, password: password })
                .success(function (response) {
                    callback(response);
                });
            */
 
        };
  
        service.SetCredentials = function (username, user_id,nama_depan, nama_belakang) {  
            
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    user_id: user_id,
                    fullname : nama_depan+' '+nama_belakang
                }
            };
            


            /*
            var currentUser = {
                    username: username,
                    user_id: user_id,
                    fullname : nama_depan+' '+nama_belakang
                };
            */

  
            $http.defaults.headers.common['Authorization'] = 'Basic'; // jshint ignore:line


           //var expireDate = new Date();
            //expireDate.setDate(expireDate.getDate() + 1);

            //time in second
            var now = new Date();
            var exp = new Date(now.getTime() + 10*1000);

            
        // Setting a cookie
            $cookies.putObject('globals', $rootScope.globals,{expires: exp});
            //var data1 = $cookies.get('globals');
            //console.log($cookies.getObject('globals'));

        };
  
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        };
  
        return service;
    }]);
  





/*
angular.module('welcome')
.run(['$rootScope', '$location', 'authProvider', function ($rootScope, $location, authProvider) {

        $rootScope.$on('$routeChangeStart', function (event) {
        if (!authProvider.isLoggedIn()) {
          console.log('Home : Redirecting to Login');
          //event.preventDefault();
          $location.path('/login');
        }
        else {
          console.log('ALLOW');
        }
  });
}]);


angular.module('welcome')
  .factory('authProvider', function() {
    var user;
      return {
        setUser : function(aUser){
          user = aUser;
        },
        isLoggedIn : function(){
          return(user)? user : false;
        }
      };
  });
*/