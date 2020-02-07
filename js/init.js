/** @file инициальзация страницы */
/** @module init */

'use strict';

(function () {
  var COUNT_ADVERTISEMENTS = 8;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');

  var advertisements = window.mock.createAdvertisementArray(COUNT_ADVERTISEMENTS);

  /* Слушатели событий */
  mapPinMain.addEventListener('mousedown', onMapPinClick);
  mapPinMain.addEventListener('keydown', onMapPinClick);

  /* Обработчики событий */
  /** @function
   * @name onMapPinClick
   * @description при нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */

  function onMapPinClick(evt) {
    evt.preventDefault();

    if ((evt.which === window.util.KeysClick.LEFT_MOUSE) || (evt.key === window.util.KeysClick.ENTER)) {
      pageDisabled(false);
    }
  }

  /** @function
   * @name isPageDisabled
   * @description ауправляет состояние страницы - активна или нет
   * @param {boolean} state true - страница не активна, false - страница активна
   */
  function pageDisabled(state) {
    switch (state) {
      case true:
        window.form.adFormDisabling(state);
        map.classList.remove('map--faded');

        var pins = map.querySelectorAll('.map__pin');
        pins.forEach(function (pin) {
          if (!pin.classList.contains('map__pin--main')) {
            pin.remove();
          }
        });

        var cards = map.querySelectorAll('.map__card');
        cards.forEach(function (card) {
          card.remove();
        });

        mapPinMain.addEventListener('mousedown', onMapPinClick);
        mapPinMain.addEventListener('keydown', onMapPinClick);
        break;
      case false:
        map.classList.add('map--faded');
        window.form.adFormDisabling(state);

        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        window.pin.renderPins(advertisements);
        window.card.renderCards(advertisements);

        mapPinMain.removeEventListener('mousedown', onMapPinClick);
        mapPinMain.removeEventListener('keydown', onMapPinClick);
        break;
    }
  }

})();
