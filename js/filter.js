/** @file Фильтр объявлений на карте */
/** @module filter */

'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');

  function filterDisabled(state) {
    switch (state) {
      case true:
        filterSelects.forEach(function (select) {
          select.disabled = true;
        });
        housingFeatures.disabled = true;
        break;
      case false:
        filterSelects.forEach(function (select) {
          select.disabled = false;
        });
        housingFeatures.disabled = false;
        break;
    }
  }

  filterForm.addEventListener('change', onFilterChange);

  /** @function
   * @name onFilterChange
   * @description Выполняет фильтрация при изменении формы
   * @param {event} evt
   */
  function onFilterChange(evt) {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }

    console.log(window.init.defaultAdverts);
    switch (evt.target.id) {
      case 'housing-type':
        filteredHousingType(evt);
        break;
      case 'housing-price':
        break;
      case 'housing-rooms':
        break;
      case 'housing-guests':
        break;
      case 'housing-features':
        break;
    }
  }

  function filteredHousingType(evt) {
    console.log(evt);
    console.log(evt.target);
    console.log(evt.target.value);
    // Pin.render();
  }

  window.filter = {
    disabled: filterDisabled
  };
})();
