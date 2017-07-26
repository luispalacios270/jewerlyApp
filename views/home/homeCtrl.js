app.controller('homeCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService) {
    $scope.categories = firebaseService.getNodeArray("categories");
    $scope.jewerliesTop = firebaseService.getNodeArray("jewerly");
    $scope.jewerlyFeatured = firebaseService.getNodeObject("jewerlyFeatured");
}]);