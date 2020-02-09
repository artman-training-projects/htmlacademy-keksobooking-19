/** @file инициальзация страницы */
/** @module map */

'use strict';

(function () {
  var Сoordinates = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
  };

  var MainPin = {
    WIDTH: 65,
    HEIGHT: 85,
    X_START: 570,
    Y_START: 375
  };

  var map = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');

  /* Слушатели событий*/
  mainPin.addEventListener('mousedown', onPinMainMousedown);

  /* Обработчики событий */
  function onPinMainMousedown(evt) {
    console.log('staaaaaaaaaaaaaaaart');

    // var startCoordinates = getCoordinates(mainPin);
    var gapX = map.getBoundingClientRect().x;

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onPinMainMousemove(moveEvt) {
      console.log('dvigaem');
      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      console.log(mainPin.style);
    }

    function onPinMainMouseup() {
      console.log('otpuskaem');
      mainPin.removeEventListener('mousemove', onPinMainMousemove);
      mainPin.removeEventListener('mouseup', onPinMainMouseup);
    }

    mainPin.addEventListener('mousemove', onPinMainMousemove);
    mainPin.addEventListener('mouseup', onPinMainMouseup);
  }

  /* Функции */
  /** @function
   * @name getCoordinates
   * @description вычиляет координаты элемента top left, относительно body
   * @param {*} element DOM-элемент
   * @return {object} возвращает координаты top и left
   */
  function getCoordinates(element) {
    var maps = map.getBoundingClientRect();
    var pin = element.getBoundingClientRect();

    return {
      left: pin.left + pageXOffset - maps.x,
      top: pin.top + pageYOffset
    };
  }

  window.map = {
    MainPin: MainPin,
    onPinMainMousedown: onPinMainMousedown
  };
})();
