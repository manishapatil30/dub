var app = angular.module("DemoApp", ['ngRoute', 'ngCookies', 'angularSpinkit']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            // template: "<h2>Welcome Tutorial Page</h2>"
            templateUrl: "Views/bannerImages.html"
        })
        .when("/bannerImages", {
            templateUrl: "Views/bannerImages.html"
        })
        .when("/categorytrend/:id", {
            templateUrl: "Views/catTrendVideos.html",
            controller: "HomeController"
        })
    // .when("/trendingVideos", {
    //     templateUrl: "Views/trendingVideos.html"
    // })
    // .when("/tutorial", {
    //     templateUrl: "Views/tutorial.html"
    // })
    // .when("/dubshoot", {
    //     templateUrl: "Views/dubshoot.html"
    // })
})

app.controller("HomeController", function ($scope, $http, $window, $route, $routeParams, $cookies, $location) {

    $scope.EmailId = $cookies.getObject("EmailId");
    if ($scope.EmailId == null) {
        window.alert("Please login!");
        window.location.href = "signUp.html";
    }



    $scope.hide = $location.path() != '/bannerImages';

    $scope.params = $routeParams;
    console.log($scope.params.id);

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.prograssing = true;

    $scope.selectLanguage = function (bannerlang) {
        if (bannerlang == 'All') location.reload();
        $scope.prograssing = true;
        $scope.seletedValue = bannerlang;

        $scope.languageResponse = [];
        $http(
            {
                method: "GET",
                url: "https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages?Language=" + $scope.seletedValue
            }
        ).then(function (response) {
            $scope.languageResponse = response.data;
            $scope.daataLang = $scope.languageResponse.BannerImages;
            $scope.prograssing = false;
        }
        )
        $location.path('/bannerImages');
        $scope.videoResponse = [];
        $http(
            {
                method: "GET",
                url: "https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery?Language=" + $scope.seletedValue
            }
        ).then(function (response) {
            $scope.videoResponse = response.data;
            $scope.prograssing = false;
        }
        )
    }
    $scope.myFunction = function () {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }

    // $scope.videoLanguage = function (videolang) {

    //     var videoValue = videolang;

    //     $scope.videoResponse = [];
    //     $http(
    //         {
    //             method: "GET",
    //             url: "https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery?Language=" + videoValue
    //         }
    //     ).then(function (response) {
    //         $scope.videoResponse = response.data;
    //     }
    //     )
    // }

    // $scope.myFunction = function () {
    //     document.getElementById("myDropdown").classList.toggle("show");
    // }

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    //banner.js
    $scope.responseDetails = [];
    $http(
        {
            method: "GET",
            url: "https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery"
        }
    ).then(function (response) {
        $scope.responseDetails = response.data;
        $scope.upp = $scope.responseDetails.ContentDiscovery;
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
        $scope.daata = $scope.Details.BannerImages;

    }
    )

    $scope.ServerR = [];
    $http(
        {
            method: "GET",
            url: " https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery?ID=" + $scope.params.id
        }
    ).then(function (response) {
        $scope.prograssing = false;
        $scope.ServerR = response.data;
        $scope.title = $scope.ServerR.Details.Title;
        $scope.changeID = $scope.ServerR.Details.ID;
        $scope.videoType = $scope.ServerR.Details.Type;
        $scope.disable = $scope.ServerR.ContentDiscovery;
        $scope.disbutton = $scope.disable.length;
        $scope.sameVid = $scope.disable.VideoID;
    }
    )


    $scope.sendAjax = function () {
        $scope.prograssing = true;

        $scope.Details = [];
        $http(
            {
                method: "GET",
                url: "https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages"
            }
        ).then(function (response) {
            $scope.Details = response.data;
            $scope.prograssing = false;
            $scope.daata = $scope.Details.BannerImages;
        }
        )

    }
    $scope.loadddd = function () {
        $scope.prograssing = true;

        $scope.ServerR = [];
        $http(
            {
                method: "GET",
                url: " https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery?ID=" + $scope.params.id
            }
        ).then(function (response) {
            $scope.prograssing = false;
            $scope.ServerR = response.data;
            $scope.title = $scope.ServerR.Details.Title;
            $scope.changeID = $scope.ServerR.Details.ID;
            $scope.videoType = $scope.ServerR.Details.Type;
            $scope.disable = $scope.ServerR.ContentDiscovery;
            $scope.disbutton = $scope.disable.length;
            $scope.sameVid = $scope.disable.VideoID;
        }
        )

    }




    $scope.remove = function (ID) {
        if (confirm("Do you want to delete this banner Image?")) {
            var config = 'contenttype';
            var data = {
                "Status": "0"
            }

            $http.delete("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages/" + ID, JSON.stringify(data), config).then(function (response) {
                location.reload();
                // $route.reload();
            }, function (response) {

            });
        }
        else {
            // location.reload();
        }

    }
    $scope.edit = function (ID) {
        $scope.selectedStoryPreview = ID;
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
    $scope.diss = false;
    $scope.upimg = function () {
        $scope.diss = true;
    }

    $scope.viss = false;
    $scope.upppimg = function () {
        $scope.viss = true;
    }
    $scope.abc = function () {
        alert($scope.newPostImg);
    }




    $scope.newFile = function (input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {

                $('#photo-id').attr('src', e.target.result);
                var canvas = document.createElement("canvas");
                var imageElement = document.createElement("img");

                imageElement.setAttribute = $('<img>', { src: e.target.result });
                var context = canvas.getContext("2d");
                imageElement.setAttribute.load(function () {

                    canvas.width = this.width;
                    canvas.height = this.height;


                    context.drawImage(this, 0, 0);
                    var base64Image = canvas.toDataURL("image/png");

                    let data1 = base64Image.replace(/^data:image\/\w+;base64,/, "");

                    $scope.newImg = data1;


                });

            }
        }

    }
    $scope.newVideoFile = function (input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {

                $('#photo-id').attr('src', e.target.result);
                var canvas = document.createElement("canvas");
                var imageElement = document.createElement("img");

                imageElement.setAttribute = $('<img>', { src: e.target.result });
                var context = canvas.getContext("2d");
                imageElement.setAttribute.load(function () {

                    canvas.width = this.width;
                    canvas.height = this.height;


                    context.drawImage(this, 0, 0);
                    var base64Image = canvas.toDataURL("image/png");

                    let data1 = base64Image.replace(/^data:image\/\w+;base64,/, "");

                    $scope.newVideo = data1;


                });

            }
        }

    }
    $scope.putdata = function () {
        $scope.ImgID = document.getElementById("imgid").value;
        if ($scope.ImgID != "") {
            var data = {
                "ImageURL": $scope.newImg,
                "ContentLink": $scope.ImgID
            }

            var config = 'contenttype';

            $http.put(" https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages/" + $scope.selectedStoryPreview, JSON.stringify(data), config).then(function (response) {

                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
                location.reload();
            }, function (response) {

                // location.reload();
            });
        }
        else {
            alert("Please fill all mandatory field.")
        }

    }

    // on/off
    $scope.onBanner = function (ID) {
        var data = {
            "Status": "1"
        }

        var config = 'contenttype';

        $http.put(" https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages/" + ID, JSON.stringify(data), config).then(function (response) {

            if (response.data)
                $scope.msg = "Post Data Submitted Successfully!";
            location.reload();
        }, function (response) {

            // location.reload();
        });

    }
    $scope.offBanner = function (ID) {
        var data = {
            "Status": "0"
        }

        var config = 'contenttype';

        $http.put(" https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages/" + ID, JSON.stringify(data), config).then(function (response) {

            if (response.data)
                $scope.msg = "Post Data Submitted Successfully!";
            location.reload();
        }, function (response) {

            // location.reload();
        });

    }

    $scope.addCategory = function (cateola, typeola) {

        $scope.ADDCat = document.getElementById("addcat").value;
        // $scope.Type = document.getElementById("type").value;
        if ($scope.ADDCat != "" && typeola != "" && cateola != "") {
            var data = {
                "Status": "0",
                "Type": typeola,
                "Title": $scope.ADDCat,
                "Language": cateola,
            }
            var config = 'contenttype';
            $http.post("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery", JSON.stringify(data))
                .then(function (response) {
                    if (response.data)
                        $scope.msg = "Post Data Submitted Successfully!";
                    location.reload();
                    //   $route.reload();
                    //     $("#leftreload").load(" #leftreload");
                    // parent.leftreload.location.reload();
                    $(document).ready(function () {
                        $route.reload();
                        // var $container = $("#leftreload");
                        // $container.load("adminpanel.html #leftreload ");
                        // var url = 'adminpanel.html';
                        // $('#leftreload').load(url + ' #leftreload');
                        // $("#leftreload").reload();
                        // $("#leftreload").load("adminpanel.html #leftreload");
                        // $("#leftreload").load(" #leftreload");
                    });
                },
                    function (response) {
                        $scope.msg = "Service not Exists";
                        $scope.statusval = response.status;
                        $scope.statustext = response.statusText;
                        $scope.headers = response.headers();
                    });
        }
        else {
            alert("Please fill all mandatory filed.");
        }

    }
    $scope.renameCategory = function () {
        $scope.Type = document.getElementById("type").value;
        if ($scope.Type != "") {
            var data = {
                "Title": $scope.Type
            }

            var config = 'contenttype';

            $http.put("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + $scope.params.id, JSON.stringify(data), config).then(function (response) {

                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
                // location.reload();
                $route.reload();
                $(document).ready(function () {
                    $("#renameCategory").modal("hide");
                });
                $scope.Type = "";
            }, function (response) {

                // location.reload();
            });
        }
        else {
            alert("Please enter category name");
        }

    }

    //addcat

    $scope.onCategory = function (ID) {
        // $scope.Type = document.getElementById("type").value;

        var data = {
            "Status": "1"

        }
        var config = 'contenttype';
        $http.put("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + ID, JSON.stringify(data), config)
            .then(function (response) {
                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
                location.reload();
            },
                function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                });
    }
    $scope.offCategory = function (ID) {
        // $scope.Type = document.getElementById("type").value;

        var data = {
            "Status": "0"

        }
        var config = 'contenttype';
        $http.put("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + ID, JSON.stringify(data), config)
            .then(function (response) {
                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
                location.reload();
            },
                function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                });
    }


    $scope.postImage = function (videola) {


        $scope.Title = document.getElementById("title").value;
        if ($scope.Title != "" && $scope.newPostImg != "" && videola != "" && $scope.newPostImg != "") {
            var data = {
                "Title": $scope.Title,
                "ImageURL": $scope.newPostImg,
                "Language": videola,
                "ContentLink": $scope.newPostImg,
                "Status": 0


            }
            var config = 'contenttype';
            $http.post("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/bannerimaages", JSON.stringify(data), config)
                .then(function (response) {
                    if (response.data)
                        $scope.msg = "Post Data Submitted Successfully!";

                    // $('#reloadpage').reload();
                    // $route.reload();
                    location.reload();
                },
                    function (response) {
                        // location.reload();
                        $scope.msg = "Service not Exists";
                        $scope.statusval = response.status;
                        $scope.statustext = response.statusText;
                        $scope.headers = response.headers();
                    });
        }
        else {
            alert("Please fill all mandatory fields.");
        }


    }
    $scope.abc = function () {
        alert($scope.disbutton);
    }
    // $scope.modalvideo = true;
    $scope.postdata = function () {
        $scope.VidID = document.getElementById("vidid").value;
        if ($scope.VidID != "") {
            var data = {

            }
            var config = 'contenttype';

            $http.put("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + $scope.params.id + "/" + $scope.VidID, JSON.stringify(data), config)
                .then(function (response) {

                    if (response.data)
                        $scope.msg = "Post Data Submitted Successfully!";
                    $scope.modalvideo = response.data.Message;

                    $route.reload();
                    $(document).ready(function () {
                        $("#myModal").modal("hide");
                    });
                    if ($scope.modalvideo == "Video already added") {
                        alert("This VideoID already added");
                    }
                    $scope.VidID = "";

                    // location.reload();
                    // $window.history.back(); 
                    // $route.reload();
                    // $location.path('/categorytrend/'+ $scope.params.id);
                    //  $('#reloadpage').reload();
                    //  $route.go("/categorytrend", { id:  $scope.params.id });
                    //    $route.go('/categorytrend/'+ $scope.params.id);
                }, function (response) {

                    // location.reload();
                });
        }
        else {
            alert("Please Enter Video ID.");
        }

    };
    $scope.postUserData = function () {
        $scope.UserName = document.getElementById("username").value;
        if ($scope.UserName != "") {
            var data = {

            }

            var config = 'contenttype';

            $http.put("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + $scope.params.id + "/" + $scope.VidID, JSON.stringify(data), config)
                .then(function (response) {

                    if (response.data)
                        $scope.msg = "Post Data Submitted Successfully!";
                    $route.reload();
                    $(document).ready(function () {
                        $("#addUser").modal("hide");
                    });
                    $scope.UserName = "";
                    // $('#reloadpage').reload();
                    // location.reload();
                }, function (response) {

                    // location.reload();
                });
        }
        else {
            alert("Please Enter User Id.");
        }
    };
    //trending.js
    $scope.PerPage = 9;
    $scope.currentPage = 0;

    $scope.nextBanner = function () {
        $scope.currentPage += $scope.PerPage;
    }
    $scope.previousBanner = function () {
        $scope.currentPage -= $scope.PerPage;
    }
    $scope.numberOfbannerPages = function () {
        return Math.ceil($scope.daata.length / $scope.PerPage);
    }
    $scope.bannerPages = function () {
        return Math.ceil($scope.daataLang.length / $scope.PerPage);
    }

    $scope.recordsPerPage = 30;
    $scope.startWith = 0;

    $scope.Next = function () {
        $scope.startWith += $scope.recordsPerPage;
    }
    $scope.Previous = function () {
        $scope.startWith -= $scope.recordsPerPage;
    }

    $scope.numberOfPages = function () {
        return Math.ceil($scope.disable.length / $scope.recordsPerPage);
    }
    $scope.deleteVideo = function (VideoID) {
        if (confirm("Do you want to delete the content?")) {
            var config = 'contenttype';
            // var data = { "Status": "0" }
            $http.delete("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + $scope.params.id + "/" + VideoID).then(function (response) {
                // location.reload();
                $route.reload();
            }, function (response) {

            });
        }
        else {
            $route.reload();
            // location.reload();
        }
    }

    $scope.deleteCategory = function () {
        if (confirm("Do you want to delete this Category?")) {
            var config = 'contenttype';
            // var data = { "Status": "0" }
            $http.delete("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + $scope.params.id).then(function (response) {
                // location.reload();
                location.href = "adminpanel.html";
            }, function (response) {

            });
        }
        else {
            $route.reload();
            // location.reload();
        }
    }

    $scope.menudeleteCategory = function (ID) {
        if (confirm("Do you want to delete this Category?")) {
            var config = 'contenttype';
            // var data = { "Status": "0" }
            $http.delete("https://kamda4jhch.execute-api.ap-south-1.amazonaws.com/dev/contentdiscovery/" + ID).then(function (response) {
                location.reload();
            }, function (response) {

            });
        }
        else {
            location.reload();
        }
    }

    var move = function (origin, destination) {
        var temp = $scope.upp[destination];
        $scope.upp[destination] = $scope.upp[origin];
        $scope.upp[origin] = temp;
    };

    $scope.moveUp = function (index) {
        move(index, index - 1);
    };

    $scope.moveDown = function (index) {
        move(index, index + 1);
    };


    $scope.IsDisplay = false;
    $scope.vendDeatils = function () {
        document.getElementById("frm").style.opacity = 0.9;
        $scope.IsDisplay = true;
    }
})