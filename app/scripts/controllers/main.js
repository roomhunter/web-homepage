'use strict';

/**
 * @ngdoc function
 * @name UniversityLocatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the UniversityLocatorApp
 */
angular.module('UniversityLocatorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.universities = [
    'Columbia University',
    'New York University'
    ];
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
