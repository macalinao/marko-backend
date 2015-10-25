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
	});

  $urlRouterProvider.otherwise('/dashboard');
})

.controller('AiCtrl', function($scope) {

  $scope.message = "OK, I found something.";

  $scope.outfit = {
    parts: [5, 1, 3],
    weather: true
  };

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


})

.controller('DashboardCtrl', function($scope) {

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
    labels: ['Revenue']
  });

});
