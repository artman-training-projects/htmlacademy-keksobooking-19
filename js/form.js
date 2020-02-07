/** @file работа с формой */
/** @module form */

'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormFieldset = adForm.querySelectorAll('fieldset');

  adFormAddress.setAttribute('disabled', 'disabled');
  adFormAddress.setAttribute('value', Math.round(window.map.MainPin.X_START + window.map.MainPin.WIDTH / 2) + ', ' + Math.round(window.map.MainPin.Y_START + window.map.MainPin.HEIGHT / 2));

  adForm.addEventListener('change', onFormChange);

  function adFormDisabling(state) {
    switch (state) {
      case true:
        adForm.classList.add('ad-form--disabled');

        adFormFieldset.forEach(function (fieldset) {
          fieldset.setAttribute('disabled', 'disabled');
        });
        adFormAddress.setAttribute('value', Math.round(window.map.MainPin.X_START + window.map.MainPin.WIDTH / 2) + ', ' + Math.round(window.map.MainPin.Y_START + window.map.MainPin.HEIGHT / 2));
        break;
      case false:
        adForm.classList.remove('ad-form--disabled');

        adFormFieldset.forEach(function (fieldset) {
          fieldset.removeAttribute('disabled');
        });

        adFormAddress.setAttribute('disabled', 'disabled');
        adFormAddress.setAttribute('value', Math.round(window.map.MainPin.X_START + window.map.MainPin.WIDTH / 2) + ', ' + Math.round(window.map.MainPin.Y_START + window.map.MainPin.HEIGHT));
        break;
    }
  }

  /** @function
   * @name onFormChange
   * @description выполняет валидацию при внесении данных в форму
   * @param {event} evt
   */
  function onFormChange(evt) {
    checkHousingType(evt);
    checkTime(evt);
    checkRooms(evt);
  }

  /** @function
   * @name checkHousingType
   * @description выставляет ограничивает минимальную цену, согласно типа жилья
   * @param {*} evt
   */
  function checkHousingType(evt) {
    var price = adForm.querySelector('#price');

    switch (evt.target.value) {
      case 'bungalo':
        price.setAttribute('min', '0');
        price.placeholder = 0;
        break;
      case 'flat':
        price.setAttribute('min', '1000');
        price.placeholder = 1000;
        break;
      case 'house':
        price.setAttribute('min', '5000');
        price.placeholder = 5000;
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = 10000;
        break;
    }
  }

  /** @function
   * @name checkTime
   * @description выставляет соответствие времени въезда и выезда
   * @param {*} evt
   */
  function checkTime(evt) {
    var checkin = adForm.querySelector('#timein');
    var checkout = adForm.querySelector('#timeout');

    switch (evt.target.value) {
      case '12:00':
        checkin.value = '12:00';
        checkout.value = '12:00';
        break;
      case '13:00':
        checkin.value = '13:00';
        checkout.value = '13:00';
        break;
      case '14:00':
        checkin.value = '14:00';
        checkout.value = '14:00';
        break;
    }
  }

  /** @function
   * @name checkRooms
   * @description выстовляет соответствие между колличеством комнат, и возможного размещения гостей
   * @param {*} evt
   */
  function checkRooms(evt) {
    var rooms = adForm.querySelector('#room_number');
    var capacity = adForm.querySelector('#capacity');

    if (evt.target === rooms) {
      switch (evt.target.value) {
        case '1':
          capacity[0].setAttribute('disabled', 'disabled');
          capacity[1].setAttribute('disabled', 'disabled');
          capacity[2].removeAttribute('disabled');
          capacity[3].setAttribute('disabled', 'disabled');
          break;
        case '2':
          capacity[0].setAttribute('disabled', 'disabled');
          capacity[1].removeAttribute('disabled');
          capacity[2].removeAttribute('disabled');
          capacity[3].setAttribute('disabled', 'disabled');
          break;
        case '3':
          capacity[0].removeAttribute('disabled');
          capacity[1].removeAttribute('disabled');
          capacity[2].removeAttribute('disabled');
          capacity[3].setAttribute('disabled', 'disabled');
          break;
        case '100':
          capacity[0].setAttribute('disabled', 'disabled');
          capacity[1].setAttribute('disabled', 'disabled');
          capacity[2].setAttribute('disabled', 'disabled');
          capacity[3].removeAttribute('disabled');
          break;
      }
    }
  }

  window.form = {
    adFormDisabling: adFormDisabling
  };
})();
