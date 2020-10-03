var app = angular.module("DemoApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<h2>Welcome Tutorial Page</h2>"
        })
})
app.controller("EditProfileController", function ($scope, $http, $window, $routeParams,$route) {


    $scope.params = $routeParams;

    console.log(params);

    function vidplay() {
        var video = document.getElementsById("VideoPlayer");
        if (video.paused) {
            video.load();
            video.play();
        } else {
            video.pause();
        }
    }

    $scope.ServerR = [];
    $http(
        {
            method: "GET",
            url: " https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery?ID=" + $scope.params.id
        }
    ).then(function (response) {
        $scope.ServerR = response.data;
    }
    )


    $scope.recordsPerPage = 4;
    $scope.startWith = 0;

    $scope.Next = function () {
        $scope.startWith += $scope.recordsPerPage;
    }
    $scope.Previous = function () {
        $scope.startWith -= $scope.recordsPerPage;
    }
    $scope.deleteVideo = function (VideoID) {
        if (confirm("Do you want to delete the Video?")) {
            var config = 'contenttype';
            var data = { "Status": "0" }
            $http.delete("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + VideoID, JSON.stringify(data), config).then(function (response) {
                location.reload();
            }, function (response) {

            });
        }
        else {
            location.reload();
        }
    }

    $scope.postdata = function () {
        $scope.VidID = document.getElementById("vidid").value;
        var config = 'contenttype';
        $http.post('https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/' + $scope.params.id + '/' + $scope.VidID)
            .then(function (response) {
            },
                function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                });
    };
})