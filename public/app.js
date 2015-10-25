angular.module('marko', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('ai', {
    url: '/ai',
    templateUrl: 'templates/ai.html',
    controller: 'AiCtrl'
  }).state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'DashboardCtrl'
  }).state('pay', {
    url: '/pay',
    templateUrl: 'templates/pay.html',
    controller: 'PayCtrl'
	});

  $urlRouterProvider.otherwise('/dashboard');
})

.controller('AiCtrl', function($scope, $http, $interval) {

  $scope.talking = false;

  $scope.toggleTalking = function() {
    $scope.talking = !$scope.talking;
  };

  $scope.$watch('talking', function() {

    setTimeout(function() {

    if ($scope.talking) {

      var siriWaveActive = new SiriWave9({
          container: document.getElementById('siriActive'),
          width: 640,
          height: 70,
          speed: 0.01,
          frequency: 1
      });
      siriWaveActive.start();

    } else {

      var siriWavePassive = new SiriWave9({
          container: document.getElementById('siriPassive'),
          width: 640,
          height: 15,
          speed: 0.01,
          frequency: 1
      });
      siriWavePassive.start();

    }

    }, 0);

  });

  $scope.message = 'Move in front of the camera to begin.';
  $scope.start = false;
  $interval(function() {
    $http.get('/fetch_lol').then(function(data) {
      data = data.data;
      if (!data.message) return;
      $scope.start = true;
      if (data.message !== $scope.message) {
        $scope.message = data.message;
        if (data.outfit) {
          $scope.outfit = {
            parts: data.outfit,
            weather: data.cool
          };
        } else {
          delete $scope.outfit;
        }
      }
    });
  }, 250);


})

.controller('DashboardCtrl', function($scope, $http) {

  Morris.Line({
    element: 'revenueChart',
    data: [
      { y: '2015-01-01', a: 6005 },
      { y: '2015-01-08', a: 6886 },
      { y: '2015-01-15', a: 7325 },
      { y: '2015-01-22', a: 8046 },
      { y: '2015-01-29', a: 7804 },
      { y: '2015-02-05', a: 8463 },
      { y: '2015-02-12', a: 9501 },
      { y: '2015-02-19', a: 9611 },
      { y: '2015-02-26', a: 9444 }
    ],
    xkey: 'y',
    xLabels: ['week'],
    ykeys: ['a'],
    labels: ['Revenue'],
    yLabelFormat: function (x) {
      return '$' + numberWithCommas(x);
    }
  });

  Morris.Line({
    element: 'kioskChart',
    data: [
      { y: '2015-01-01', a: 100 },
      { y: '2015-01-08', a: 121 },
      { y: '2015-01-15', a: 145 },
      { y: '2015-01-22', a: 212 },
      { y: '2015-01-29', a: 200 },
      { y: '2015-02-05', a: 247 },
      { y: '2015-02-12', a: 361 },
      { y: '2015-02-19', a: 370 },
      { y: '2015-02-26', a: 360 }
    ],
    xkey: 'y',
    xLabels: ['week'],
    ykeys: ['a'],
    labels: ['Kiosk Interactions']
  });


  Morris.Bar({
    element: 'popularclothingChart',
    data: [
      { y: 'White Shirt', a: 212 },
      { y: 'Dark Denim Jeans', a: 174 },
      { y: 'Light Blue Shirt', a: 142 },
      { y: 'White Sneakers', a: 133 },
      { y: 'Tan Chinos', a: 110 }
    ],
    xkey: 'y',
    xLabels: ['Clothing Item'],
    ykeys: ['a'],
    labels: ['Number of Purchases']
  });

  Morris.Bar({
    element: 'recommendationrateChart',
    data: [
      { y: 'White Shirt', a: 62 },
      { y: 'Dark Denim Jeans', a: 57 },
      { y: 'Light Blue Shirt', a: 48 },
      { y: 'White Sneakers', a: 40 },
      { y: 'Tan Chinos', a: 33 }
    ],
    xkey: 'y',
    xLabels: ['Clothing Item'],
    ykeys: ['a'],
    labels: ['Kiosk Recommendation Rate'],
    yLabelFormat: function (x) {
      return x.toString() + '%';
    }
  });

})

.controller('PayCtrl', function($scope) {
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
