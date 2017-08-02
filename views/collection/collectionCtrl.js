app.controller('collectionCtrl', function ($scope, firebaseService, $interval) {
    //  itemsPerPage:(page-1)*itemsPerPage 
    $scope.itemsPerPage = 5;
    $scope.page = 1;
    $scope.options = [{
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

    $scope.checkQualification = function () {
        $scope.selectedJewerly.qualificationArray = new Array($scope.selectedJewerly.qualification);
    }

    $scope.categories = firebaseService.getNodeArray("categories");
    $scope.jewerlies = firebaseService.getNodeArray("jewerly");
    $scope.sliders = firebaseService.getNodeArray("sliders");
    $scope.jewerlyFeatured = firebaseService.getNodeObject("jewerlyFeatured");
    $scope.goToFinal = function (list, itemPerPage) {
        $scope.page = Math.floor(list.length / itemPerPage);
    };
    $scope.getDownloadURL = function (nodeName, document) {
        return firebaseService.getDownload(nodeName, document);
    };

    $scope.addProductToCart = function (selectedJewerly, quantityProduct) {
        selectedJewerly.quantity = quantityProduct;
        let index = $scope.$parent.products.indexOf(selectedJewerly);
        if (index == -1) {
            $scope.$parent.products.push(selectedJewerly);
        } else {
            $scope.$parent.products[index].quantity = selectedJewerly.quantity;
        }
        $scope.isAdded = true;
        $interval(function () {
            $scope.isAdded = false;
        }, 1500, 1);
        $scope.quantityProduct = "";


    };
});