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
    $scope.page = 0;
    $scope.categories = firebaseService.getNodeArray("categories");
    $scope.jewerlies = firebaseService.getNodeArray("jewerly");
    $scope.jewerliesTop = firebaseService.getNodeArray("jewerlyTop");
    $scope.jewerlyFeatured = firebaseService.getNodeObject("jewerlyFeatured");
    $scope.sliders = firebaseService.getNodeArray("sliders");
    $scope.auxList = [];
    $scope.selectedOption = -1;

    $scope.login = function (user) {
        $scope.error = "";
        $scope.loading = true;
        firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
            .then(function () {
                $scope.loading = false;
                $scope.loginSucces = true;
                $scope.$apply();
            }).catch(function (error) {
                $scope.loading = false;
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    $scope.error = "contraseña erronea"
                } else if (errorCode === "auth/invalid-email") {
                    $scope.error = "El email ingresado no es valido, por favor ingrese un email válido"
                } else if (errorCode === "auth/user-not-found") {
                    $scope.error = "El correo ingresado no esta registrado"
                }
                else {
                    $scope.error = errorMessage;
                }
                console.log(error);
                $scope.$apply();
            });
    }

    $scope.isTop = function (document) {


    }

    $scope.showCategory = function (document) {
        var id = document.category;
        if (id && id != '' && $scope.categories.length > 0) {
            $scope.categories.forEach((element, index) => {
                if (id === element.$id)
                    document.nameCategory = element.name;
                else if (index + 1 === $scope.categories.length)
                    return;
            });
        } else
            return;
    }

    $scope.isInList = function (document, arrayTmp) {
        var item = document.$id
        arrayTmp.forEach(function (element, index) {
            if (element.$id && element.$id == item) {
                document.isFeatured = true;
                return;
            }
            /* else if ((index + 1) === arrayTmp.length)
                document.isFeatured = false; */
        });
    };


    $scope.goToFinal = function () {
        $scope.page = Math.floor($scope.auxList.length / 5);
    };

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

    $scope.editDocuemnt = function (document) {
        console.log(document);
        switch ($scope.selectedOption) {
            case 0:
                $scope.jewerly = document;
                break;
            case 1:
                $scope.category = document;
                break;
            case 2:
                $scope.slide = document;
                break;
            default:
                break;
        }

        $scope.showList = false;
        return;
    }

    function selectList(index) {
        switch (index) {
            case 0:
                $scope.auxList = $scope.jewerlies;
                break;
            case 1:
                $scope.auxList = $scope.categories;
                break;
            case 2:
                $scope.auxList = $scope.sliders;
                break;
            default:
                $scope.auxList = [];
                break;
        }
        return;
    }

    $scope.getDownloadURL = function (nodeName, document) {
        return firebaseService.getDownload(nodeName, document);
    };


    $scope.changeOption = function (index) {
        $scope.selectedOption = ($scope.selectedOption !== index) ? index : -1;
        selectList(index);
        $scope.showList = false;
    };

    $scope.addNewDocument = function (document, arrayDocument, index) {
        if (document.$id && document.$id != '') {
            arrayDocument.$save(document).then(function (ref) {
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
            /* $scope.jewerly = {};
            $scope.category = {};
            $scope.slider = {}; */
        }
        else {
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
            /* for (var key in document) {
                if (document.hasOwnProperty(key)) {
                    document[key] = "";
                }
            } */

        }
        $scope.jewerly = {};
        $scope.category = {};
        $scope.slide = {};
        showAlert();

    };

    $scope.filesChanged = function (elm) {
        $scope.files = elm.files;
        console.log($scope.files);
        $scope.$apply();
    };
});