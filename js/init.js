/** @file инициальзация страницы */
/** @module init */

'use strict';

(function () {
  var Form = window.form;
  var Pin = window.pin;
  // var Mock = window.mock;
  var Backend = window.backend;
  var Utils = window.utils;
  var Mapp = window.map;

  // var COUNT_ADVERTISEMENTS = 8;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');

  // var advertisements = Mock.createAdvertisements(COUNT_ADVERTISEMENTS);

  /* Слушатели событий */
  mainPin.addEventListener('mousedown', onMapPinMousedown);
  mainPin.addEventListener('keydown', onMapPinKeydown);

  /* Обработчики событий */
  /** @function
   * @name onMapPinMousedown
   * @description при нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */
  function onMapPinMousedown(evt) {
    if (evt.which === Utils.KeysClick.LEFT_MOUSE) {
      pageDisabled(false);
      mapActivateListener();
    }
  }

  /** @function
   * @name onMapPinKeydown
   * @description при нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */
  function onMapPinKeydown(evt) {
    if (evt.key === Utils.KeysClick.ENTER) {
      pageDisabled(false);
      mapActivateListener();
    }
  }

  /** @function
   * @name onStartStateMousedown
   * @description при нажатии мышкой на кнопку очистить, переводит страницу в начальное состояние
   * @param {event} evt
   */
  function onStartStateMousedown(evt) {
    if (evt.which === Utils.KeysClick.LEFT_MOUSE) {
      pageDisabled(true);
      mapDisableListener();
    }
  }

  /** @function
   * @name onStartStateKeydown
   * @description при нажатии ентер на кнопку очистить, переводит страницу в начальное состояние
   * @param {event} evt
   */
  function onStartStateKeydown(evt) {
    if (evt.key === Utils.KeysClick.ENTER) {
      pageDisabled(true);
      mapDisableListener();
    }
  }

  function mapActivateListener() {
    mainPin.removeEventListener('mousedown', onMapPinMousedown);
    mainPin.removeEventListener('keydown', onMapPinKeydown);
    adFormReset.addEventListener('mousedown', onStartStateMousedown);
    adFormReset.addEventListener('keydown', onStartStateKeydown);
    mainPin.addEventListener('mousedown', Mapp.onPinMainMousedown);
  }

  function mapDisableListener() {
    // advertisements = null;
    adFormReset.removeEventListener('mousedown', onStartStateMousedown);
    adFormReset.removeEventListener('keydown', onStartStateKeydown);
    mainPin.removeEventListener('mousedown', Mapp.onPinMainMousedown);
    mainPin.addEventListener('mousedown', onMapPinMousedown);
    mainPin.addEventListener('keydown', onMapPinKeydown);
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
        Form.disabling(state);
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

        mainPin.addEventListener('mousedown', onMapPinMousedown);
        mainPin.addEventListener('keydown', onMapPinKeydown);
        break;
      case false:
        Form.disabling(state);

        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        // advertisements = Mock.createAdvertisements(COUNT_ADVERTISEMENTS);
        // Pin.render(advertisements);
        Backend.dataLoad(Pin.render, Backend.error);

        mainPin.removeEventListener('mousedown', onMapPinMousedown);
        mainPin.removeEventListener('keydown', onMapPinKeydown);
        break;
    }
  }
})();
