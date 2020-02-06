/** @file генерация и отрисовка пина */
/** @module pin */

'use strict';

(function () {
  var Pins = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var map = document.querySelector('.map');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  /** @function
   * @name makePin
   * @param {object} advert принимает объявление
   * @return {object} возвращает html-элемент, раположение пина
   */
  function makePin(advert) {
    var advertPin = templatePin.cloneNode(true);
    advertPin.style = 'left: ' + (advert.location.x - (Pins.WIDTH / 2)) + 'px; top: ' + (advert.location.y - Pins.HEIGHT) + 'px;';
    advertPin.querySelector('img').src = advert.author.avatar;
    advertPin.querySelector('img').alt = advert.offer.title;
    return advertPin;
  }

  /** @function
   * @name renderPins
   * @description вставляет пины в разметку
   * @param {array} pin массив объявлений
   */
  function renderPins(pin) {
    var fragment = document.createDocumentFragment();

    pin.forEach(function (item) {
      fragment.appendChild(makePin(item));
    });

    map.querySelector('.map__pins').appendChild(fragment);
  }

  window.pin = {
    renderPins: renderPins
  };
})();
