welcome.controller('loginController',['$scope','$rootScope','$http','$location','authProvider',
function ($scope, $rootScope,$http,$location,authProvider)
{   

    $scope.user = '';
    $scope.password = '';


    Object.toparams = function ObjecttoParams(obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };


    $scope.checkLogin = function () {


        data = {};
        data['email'] = $scope.user;
        data['password'] = $scope.password;
        $http({
            url: 'angular_controller/checkLogin/',
            method: "POST",
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
            data:Object.toparams(data)

        }).success(function (data)
        {   

            //var parsed = JSON.parse(data);

            //console.log(parsed);
            console.log(data);
            //alert(data.status);

            if (data.status == "success") {


                authProvider.setUser(data.id_user);


                console.log('redirect to home : '+data.id_user);
                //alert(data.status);
                console.log('redirect to home : '+authProvider.isLoggedIn());
                $location.path('home');
            }
            else{
                alert( data.status);
              
            }
              
            
        });
    };


}]);


welcome.controller('usersController',['$scope','$http',
function ($scope,$http)
{   
    /*
       $http({
        method:'post',
        url:'http://localhost:81/Codeigniter/index.php/welcome/fetchdata',
        //data : $scope.user, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    }).success(function (data)
    {
          $scope.registrations=data;
    });
    */


     $scope.user = '';
    $scope.password = '';


    $scope.checkLogin = function () {
        
        $http.post("angular_controller/checkLogin/"+$scope.user+"/"+$scope.password).success(function(data){
            //$scope.user = data;
            alert(data);
          });


    };


}]);