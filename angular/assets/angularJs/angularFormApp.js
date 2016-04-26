welcome.controller('loginController',['$scope','$rootScope','$http','$location','AuthenticationService',
function ($scope, $rootScope,$http,$location,AuthenticationService)
{   

    $scope.user = '';
    $scope.password = '';

    $scope.checkLogin = function () {



        data = {};
        data['email'] = $scope.user;
        data['password'] = $scope.password;
        AuthenticationService.ClearCredentials();

        AuthenticationService.Login($scope.user, $scope.password, function(response) {

                if(response.status == "success") {

                    
                    AuthenticationService.SetCredentials($scope.user, response.id_user , response.nama_depan , response.nama_belakang);
                    $location.path('home');

                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                    alert(response.message);
                }
            });

    };


}]);


welcome.controller('usersController',['$scope','$http','$location','$httpParamSerializerJQLike',
function ($scope,$http,$location,$httpParamSerializerJQLike)
{   
    
    $http({
        method:'post',
        url:'angular_controller/getAllUser',
        //data : $scope.user, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    }).success(function (data)
    {
          $scope.registrations=data;
    });



    $scope.deleteData = function(user_id){

        var data = {};
        if(confirm("Are you sure want to delete?")){

            data['user_id'] = user_id;

            $http({
                url: 'angular_controller/deleteUserData/',
                method: "POST",
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                data:$httpParamSerializerJQLike(data)

            }).success(function (data)
            {       
                alert("success to delete!!");
                //$location.path('userdata');
                window.location.reload();
                
            });
        }


    }
    
    //alert(1);



}]);


welcome.controller('homeController',['$scope','$rootScope','$http','$location','AuthenticationService',
function ($scope, $rootScope,$http,$location,AuthenticationService)
{   

        $scope.fullname = $rootScope.globals.currentUser.fullname;
        //console.log($rootScope.globals.currentUser);
        //$scope = $rootScope.globals.currentUser;
        $scope.logout = function(){

            $http({
                    url: 'angular_controller/logOut/',
                method: "POST",
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 }
                

            }).success(function (data)
            {      
                //$location.path('userdata');   
                
            });
            

            AuthenticationService.ClearCredentials();  
            alert("Logout!!!");

            $location.path('login');
        }
        
}]);


welcome.controller('logoutController',['$scope','$rootScope','$http','$location','AuthenticationService',
function ($scope, $rootScope,$http,$location,AuthenticationService)
{   
        
        $scope.logout = function(){


            $http({
                    url: 'angular_controller/logOut/',
                method: "POST",
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 }
                

            }).success(function (data)
            {      
                //$location.path('userdata');   
                
            });
            

            AuthenticationService.ClearCredentials();  
            alert("Logout!!!");

            $location.path('login');
        }
        
}]);




welcome.controller('addUserController',['$scope','$rootScope','$http','$location','AuthenticationService','$httpParamSerializerJQLike',
function ($scope, $rootScope,$http,$location,AuthenticationService,$httpParamSerializerJQLike)
{   
        var data = {};
        $scope.addNewUser = function(){


            if(confirm("Are you sure want to save?")){
                data['nama_depan'] = $scope.nama_depan;
                data['nama_belakang'] = $scope.nama_belakang;
                data['email'] = $scope.email;
                data['password'] = $scope.password;
                data['alamat'] = $scope.alamat;
                data['notlp'] = $scope.notlp;
                data['sex'] = $scope.sex;
                

                $http({
                    url: 'angular_controller/addNewUserCtrl/',
                    method: "POST",
                    headers: {
                       'Content-Type': 'application/x-www-form-urlencoded'
                     },
                    data:$httpParamSerializerJQLike(data)

                }).success(function (data)
                {      


                    if(data.message =="Success"){
                        alert("Data Berhasli disimpan!!");
                         
                    }
                    else{
                        alert("Failed!!");
                    }

                    $location.path('userdata');   
                    
                });
            }
            

        }
        
}]);






welcome.controller('profileEditController',['$scope','$rootScope','$http','$location','$routeParams','AuthenticationService','$httpParamSerializerJQLike',
function ($scope, $rootScope,$http,$location,$routeParams,AuthenticationService,$httpParamSerializerJQLike)
{   

    $scope.user_id = $routeParams.user_id;
    
       var data={};

        data['user_id'] = $scope.user_id;


        $http({
            url: 'angular_controller/getDetailData/',
            method: "POST",
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
            data:$httpParamSerializerJQLike(data)

        }).success(function (data)
        {       
            
            $scope.nama_depan = data[0].nama_depan;
            $scope.nama_belakang = data[0].nama_belakang;
            $scope.email = data[0].email;
            $scope.alamat = data[0].Alamat;
            $scope.notlp = data[0].NoTlp;
            $scope.sex = data[0].sex;
            
        });
        


    $scope.saveProfile = function(){
        data['nama_depan'] = $scope.nama_depan;
        data['nama_belakang'] = $scope.nama_belakang;
        data['email'] = $scope.email;
        data['alamat'] = $scope.alamat;
        data['notlp'] = $scope.notlp;
        data['sex'] = $scope.sex;
        data['user_id'] = $scope.user_id;

        $http({
            url: 'angular_controller/updateDataProfile/',
            method: "POST",
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
            data:$httpParamSerializerJQLike(data)

        }).success(function (data)
        {      


            if(data.message =="Success"){
                alert("Data Berhasli disimpan!!");
                 
            }
            else{
                alert("Failed!!");
            }

            $location.path('userdata');   
            
        });


    }
}]);


welcome.controller('profileController',['$scope','$rootScope','$http','$location','AuthenticationService',
function ($scope, $rootScope,$http,$location,AuthenticationService)
{   


    $scope.user_id = $rootScope.globals.currentUser.user_id;
    


    Object.toparams = function ObjecttoParams(obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    
       var data={};

        data['user_id'] = $scope.user_id;

        $http({
            url: 'angular_controller/getDetailData/',
            method: "POST",
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
            data:Object.toparams(data)

        }).success(function (data)
        {       
            
            $scope.nama_depan = data[0].nama_depan;
            $scope.nama_belakang = data[0].nama_belakang;
            $scope.email = data[0].email;
            $scope.alamat = data[0].Alamat;
            $scope.notlp = data[0].NoTlp;
            $scope.sex = data[0].sex;
            
        });
        


    $scope.saveProfile = function(){


        data['nama_depan'] = $scope.nama_depan;
        data['nama_belakang'] = $scope.nama_belakang;
        data['email'] = $scope.email;
        data['alamat'] = $scope.alamat;
        data['notlp'] = $scope.notlp;
        data['sex'] = $scope.sex;
        data['user_id'] = $scope.user_id;

        

        $http({
            url: 'angular_controller/updateDataProfile/',
            method: "POST",
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
            data:Object.toparams(data)

        }).success(function (data)
        {      


            if(data.message =="Success"){
                alert("Data Berhasli disimpan!!");
                 
            }
            else{
                alert("Failed!!");
            }

            $location.path('profile');   
            
            
            
        });


    }


}]);
