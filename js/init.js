/** @file инициальзация страницы */
/** @module init */

'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var filterForm = document.querySelector('.map__filters');

  var defaultAdverts = [];
  pageDisabled(true);

  /* Обработчики событий */
  /** @function
   * @name onMapPinMousedown
   * @description При нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */
  function onMapPinMousedown(evt) {
    if (evt.which === window.utils.KeysClick.LEFT_MOUSE) {
      pageDisabled(false);
      mapActivateListener();
    }
  }

  /** @function
   * @name onMapPinKeydown
   * @description При нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */
  function onMapPinKeydown(evt) {
    if (evt.key === window.utils.KeysClick.ENTER) {
      pageDisabled(false);
      mapActivateListener();
    }
  }

  /** @function
   * @name onStartStateMousedown
   * @description При нажатии мышкой на кнопку очистить, переводит страницу в начальное состояние
   * @param {event} evt
   */
  function onStartStateMousedown(evt) {
    if (evt.which === window.utils.KeysClick.LEFT_MOUSE) {
      pageDisabled(true);
      mapDisableListener();
      filterForm.style.opacity = 0;
    }
  }

  /** @function
   * @name onStartStateKeydown
   * @description при нажатии ентер на кнопку очистить, переводит страницу в начальное состояние
   * @param {event} evt
   */
  function onStartStateKeydown(evt) {
    if (evt.key === window.utils.KeysClick.ENTER) {
      pageDisabled(true);
      mapDisableListener();
      filterForm.style.opacity = 0;
    }
  }

  function mapActivateListener() {
    mainPin.removeEventListener('mousedown', onMapPinMousedown);
    mainPin.removeEventListener('keydown', onMapPinKeydown);
    adFormReset.addEventListener('mousedown', onStartStateMousedown);
    adFormReset.addEventListener('keydown', onStartStateKeydown);
    mainPin.addEventListener('mousedown', window.map.onPinMainMousedown);
  }

  function mapDisableListener() {
    // advertisements = null;
    adFormReset.removeEventListener('mousedown', onStartStateMousedown);
    adFormReset.removeEventListener('keydown', onStartStateKeydown);
    mainPin.removeEventListener('mousedown', window.map.onPinMainMousedown);
    mainPin.addEventListener('mousedown', onMapPinMousedown);
    mainPin.addEventListener('keydown', onMapPinKeydown);
  }

  /* Функции */
  /** @function
   * @name isPageDisabled
   * @description Управляет состояние страницы - активна или нет
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

        window.filter.disabled(true);

        mainPin.addEventListener('mousedown', onMapPinMousedown);
        mainPin.addEventListener('keydown', onMapPinKeydown);
        break;
      case false:
        window.form.disabling(state);

        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        window.backend.dataLoad(window.backend.success, window.backend.error);

        mainPin.removeEventListener('mousedown', onMapPinMousedown);
        mainPin.removeEventListener('keydown', onMapPinKeydown);
        break;
    }
  }

  window.init = {
    pageDisabled: pageDisabled,
    defaultAdverts: defaultAdverts
  };
})();
