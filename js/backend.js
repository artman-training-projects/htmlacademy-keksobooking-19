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

  var TIMEOUT = 10000;

  /** @function
   * @name dataLoad
   * @description Получение данных с сервера
   * @param {function} ifSuccess callback при успешном получении данных
   * @param {function} ifError callback при ошибке при получении данных
   */
  function dataLoad(ifSuccess, ifError) {
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

  /** @function
   * @name dataPush
   * @description Отправка данных на сервер
   * @param {function} data callback при отправке данных
   * @param {function} ifSuccess callback при успешной отправке данных
   */
  function dataPush(data, ifSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      ifSuccess(xhr.response);
    });

    xhr.open('POST', Url.PUSH);
    xhr.send(data);
  }

  /** @function
   * @name onError
   * @description Вывод сообщение об ошибке
   * @param {*} message
   */
  function onError(message) {
    var error = document.createElement('div');
    error.textContent = message;
    error.style = 'position: absolute; top: 0; left:0; right: 0; text-align: center; font-size: 30px; color: rgb(200, 200, 0); background-color: rgba(0, 0, 0, 0.6); ';
    document.body.appendChild(error);
  }

  /** @function
   * @name onSuccess
   * @description Действия при получении данных с сервера
   * @param {*} data
   */
  function onSuccess(data) {
    window.init.defaultAdverts = data;
    window.pin.render(window.init.defaultAdverts);
  }

  window.backend = {
    dataLoad: dataLoad,
    dataPush: dataPush,
    error: onError,
    success: onSuccess
  };
})();
