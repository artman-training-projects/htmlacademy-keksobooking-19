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

  /* Функции */
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

    advertPin.addEventListener('mousedown', onShowCardMousedown);
    function onShowCardMousedown(evt) {
      if (evt.which === window.util.KeysClick.LEFT_MOUSE) {
        var mapCard = map.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        window.card.render(advert);
      }
    }

    advertPin.addEventListener('keydown', onShowCardKeydown);
    function onShowCardKeydown(evt) {
      if (evt.key === window.util.KeysClick.ENTER) {
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

  window.pin = {
    render: renderPins,
    getCoordinates: getCoordinates
  };
})();
