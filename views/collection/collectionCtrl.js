app.controller('collectionCtrl', function ($scope, firebaseService) {
    //  itemsPerPage:(page-1)*itemsPerPage 
    $scope.itemsPerPage = 5;
    $scope.page = 1;
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
    $scope.sliders = firebaseService.getNodeArray("sliders");
    $scope.jewerlyFeatured = firebaseService.getNodeObject("jewerlyFeatured");
    $scope.goToFinal = function (list, itemPerPage) {
        $scope.page = Math.floor(list.length / itemPerPage);
    };
    $scope.getDownloadURL = function (nodeName, document) {
        return firebaseService.getDownload(nodeName, document);
    };


});