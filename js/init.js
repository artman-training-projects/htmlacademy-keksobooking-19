/** @file инициальзация страницы */
/** @module init */

'use strict';

(function () {
  var COUNT_ADVERTISEMENTS = 8;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');

  var advertisements = window.mock.createAdvertisements(COUNT_ADVERTISEMENTS);

  /* Слушатели событий */
  mapPinMain.addEventListener('mousedown', onMapPinMousedown);
  mapPinMain.addEventListener('keydown', onMapPinKeydown);

  /* Обработчики событий */
  /** @function
   * @name onMapPinMousedown
   * @description при нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */
  function onMapPinMousedown(evt) {
    if (evt.which === window.util.KeysClick.LEFT_MOUSE) {
      pageDisabled(false);
      mapPinMain.removeEventListener('mousedown', onMapPinMousedown);
      mapPinMain.removeEventListener('keydown', onMapPinKeydown);
      adFormReset.addEventListener('mousedown', onStartStateMousedown);
      adFormReset.addEventListener('keydown', onStartStateKeydown);
    }
  }

  /** @function
   * @name onMapPinKeydown
   * @description при нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */
  function onMapPinKeydown(evt) {
    if (evt.key === window.util.KeysClick.ENTER) {
      pageDisabled(false);
      mapPinMain.removeEventListener('mousedown', onMapPinMousedown);
      mapPinMain.removeEventListener('keydown', onMapPinKeydown);
      adFormReset.addEventListener('mousedown', onStartStateMousedown);
      adFormReset.addEventListener('keydown', onStartStateKeydown);
    }
  }

  /** @function
   * @name onStartStateMousedown
   * @description при нажатии мышкой на кнопку очистить, переводит страницу в начальное состояние
   * @param {event} evt
   */
  function onStartStateMousedown(evt) {
    if (evt.which === window.util.KeysClick.LEFT_MOUSE) {
      pageDisabled(true);
      advertisements = null;
      adFormReset.removeEventListener('mousedown', onStartStateMousedown);
      adFormReset.removeEventListener('keydown', onStartStateKeydown);
      mapPinMain.addEventListener('mousedown', onMapPinMousedown);
      mapPinMain.addEventListener('keydown', onMapPinKeydown);
    }
  }

  /** @function
   * @name onStartStateKeydown
   * @description при нажатии ентер на кнопку очистить, переводит страницу в начальное состояние
   * @param {event} evt
   */
  function onStartStateKeydown(evt) {
    if (evt.key === window.util.KeysClick.ENTER) {
      pageDisabled(true);
      advertisements = null;
      adFormReset.removeEventListener('mousedown', onStartStateMousedown);
      adFormReset.removeEventListener('keydown', onStartStateKeydown);
      mapPinMain.addEventListener('mousedown', onMapPinMousedown);
      mapPinMain.addEventListener('keydown', onMapPinKeydown);
    }
  }

  /* Функции */
  /** @function
   * @name isPageDisabled
   * @description ауправляет состояние страницы - активна или нет
   * @param {boolean} state true - страница не активна, false - страница активна
   */
  function pageDisabled(state) {
    switch (state) {
      case true:
        window.form.disabling(state);
        map.classList.add('map--faded');

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

        mapPinMain.addEventListener('mousedown', onMapPinMousedown);
        mapPinMain.addEventListener('keydown', onMapPinKeydown);
        break;
      case false:
        window.form.disabling(state);

        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        advertisements = window.mock.createAdvertisements(COUNT_ADVERTISEMENTS);
        window.pin.render(advertisements);

        mapPinMain.removeEventListener('mousedown', onMapPinMousedown);
        mapPinMain.removeEventListener('keydown', onMapPinKeydown);
        break;
    }
  }
})();
