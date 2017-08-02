app.controller('homeCtrl', ['$scope', 'firebaseService', function ($scope, firebaseService, $interval) {

    /*   angular.element(document).ready(function () {
        $('.slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true
        });
    }) 

    $scope.owl = {
        items: ["item 1", "item 2"],
        options: {
            loop: true,
            nav: false
        }
    };

    $scope.carouselInitializer = function () {
        $(".sliders").owlCarousel({
            items: 2,
            navigation: true,
            pagination: true,           
        });
    };

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;  */

    $scope.addProductToCart = function (selectedJewerly, quantityProduct) {
        selectedJewerly.quantity = quantityProduct;
        $scope.$parent.total += selectedJewerly.price * selectedJewerly.quantity;
        $scope.$parent.products.push(selectedJewerly)
    };

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
    $scope.categories = firebaseService.getNodeArray("categories");
    $scope.jewerliesTop = firebaseService.getNodeArray("jewerly");
    $scope.sliders = firebaseService.getNodeArray("sliders");
    $scope.jewerlyFeatured = firebaseService.getNodeObject("jewerlyFeatured");

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


}]);