'use strict';

app.controller('mainController', function($scope, $location, $anchorScroll, $document, $timeout, $http, $sce) {
  $scope.isActive = function(route) {
    return route === $location.path();
  }
  $scope.toTheTop = function() {
    $document.scrollTop(0, 500);
  }
  $scope.SkipValidation = function(value) {
    return $sce.trustAsHtml(value);
  }
  $scope.sendMail = function() {
    var selector = angular.element('.mail-text textarea');
    var mailtext = selector.val();

    if (mailtext === '')
      selector.attr("placeholder", "Напишите хоть что-нибудь! :)").focus();
    
    else if (!mailtext.match($scope.regComment))
      angular.element(selector).css({ 'border': '2px solid rgb(231,76,60)' }); 
    
    else {
      mailtext = mailtext.replace(/script/g,' ').replace(/document/g,' ');  
      $http({
        method: 'POST',
        url: 'backend/saveData.php',
        data: $.param({ mailtext: mailtext }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).success(function(data) {
        selector.val('').attr("placeholder", "Ждем Ваши письма!");
      }); 
    }
  }

  angular.element(document).ready(function () {
    $timeout(function() {
      angular.element('footer').css({ 'visibility': 'visible' });
    },700);
    angular.element('.mail-text textarea').focus(function() {
      angular.element(this).css({ 'border': '2px solid white' });
    });
    angular.element('.anketa, .submenu-list li a').click(function() {
      $anchorScroll();
    });
  });

  $scope.student = {
    name: '',
    age: '',
    course: '',
    address: '',
    phone: '',
    parphone: '',
    gmail: '',
    education: '',
    skype: '',
    skypeCheck: '',
    gmailCheck: '',
    english: '',
    skills: '',
    dest: '',
    photo: ''
  }

  $scope.agePattern = /^[0-9]+$/;
  $scope.gmailPattern = /^.+@gmail.com$/;
  $scope.phonePattern = /^[0-9\s\-\+\,\;]+$/;
  $scope.skypePattern = /^[a-zA-Z][\w\.,\-]{5,31}$/;
  $scope.emailPattern = /^.+@[\w]+\.[\w]+$/;
  $scope.regAge = /^[\wа-яА-ЯёЁіІїЇєЄґҐ\s]+$/;
  $scope.addressPattern = /^[\wа-яА-ЯёЁіІїЇєЄґҐ\'\"\s\-\.\,\:\№\/\\]+$/;
  $scope.regComment = /^[\w\'\"?!()\:\;\.\,\/\+\№а-яА-ЯёЁіІїЇєЄґҐ\s\-]*$/;
  $scope.namePattern = /^[\w\'\"а-яА-ЯёЁіІїЇєЄґҐ\-\.\,\:]+\s[\w\'\"а-яА-ЯЁёІіЇїєЄґҐ\s\-\.\,\:]+$/;
});

app.controller('home', function($scope, $timeout) {});

app.controller('about', function($scope, $location) {
  angular.element(document).ready(function () {
    angular.element('.green-submenu a').click(function() {
      var hash = angular.element(this).attr('href').replace("#","");
      $location.hash(hash);
    });
  });
});

app.controller('news', function($scope, $http) {
  angular.element(document).ready(function () {
    $http({
      method: 'POST',
      url: 'backend/getData.php',
      data: $.param({ news: true }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(msg) {
      if (typeof(msg) == 'object')
        $scope.viewnews = msg;
    });
  });
});

app.controller('courses', function($scope, $location, $http) {
  angular.element(document).ready(function () {
    angular.element('.green-submenu a').click(function() {
      var hash = angular.element(this).attr('href').replace("#","");
      $location.hash(hash);
    });
  });

  $scope.anketa = {
    name: '',
    age: '',
    phone: '',
    mail: '',
    comment: ''
  }

  $scope.validateForm = function(isValid) {
    if (isValid) {
      angular.element('form').remove();
      angular.element('.notice').show();

      $http({
        method: 'POST',
        url: 'backend/saveData.php',
        data: $.param({ anketa: $scope.anketa }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    }
  }
});

app.controller('potential', function($scope, $location, $window) {
  angular.element(document).ready(function () {
    angular.element('.green-submenu a').click(function() {
      var hash = angular.element(this).attr('href').replace("#","");
      $location.hash(hash);
    });

    angular.element($window).bind('resize', function () {
      var width = angular.element($window).width();
      var srcwidth = (width < 900) ? 900 : (width < 1024) ? 1024 : (width < 1366) ? 1366 : 1920;
      angular.element('.potential-slider').css({ 'background-image': 'url(img/poly'+srcwidth+'.png)' }); 
    });
    
    angular.element('.pot-more').click(function() {
      angular.element(this).parent().addClass('open-potential');
    });
    
    angular.element('.pot-close').click(function() {
      angular.element(this).parent().removeClass('open-potential');
    });

    var imgUrl = angular.element('.potential-bgr').css('background-image');
    var newsrc = imgUrl.substring(4, imgUrl.length - 1).replace(/\"/g,"");
    var img = new Image();
    
    img.onload = function () {
      angular.element('.potential-slider').css({ 'background-image': 'url('+img.src+')' }); 
    }
    img.src = newsrc;
  });
});

app.controller('first', function($scope, $location) {
  $scope.submitForm = function(isValid) {
    if (isValid) { 
      if ($scope.student.age < 15)
        $location.path('/check');
      else
        $location.path('/choose');
    }
  }
});

app.controller('check', function($scope, $location, $timeout) {
  $scope.choose = function(page) {
    if (page !== 'choose')
      $scope.student.course = 'Школьная группа';
    
    $location.path(page);
  }
});

app.controller('course', function($scope, $location) {
  $scope.chooseCourse = function(c) {
    $scope.student.course = c;
    $location.path('/main');
  }
});

app.controller('main', function($scope, $location, $http) {
  $scope.submitForm = function(isValid) {
    if (isValid) {
      $http({
        method: 'POST',
        url: 'backend/saveData.php',
        data: $.param({ student: $scope.student }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      $location.path('/last');
    } else {
      angular.element('html, body').animate({
        scrollTop: angular.element(".has-error").first().offset().top-100
      }, 300);
    }
  } 
});

app.controller('last', function($scope, $http, FileUploader) {
  var stream;
  var video = document.querySelector('#webcam');
  var button = document.querySelector('#screenshot-button');
  var repeat = document.querySelector('#screenshot-repeat');
  var canvas = document.querySelector('#screenshot-canvas');
  var ctx = canvas.getContext('2d');
  var save = document.querySelector('#screenshot-save');

  angular.element(document).ready(function () {
    angular.element('#callWebCam').click(function() {
      angular.element('.webCamDiv').show();
      
      if (typeof(stream) != 'object') {
        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        
        if (navigator.getUserMedia) {
          navigator.getUserMedia({ video: true }, function (localMediaStream) {
            video.src = window.URL.createObjectURL(localMediaStream);
            stream = localMediaStream;
          }, onFailure);
        } 
      }
    });

    angular.element('#chooseFile').click(function(){
      angular.element('#fileinp').click();
      angular.element('.webCamDiv').hide();
    });
  });

  button.addEventListener('click', snapshot, false);
  repeat.addEventListener('click', snapshot, false);
  save.addEventListener('click', saveCanvas, false);

  function onFailure(err) {}

  function snapshot() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
  }
  function saveCanvas() {
    var dataURL = canvas.toDataURL();
    $http({
      method: 'POST',
      url: 'backend/saveCanvas.php',
      data: $.param({ img: dataURL, name: $scope.student.name }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(data) {
      uploader.onSuccessItem();
    });
  }
  var uploader = $scope.uploader = new FileUploader({
    url: 'backend/upload.php',
    formData: { name: $scope.student.name }
  });
  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  });
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
    angular.element('.addImg').empty();
    angular.element('.thnx').show();
    angular.element('.load-but').empty();
    if (typeof(stream) == 'object') 
      stream.stop();
  };
  var controller = $scope.controller = {
    isImage: function(item) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };
});