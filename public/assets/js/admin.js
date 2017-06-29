(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _upload = require('./admin/upload');

var _upload2 = _interopRequireDefault(_upload);

var _prepareSend = require('./prepareSend');

var _prepareSend2 = _interopRequireDefault(_prepareSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formWork = document.querySelector('#work');
var formBlog = document.querySelector('#blog');

var editor = new nicEditor({ fullPanel: true }).panelInstance('blogArlicle');

if (formWork) formWork.addEventListener('submit', prepareSendWorkData);
if (formBlog) formBlog.addEventListener('submit', prepareSendPost);

function prepareSendWorkData(e) {
    e.preventDefault();
    var resultContainer = formWork.querySelector('.status');
    var formData = new FormData();
    var file = document.querySelector('#work-img').files[0];
    var name = document.querySelector('#work-name').value;
    var technology = document.querySelector('#work-technology').value;

    formData.append('img', file, file.name);
    formData.append('name', name);
    formData.append('technology', technology);

    resultContainer.innerHTML = 'Uploading...';
    (0, _upload2.default)('/admin/addwork', formData, function (data) {
        resultContainer.innerHTML = data;
        formWork.reset();
    });
}

function prepareSendPost(e) {
    e.preventDefault();

    var text = nicEditors.findEditor('blogArlicle').getContent();
    var data = {
        title: formBlog.title.value,
        date: formBlog.date.value,
        text: text
    };
    console.log(text);
    (0, _prepareSend2.default)('/admin/addpost', formBlog, data);
}
//var blogArlicle =  document.querySelector('#blogArlicle');

},{"./admin/upload":2,"./prepareSend":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);

  xhr.onload = function (e) {
    var result = JSON.parse(xhr.responseText);
    cb(result.status);
  };

  xhr.send(data);
};

},{}],3:[function(require,module,exports){
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

},{"./sendAjax":4}],4:[function(require,module,exports){
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


//# sourceMappingURL=maps/admin.js.map
