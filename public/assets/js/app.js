(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _prepareSend = require('./prepareSend');

var _prepareSend2 = _interopRequireDefault(_prepareSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {

    if ($('.preloader').length) {
        preloader.init();
    }

    slider.init();
    if ($('.fullscreen-menu').length) {
        fullscreenMenu.init();
    }
    if ($('#authBtn').length) {
        flipper.init();
    }
    if ($('#login').length) {
        console.log('login');
        $('#auth_login').on('click', prepareSendLogin);
    }
});

function prepareSendLogin(e) {
    e.preventDefault();
    console.log('prepareSendLogin');
    var formLogin = document.querySelector('#login');
    var data = {
        login: formLogin.login.value,
        password: formLogin.password.value
    };

    (0, _prepareSend2.default)('/auth', formLogin, data, function (data) {
        if (data === 'Авторизация успешна!') {
            location.href = '/admin';
        }
    });
}

/*slider*/
var slider = function () {
    var counter = 0,
        duration = 300,
        inProcess = false;
    var moveSlide = function moveSlide(direction) {
        var upList = $('.slider__item', '.slider__btns__up'),
            upActiveItem = upList.filter('.active'),
            downList = $('.slider__item', '.slider__btns__down'),
            downActiveItem = downList.filter('.active'),
            displayList = $('.slider__item', '.slider__display'),
            displayActiveItem = displayList.filter('.active'),
            descList = $('.slider-description__item', '.slider-description__list'),
            descActiveItem = descList.filter('.active'),


        /*   upActiveItem = upList.eq(1).addClass('active'),
           displayActiveItem = displayList.eq(1).addClass('active'),
           descActiveItem = descList.eq(1).addClass('active'),
           downActiveItem = downList.eq(1).addClass('active'),
        */

        downBtnIndex = downActiveItem.index(),
            upBtnIndex = upActiveItem.index(),
            displayIndex = displayActiveItem.index(),
            directionCounter = direction == 'down' ? -1 : +1;

        if (direction == 'up') {
            displayIndex = displayIndex + 1 >= displayList.length ? 0 : displayIndex + 1;
            upBtnIndex = upBtnIndex + 1 >= upList.length ? 0 : upBtnIndex + 1;
            downBtnIndex = downBtnIndex + 1 >= downList.length ? 0 : downBtnIndex + 1;
        } else {
            //down
            displayIndex = displayIndex == 0 ? displayList.length - 1 : displayIndex - 1;
            upBtnIndex = upBtnIndex == 0 ? downList.length - 1 : upBtnIndex - 1;
            downBtnIndex = downBtnIndex == 0 ? downList.length - 1 : downBtnIndex - 1;
        }
        var regItemForDisplay = displayList.eq(displayIndex);
        var regItemUp = upList.eq(upBtnIndex);
        var regItemDown = downList.eq(downBtnIndex);
        var regItemForDesc = descList.eq(displayIndex);

        //обновитть картнку в контролах
        var display = $('.slider__display-pic', '.slider'),
            nextDisplaySrc = $('img', regItemForDisplay).attr('src'),
            fadedOut = $.Deferred();
        display.fadeOut(function () {
            fadedOut.resolve();
        });
        fadedOut.done(function () {
            //preloader.show();

            display.attr('src', nextDisplaySrc).on('load', function () {
                //loaded.resolve();
                display.fadeIn(300);
            });
        });
        displayActiveItem.removeClass('active');
        regItemForDisplay.addClass('active');

        //Поменяем описание слайдера
        descActiveItem.removeClass('active');
        regItemForDesc.addClass('active');

        //обновитть картнку в кликнутом контроле
        upActiveItem.animate({
            'top': '-100%'
        }, duration);

        regItemUp.animate({
            'top': 0
        }, duration, function () {
            upActiveItem.removeClass('active').css('top', '100%');
            $(this).addClass('active');

            inProcess = false;
        });

        //обновитть картнку в пассивном контроле

        downActiveItem.animate({
            'top': '100%'
        }, duration);

        regItemDown.animate({
            'top': 0
        }, duration, function () {
            downActiveItem.removeClass('active').css('top', '-100%');
            $(this).addClass('active');

            inProcess = false;
        });
    };
    return {
        init: function init() {
            //здесь на родителя нужно навесить
            $('#sliderUpArrow').on('click', function (e) {
                e.preventDefault();
                if (!inProcess) {
                    inProcess = true;
                    moveSlide('up');
                    counter++;
                }
            });
            $('#sliderDownArrow').on('click', function (e) {
                e.preventDefault();
                if (!inProcess) {
                    inProcess = true;

                    moveSlide('down');
                    counter--;
                }
            });
        }
    };
}();

/*slider finish*/

/*preloader*/
var preloader = function () {

    var preloader = $('.preloader');
    var percentsTotal = 0;

    var init = function init() {
        var myImages = imgPath.toArray();
        loadImages(myImages);
    };
    var imgPath = $('*').map(function (index, elem) {
        console.log(4);

        var background = $(elem).css('background-image'),
            img = $(elem).is('img'),
            path = '';
        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }
        if (img) {
            path = $(elem).attr('src');
        }
        if (path) {
            return path;
        }
    });

    var setPercents = function setPercents(total, current) {

        var percents = Math.ceil(current / total * 100);

        $('.preloader__percents').text(percents + '%');

        if (percents >= 100) {
            setTimeout(function () {
                preloader.fadeOut();
            }, 500);
        }
    };

    var loadImages = function loadImages(images) {
        if (!images.length) {
            preloader.fadeOut();
        }

        images.forEach(function (img, index) {
            var fakeImage = $('<img>', {
                attr: {
                    src: img
                }

            });

            fakeImage.on('load error', function () {

                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });
    };

    return {

        init: init

    };
}();

/*preloader finish*/

/*hambueger menu*/

var fullscreenMenu = function () {

    var menu = $('.fullscreen-menu');

    var init = function init() {

        $('.hamburger-menu__link').on('click', _openMenu);
    };

    var _openMenu = function _openMenu(e) {

        e.preventDefault();

        if ($(this).hasClass('active')) {

            $(this).removeClass('active');
            $('body').css('position', 'static');
            menu.slideUp();
        } else {

            $(this).addClass('active');
            $('body').css('position', 'fixed');
            menu.slideDown();
        }
    };

    return {

        init: init

    };
}();

/*hambueger menu finished*/

// flipper
var flipper = function () {

    var flipper = document.getElementById('flipper');
    var authBtn = document.getElementById('authBtn');

    var flip = function flip(e) {
        if (e.target.id == "authBtn") {
            e.preventDefault();
            flipper.classList.add('hover');
        } else {
            if (e.target.id == "welcomeHeroImg") {
                flipper.classList.remove('hover');
            }
        }
    };
    return {
        init: function init() {
            document.addEventListener('click', flip, false);
        }
    };
}();

},{"./prepareSend":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareSend;

var _sendAjax = require('./sendAjax');

var _sendAjax2 = _interopRequireDefault(_sendAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareSend(url, form, data, cb) {
  var resultContainer = form.querySelector('.status');
  resultContainer.innerHTML = 'Sending...';
  (0, _sendAjax2.default)(url, data, function (data) {
    form.reset();
    resultContainer.innerHTML = data;
    if (cb) {
      cb(data);
    }
  });
}

},{"./sendAjax":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    var result = void 0;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb('Извините в данных ошибка');
    }
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
};

},{}]},{},[1])


//# sourceMappingURL=maps/app.js.map
