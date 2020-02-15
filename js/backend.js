/** @file загрузка данных с сервера */
/** @module backend */

'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    PUSH: 'https://js.dump.academy/keksobooking'
  };

  var statusHTML = {
    OK: 200
  };

  function dataLoad(ifSuccess, ifError) {
    var TIMEOUT = 1000;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusHTML.OK) {
        ifSuccess(xhr.response);
      } else {
        ifError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      ifError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      ifError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', Url.LOAD);
    xhr.send();
  }

  function dataPush(data, ifSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      ifSuccess(xhr.response);
    });

    xhr.open('POST', Url.PUSH);
    xhr.send(data);
  }

  function onSuccess(data) {
    return data;
  }

  function onError(message) {
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var messageError = templateError.cloneNode(true);
    messageError.querySelector('.error__message').textContent = message;
    document.body.appendChild(messageError);
  }

  window.backend = {
    dataLoad: dataLoad,
    dataPush: dataPush,
    success: onSuccess,
    error: onError
  };
})();
