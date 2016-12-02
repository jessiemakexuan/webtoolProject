var angShow = angular.module("showapp", []);
angShow.controller('showcontroller', function($scope, $filter, $http) {
    /*sign up page*/
    $scope.sendmsg = function(){
        var mintime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm');
        var name = document.getElementById('getusername').innerHTML;
        // console.log(name);
        var obj = {
            username: name,
            newmsg: $scope.msg,
            msgtime: mintime
        };
        // console.log($scope.msg);
        if($scope.msg!=""&&$scope.msg!=undefined){
            $http.get("app.php?cmd=append&key=messages&value=" + JSON.stringify(obj))
                .success(function (data) {
                    $scope.msg="";
                    $scope.redisResponse = "Updated.";
                    console.log("append success");

                    $http.get("app.php?cmd=get&key=messages", {
                        transformResponse: function(data,headers){
                            JSON.stringify(data);
                            return data;
                        }
                    })
                    .success(function(data,status, headers, config) {
                        console.log("get msg");
                        data = data.slice(12, -2);
                        $scope.messages = angular.fromJson('[' + data + ']');
                        
                    })
                    .error(function(data, status, headers, config){
                        
                    })
                    
                });
        }

    }
    $scope.load = function(){
        $http.get("app.php?cmd=get&key=messages", {
            transformResponse: function(data,headers){
                JSON.stringify(data);
                return data;
            }
        })
        .success(function(data,status, headers, config) {
            console.log("get load");
            data = data.slice(12, -2);
            $scope.messages = angular.fromJson('[' + data + ']');
            
        })
        .error(function(data, status, headers, config){
            
        })
    }
    // /*recall last message*/
    // $scope.recall = function(){
    //     // $scope.input.email = "";
    //     // $scope.input.password = "";
    // }
    $scope.logout = function(){
        var name = document.getElementById('getusername').innerHTML;
        $http.get("app.php?cmd=deleteonline&key="+name)
        .success(function (data, status, headers, config) {
             location.href = "index.html";
           
        })
        .error(function (data, status, header, config) {
            
            console.log(data);
        });
     }

     $scope.online = function(){
        
        $http.get("app.php?cmd=checkonline")
            .success(function (data, status, headers, config) {
             $scope.onlineuser = data;
           
        })
        .error(function (data, status, header, config) {
            
            console.log(data);
        });
     }

});
