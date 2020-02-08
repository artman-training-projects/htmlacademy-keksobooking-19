/** @file работа с формой */
/** @module form */

'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormFieldset = adForm.querySelectorAll('fieldset');

  adFormAddress.setAttribute('disabled', 'disabled');
  adFormAddress.setAttribute('value', Math.round(window.map.MainPin.X_START + window.map.MainPin.WIDTH / 2) + ', ' + Math.round(window.map.MainPin.Y_START + window.map.MainPin.HEIGHT / 2));

  adForm.addEventListener('input', onFormChange);

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
        adFormAddress.value = Math.round(window.map.MainPin.X_START + window.map.MainPin.WIDTH / 2) + ', ' + Math.round(window.map.MainPin.Y_START + window.map.MainPin.HEIGHT / 2);
        break;
      case false:
        adForm.classList.remove('ad-form--disabled');

        adFormFieldset.forEach(function (fieldset) {
          fieldset.removeAttribute('disabled');
        });

        adFormAddress.removeAttribute('disabled');
        adFormAddress.value = Math.round(window.map.MainPin.X_START + window.map.MainPin.WIDTH / 2) + ', ' + Math.round(window.map.MainPin.Y_START + window.map.MainPin.HEIGHT);
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
   * @description выставляет ограничивает минимальную цену, согласно типа жилья
   * @param {*} evt
   */
  function checkHousingType(evt) {
    var price = adForm.querySelector('#price');

    var HousePrice = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    price.setAttribute('min', HousePrice[evt.target.value]);
    price.placeholder = HousePrice[evt.target.value];
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
   * @description выстовляет соответствие между колличеством комнат, и возможного размещения гостей
   * @param {*} evt
   */
  function checkRooms(evt) {
    var capacity = adForm.querySelector('#capacity');

    // var Rooms = {
    //   1: [1],
    //   2: [1, 2],
    //   3: [1, 2, 3],
    //   100: 0
    // };

    // capacity[evt.target.value].setAttribute('selected', 'selected');

    switch (evt.target.value) {
      case '1':
        capacity[0].style = 'display: none;';
        capacity[1].style = 'display: none;';
        capacity[2].style = 'display: block;';
        capacity[3].style = 'display: none;';
        break;
      case '2':
        capacity[0].style = 'display: none;';
        capacity[1].style = 'display: block;';
        capacity[2].style = 'display: block;';
        capacity[3].style = 'display: none;';
        break;
      case '3':
        capacity[0].style = 'display: block;';
        capacity[1].style = 'display: block;';
        capacity[2].style = 'display: block;';
        capacity[3].style = 'display: none;';
        break;
      case '100':
        capacity[0].style = 'display: none;';
        capacity[1].style = 'display: none;';
        capacity[2].style = 'display: none;';
        capacity[3].style = 'display: block;';
        break;
    }
  }

  window.form = {
    disabling: adFormDisabling
  };
})();
