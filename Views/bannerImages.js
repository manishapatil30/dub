var app = angular.module("DemoApp", []);
// app.config(function ($routeProvider) {
//     $routeProvider
//         .when("/", {
//             template: "<h2>Welcome Tutorial Page</h2>"
//         })
// })
app.controller("HomeController", function ($scope, $http, $window, $routeParams,$route) {
    $scope.responseDetails = [];
    $http(
        {
            method: "GET",
            url: " https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery"
        }
    ).then(function (response) {
        $scope.responseDetails = response.data;
    }
    )

    $scope.Details = [];
    $http(
        {
            method: "GET",
            url: "https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages"
        }
    ).then(function (response) {
        $scope.Details = response.data;
    }
    )

    $scope.remove = function (ID) {
        if (confirm("Do you want to delete this banner Image?")) {
            var config = 'contenttype';
            var data = {
                "Status": "0"
            }

            $http.delete("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages/" + ID, JSON.stringify(data), config).then(function (response) {
                location.reload();
            }, function (response) {

            });
        }
        else {
            location.reload();
        }


    }

    $scope.uploadFile = function (input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {

                $('#photo-idd').attr('src', e.target.result);
                var canvas = document.createElement("canvas");
                var imageElement = document.createElement("img");

                imageElement.setAttribute = $('<img>', { src: e.target.result });
                var context = canvas.getContext("2d");
                imageElement.setAttribute.load(function () {

                    canvas.width = this.width;
                    canvas.height = this.height;


                    context.drawImage(this, 0, 0);
                    var base64Image = canvas.toDataURL("image/png");

                    let data2 = base64Image.replace(/^data:image\/\w+;base64,/, "");

                    $scope.newPostImg = data2;


                });

            }
        }

    }
    $scope.abc = function () {
        alert($scope.newPostImg);
    }

    $scope.diss = false;
    $scope.upimg = function () {
        $scope.diss = true;
    }

    // $scope.isDisplay = true;
    // $scope.langVisible = false;
    // $scope.selectLanguage = function (bannerlang) {
    //     $scope.isDisplay = false;
    //     $scope.langVisible = true;
    //     var seletedValue = bannerlang;

    //     $scope.languageResponse = [];
    //     $http(
    //         {
    //             method: "GET",
    //             url: "https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages?Language=" + seletedValue
    //         }
    //     ).then(function (response) {
    //         $scope.languageResponse = response.data;
    //     }
    //     )
    // }

    $scope.webpage = function (Contentlink) {
        location.href = "Contentlink";
    }
})