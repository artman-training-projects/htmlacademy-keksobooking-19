/** @file генерация и отрисовка пина */
/** @module pin */

'use strict';

(function () {
  var MAX_ADVERTS = 5;

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
      if (evt.which === window.utils.KeysClick.LEFT_MOUSE) {
        makeCard(advert);
        advertPin.classList.add('map__pin--active');
      }
    }

    advertPin.addEventListener('keydown', onShowCardKeydown);
    function onShowCardKeydown(evt) {
      if (evt.key === window.utils.KeysClick.ENTER) {
        makeCard(advert);
        advertPin.classList.add('map__pin--active');
      }
    }

    return advertPin;
  }

  /**
   * @function makeCard
   * @description Создаёт карточку объявления
   * @param {object} advert объект карточки объявления
   */
  function makeCard(advert) {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    window.card.render(advert);
  }

  /** @function
   * @name renderPins
   * @description Вставляет пины в разметку
   * @param {array} pins массив объявлений
   */
  function renderPins(pins) {
    var fragment = document.createDocumentFragment();

    pins.slice(0, MAX_ADVERTS).forEach(function (pin) {
      if (pin.offer) {
        fragment.appendChild(makePin(pin));
      }
    });

    map.querySelector('.map__pins').appendChild(fragment);
  }

  /**
   * @function removePins
   * @description Удаляет старые пины
   */
  function removePins() {
    var oldPins = document.querySelectorAll('.map__pin');
    oldPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  }

  window.pin = {
    render: renderPins,
    remove: removePins
  };
})();
