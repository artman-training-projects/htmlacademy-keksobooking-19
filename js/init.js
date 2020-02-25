/** @file инициальзация страницы */
/** @module init */

'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var defaultAdverts = [];
  pageDisabling(true);
  window.filter.disabling(true);

  /* Обработчики событий */
  /** @function
   * @name onMapPinMousedown
   * @description При нажатии мышкой на пин делает карту активной
   * @param {event} evt
   */
  function onMapPinMousedown(evt) {
    if (evt.which === window.utils.KeysClick.LEFT_MOUSE) {
      pageDisabling(false);
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
      pageDisabling(false);
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
      pageDisabling(true);
      mapDisableListener();
    }
  }

  /** @function
   * @name onStartStateKeydown
   * @description при нажатии ентер на кнопку очистить, переводит страницу в начальное состояние
   * @param {event} evt
   */
  function onStartStateKeydown(evt) {
    if (evt.key === window.utils.KeysClick.ENTER) {
      pageDisabling(true);
      mapDisableListener();
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
    adFormReset.removeEventListener('mousedown', onStartStateMousedown);
    adFormReset.removeEventListener('keydown', onStartStateKeydown);
    mainPin.removeEventListener('mousedown', window.map.onPinMainMousedown);
    mainPin.addEventListener('mousedown', onMapPinMousedown);
    mainPin.addEventListener('keydown', onMapPinKeydown);
  }

  /* Функции */
  /** @function
   * @name pageDisabling
   * @description Управляет состояние страницы - блокирована или активна
   * @param {boolean} state true - блокирует страницу, false - активирует страницу
   * @return {function} функция блокировки/активации страницы
   */
  function pageDisabling(state) {
    return state ? pageDisabled() : pageEnabled();
  }

  /** @function
   * @name pageDisabled
   * @description блокирует страницу
   */
  function pageDisabled() {
    window.form.disabled();
    map.classList.add('map--faded');
    mainPin.style = 'left: 570px; top: 375px;';

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

    window.upload.remove();

    mainPin.addEventListener('mousedown', onMapPinMousedown);
    mainPin.addEventListener('keydown', onMapPinKeydown);
  }

  /** @function
   * @name pageDisabled
   * @description активирует страницу
   */
  function pageEnabled() {
    window.form.enabled();

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.backend.dataLoad(window.backend.success, window.backend.error);

    mainPin.removeEventListener('mousedown', onMapPinMousedown);
    mainPin.removeEventListener('keydown', onMapPinKeydown);
  }

  window.init = {
    pageDisabling: pageDisabling,
    defaultAdverts: defaultAdverts
  };
})();
