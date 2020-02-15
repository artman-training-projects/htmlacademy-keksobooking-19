/** @file загрузка данных с сервера */
/** @module backend */

'use strict';

(function () {
  var Utils = window.utils;

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    PUSH: 'https://js.dump.academy/keksobookin'
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
    var error = document.createElement('div');
    error.textContent = message;
    error.style = 'position: absolute; top: 0; left:0; right: 0; text-align: center; font-size: 30px; color: rgb(200, 200, 0); background-color: rgba(0, 0, 0, 0.6); ';
    document.body.appendChild(error);
  }

  function messageSuccess() {
    var template = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    template.id = 'message';
    document.body.querySelector('main').appendChild(template);

    document.addEventListener('mousedown', onMessageCloseMousedown);
    document.addEventListener('keydown', onMessageCloseKeydown);
  }

  function messageError() {
    var template = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    template.id = 'message';
    document.body.querySelector('main').appendChild(template);

    document.querySelector('.error__button').addEventListener('click', onMessageCloseClick);
    document.addEventListener('mousedown', onMessageCloseMousedown);
    document.addEventListener('keydown', onMessageCloseKeydown);
  }

  /* Обработчики событий */
  function onMessageCloseMousedown(evt) {
    if (evt.which === Utils.KeysClick.LEFT_MOUSE) {
      removeMessage();
    }
  }

  function onMessageCloseKeydown(evt) {
    if (evt.key === Utils.KeysClick.ESCAPE) {
      removeMessage();
    }
  }

  function onMessageCloseClick(evt) {
    evt.preventDefault();
    removeMessage();
  }

  function removeMessage() {
    document.querySelector('#message').remove();
    document.removeEventListener('mousedown', onMessageCloseMousedown);
    document.removeEventListener('keydown', onMessageCloseKeydown);
  }

  window.backend = {
    dataLoad: dataLoad,
    dataPush: dataPush,
    success: onSuccess,
    error: onError,
    messageSuccess: messageSuccess,
    messageError: messageError
  };
})();
