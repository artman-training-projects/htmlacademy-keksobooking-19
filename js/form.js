/** @file работа с формой */
/** @module form */

'use strict';

(function () {
  var Mapp = window.map;
  var Backend = window.backend;

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var price = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var roomSelect = adForm.querySelector('#room_number');
  var capSelect = adForm.querySelector('#capacity');
  var capOptions = capSelect.querySelectorAll('option');

  var StartAddress = {
    centerX: Math.round(Mapp.MainPin.X_START + Mapp.MainPin.WIDTH / 2),
    centerY: Math.round(Mapp.MainPin.Y_START + Mapp.MainPin.HEIGHT / 2),
    pinY: Math.round(Mapp.MainPin.Y_START + Mapp.MainPin.HEIGHT)
  };

  var typeToPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var roomToCapaсity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  price.setAttribute('min', typeToPrice[typeSelect.value]);
  price.placeholder = typeToPrice[typeSelect.value];

  adFormAddress.setAttribute('disabled', 'disabled');
  adFormAddress.setAttribute('value', StartAddress.centerX + ', ' + StartAddress.centerY);

  /** @function
   * @name adFormDisabling
   * @description откл/вкл формы
   * @param {boolean} state true - отключение формы, false - включение формы
   */
  function adFormDisabling(state) {
    switch (state) {
      case true:
        adForm.classList.add('ad-form--disabled');

        adFormFieldset.forEach(function (fieldset) {
          fieldset.setAttribute('disabled', 'disabled');
        });

        adForm.removeEventListener('change', onFormChange);
        adFormAddress.setAttribute('value', StartAddress.centerX + ', ' + StartAddress.centerY);
        adFormAddress.value = StartAddress.centerX + ', ' + StartAddress.centerY;
        adForm.reset();
        break;
      case false:
        adForm.classList.remove('ad-form--disabled');

        adFormFieldset.forEach(function (fieldset) {
          fieldset.removeAttribute('disabled');
        });

        capOptions.forEach(function (option) {
          if (option.value !== roomSelect.value) {
            option.disabled = true;
            option.selected = false;
          } else {
            option.selected = true;
          }

        });

        adFormAddress.removeAttribute('disabled');
        adForm.addEventListener('change', onFormChange);
        adForm.addEventListener('submit', onFormSubmit);
        adFormAddress.setAttribute('value', StartAddress.centerX + ', ' + StartAddress.pinY);
        adFormAddress.value = StartAddress.centerX + ', ' + StartAddress.pinY;
        break;
    }
  }

  /** @function
   * @name onFormChange
   * @description выполняет валидацию при внесении данных в форму
   * @param {event} evt
   */
  function onFormChange(evt) {
    switch (evt.target.id) {
      case 'type':
        checkHousingType(evt);
        break;
      case 'timein':
      case 'timeout':
        checkTime(evt);
        break;
      case 'room_number':
        checkRooms(evt);
        break;
    }
  }

  /** @function
   * @name checkHousingType
   * @description выставляет минимальную цену, согласно типа жилья
   * @param {*} evt
   */
  function checkHousingType(evt) {
    price.setAttribute('min', typeToPrice[evt.target.value]);
    price.placeholder = typeToPrice[evt.target.value];
  }

  /** @function
   * @name checkTime
   * @description выставляет соответствие времени въезда и выезда
   * @param {*} evt
   */
  function checkTime(evt) {
    var timein = adForm.querySelector('#timein');
    var timeout = adForm.querySelector('#timeout');

    switch (evt.target) {
      case timein:
        timeout.value = evt.target.value;
        break;
      case timeout:
        timein.value = evt.target.value;
        break;
    }
  }

  /** @function
   * @name checkRooms
   * @description выстовляет соответствие между колличеством комнат, и возможного колличества гостей
   * @param {*} evt
   */
  function checkRooms(evt) {
    var value = evt.target.value;

    capOptions.forEach(function (option) {
      option.disabled = true;
      option.selected = false;
    });

    roomToCapaсity[value].forEach(function (room) {
      capSelect.querySelector('option' + '[value="' + room + '"]').disabled = false;
    });
    capSelect.querySelector('option' + '[value="' + roomToCapaсity[value][0] + '"]').selected = true;
  }

  function onFormSubmit(evt) {
    Backend.dataPush(new FormData(adForm), function (responce) {

    });
    evt.preventDefault();

    window.init.pageDisabled(true);
  }

  window.form = {
    disabling: adFormDisabling
  };
})();
