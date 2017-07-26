app.controller('dashboardCtrl', function ($scope, firebaseService, $interval) {
    $scope.options = [
        {
            name: "Joyería",
            folder: "jewerlyImages"
        },
        {
            name: "Categorías",
            folder: "categoriesImages"
        },
        {
            name: "Slider",
            folder: "slidersImages"
        }
    ];
    $scope.categories = firebaseService.getNodeArray("categories");
    $scope.jewerlies = firebaseService.getNodeArray("jewerly");
    $scope.jewerlyFeatured = firebaseService.getNodeObject("jewerlyFeatured");

    function showAlert(typeAlert, message) {
        $scope
        switch (typeAlert) {
            case 0:
                //Error case
                break;
            case 1:
                //Inform caded
                break;
            case 2:
                //
                rebak;

            default:
                break;
        }
        $scope.infoAlert = true;
        $interval(function () {
            $scope.infoAlert = false;
        }, 3000, 1);
    }


    $scope.changeOption = function (index) {
        $scope.selectedOption = ($scope.selectedOption !== index) ? index : -1;
    };

    $scope.addNewDocument = function (document, arrayDocument, index) {
        arrayDocument.$add(document).then(function (ref) {
            let id = ref.key;
            if ($scope.files && $scope.files.length > 0) {
                var uploadTask = firebaseService.uploadFile($scope.options[index].folder + "/" + id, $scope.files[0]);
                uploadTask.$complete(function () {
                    // $(".alert").show('slow');
                });
                uploadTask.$error(function (err) {
                    console.log(err);
                });
            }

        }, function (err) {
            console.log(err);
        });
        for (var key in document) {
            if (document.hasOwnProperty(key)) {
                document[key] = "";
            }
        }
        showAlert();
    };

    $scope.filesChanged = function (elm) {
        $scope.files = elm.files;
        console.log($scope.files);
        $scope.$apply();
    };
});