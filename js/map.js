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

  var mainPin = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');

  /* Слушатели событий*/
  mainPin.addEventListener('mousedown', onPinMainMousedown);

  /* Обработчики событий */
  function onPinMainMousedown(evt) {

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onPinMainMousemove(moveEvt) {

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordY = mainPin.offsetTop - shift.y;
      var coordX = mainPin.offsetLeft - shift.x;

      var left = checkMinMax((Сoordinates.X_MIN - Math.round(MainPin.WIDTH / 2)), (Сoordinates.X_MAX - Math.round(MainPin.WIDTH / 2)), coordX);
      var top = checkMinMax((Сoordinates.Y_MIN - MainPin.HEIGHT), (Сoordinates.Y_MAX - MainPin.HEIGHT), coordY);


      mainPin.style.top = top + 'px';
      mainPin.style.left = left + 'px';

      adFormAddress.setAttribute('value', (left + Math.round(MainPin.WIDTH / 2)) + ', ' + (top + MainPin.HEIGHT));
      adFormAddress.value = (left + Math.round(MainPin.WIDTH / 2)) + ', ' + (top + MainPin.HEIGHT);
    }

    function onPinMainMouseup() {
      document.removeEventListener('mousemove', onPinMainMousemove);
      document.removeEventListener('mouseup', onPinMainMouseup);
    }

    document.addEventListener('mousemove', onPinMainMousemove);
    document.addEventListener('mouseup', onPinMainMouseup);
  }

  /* Функции */
  /** @function
   * @name checkMinMax
   * @description Проверят число, в пределах min - max
   * @param {number} min ограничивает диапазон снизу
   * @param {number} max ограничивает диапазон сверху
   * @param {number} current текущее число
   * @return {number} возвращает число, в рамках min - max
   */
  function checkMinMax(min, max, current) {
    if (current < min) {
      return min;
    } else if (current > max) {
      return max;
    } else {
      return current;
    }
  }

  window.map = {
    MainPin: MainPin,
    onPinMainMousedown: onPinMainMousedown
  };
})();
