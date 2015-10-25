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

})

.controller('PayCtrl', function($scope) {
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
