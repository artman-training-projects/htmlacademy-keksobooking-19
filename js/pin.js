/** @file генерация и отрисовка пина */
/** @module pin */

'use strict';

(function () {
  var Utils = window.utils;

  var Pins = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var map = document.querySelector('.map');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  /* Функции */
  /** @function
   * @name makePin
   * @description Создаёт пин для объявления
   * @param {object} advert принимает объявление
   * @return {object} возвращает html-элемент, раположение пина
   */
  function makePin(advert) {
    var advertPin = templatePin.cloneNode(true);
    advertPin.style = 'left: ' + (advert.location.x - (Pins.WIDTH / 2)) + 'px; top: ' + (advert.location.y - Pins.HEIGHT) + 'px;';
    advertPin.querySelector('img').src = advert.author.avatar;
    advertPin.querySelector('img').alt = advert.offer.title;

    advertPin.addEventListener('mousedown', onShowCardMousedown);
    function onShowCardMousedown(evt) {
      if (evt.which === Utils.KeysClick.LEFT_MOUSE) {
        var mapCard = map.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        window.card.render(advert);
      }
    }

    advertPin.addEventListener('keydown', onShowCardKeydown);
    function onShowCardKeydown(evt) {
      if (evt.key === Utils.KeysClick.ENTER) {
        var mapCard = map.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        window.card.render(advert);
      }
    }

    return advertPin;
  }

  /** @function
   * @name renderPins
   * @description Вставляет пины в разметку
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
    render: renderPins
  };
})();
