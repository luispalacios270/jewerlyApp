app.controller('cartCtrl', function ($scope, firebaseService, $interval) {
    $scope.jewerlies = firebaseService.getNodeArray("jewerly");
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