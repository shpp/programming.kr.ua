'use strict';

var app = angular.module('app', ['ngRoute', 'duScroll', 'ngSanitize', 'angularFileUpload']);
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'pages/home.html',
        controller: 'home'
      }).
      when('/news', {
        templateUrl: 'pages/news.html',
        controller: 'news'
      }).
      when('/courses', {
        templateUrl: 'pages/courses.html',
        controller: 'courses'
      }).
      when('/potential', {
        templateUrl: 'pages/potential.html',
        controller: 'potential'
      }).
      when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'about'
      }).
      when('/anketa', {
        templateUrl: 'pages/first-form.html',
        controller: 'first'
      }).
      when('/check', {
        templateUrl: 'pages/check-school-form.html',
        controller: 'check'
      }).
      when('/choose', {
        templateUrl: 'pages/course-form.html',
        controller: 'course'
      }).
      when('/main', {
        templateUrl: 'pages/main-form.html',
        controller: 'main'
      }).
      when('/main-school', {
        templateUrl: 'pages/main-school-form.html',
        controller: 'main'
      }).
      when('/last', {
        templateUrl: 'pages/last-form.html',
        controller: 'last'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true).hashPrefix('!');
  }
]);

app.run(function($rootScope, $location, $anchorScroll, $routeParams, $timeout) {
  FastClick.attach(document.body);
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $timeout(function() {
      $anchorScroll();
    },700);
  });
});

app.directive("scroll", function($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= 500)
        angular.element('#scrollup').fadeIn('slow');
      else
        angular.element('#scrollup').fadeOut('slow');
      scope.$apply();
    });
  };
});

app.directive('newsSlider', function($timeout) {
  return function(scope, elem, attrs) {
    $timeout(function () {
      elem.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        items: 1
      });
    }, 0);
  }
});

app.directive('partnersSlider', function() {
  return function(scope, elem, attrs) {
    elem.owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 500,
      autoplayTimeout: 1500,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1024: {
          items: 4
        },
        1200: {
          items: 5
        }
      }
    });
  }
});

app.directive('mainSlider', function() {
  return function(scope, elem, attrs) {
    elem.owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      items: 1,
      responsive: {
        0: {
          autoplay: false
        },
        770: {
          autoplay: true,
          autoplaySpeed: 500,
          autoplayTimeout: 5000,
          autoplayHoverPause: true
        }
      }
    });
  }
});

app.directive('potentialSlider', function() {
  return function(scope, elem, attrs) {
    var number = 0;
    var bgColors = ['rgb(26, 188, 156)', 'rgb(46, 204, 113)', 'rgb(241, 196, 15)', 'rgb(52, 152, 219)', 'rgb(211, 84, 0)', 'rgb(155, 89, 182)', 'rgb(231, 76, 60)', 'rgb(230, 126, 34)'];
    elem.owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      items: 1,
      dots: false,
      onTranslate : function() {
        elem.css({ 'backgroundColor': bgColors[number] });
        number = (number < 7) ? number + 1 : 0;
      },
      responsive: {
        0: {
          autoplay:false
        },
        768: {
          autoplay: true,
          autoplaySpeed: 1000,
          autoplayTimeout: 6000,
          autoplayHoverPause: true
        }
      }
    });
  }
});

app.directive('ngThumb', ['$window', function($window) {
  var helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function(item) {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function(file) {
      var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  return {
    restrict: 'A',
    template: '<canvas/>',
    link: function(scope, element, attributes) {
      if (!helper.support) return;

      var params = scope.$eval(attributes.ngThumb);

      if (!helper.isFile(params.file)) return;
      if (!helper.isImage(params.file)) return;

      var canvas = element.find('canvas');
      var reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

      function onLoadFile(event) {
        var img = new Image();
        img.onload = onLoadImage;
        img.src = event.target.result;
      }
      function onLoadImage() {
        var width = params.width || this.width / this.height * params.height;
        var height = params.height || this.height / this.width * params.width;
        canvas.attr({ width: width, height: height });
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
      }
    }
  };
}]);