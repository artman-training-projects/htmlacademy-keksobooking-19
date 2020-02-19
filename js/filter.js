/** @file Фильтр объявлений на карте */
/** @module filter */

'use strict';

(function () {
  var priceToRange = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');

  var advertType = housingType.value;
  var advertPrice = housingPrice.value;
  var advertRoom = housingRooms.value;
  var advertGuest = housingGuests.value;
  var advertFeatures = filterForm.querySelectorAll('input:checked');

  var filteredAdverts;

  filterForm.addEventListener('change', onFilterChange);

  /** @function
   * @name onFilterChange
   * @description Выполняет фильтрация при изменении формы
   * @param {event} evt
   */
  function onFilterChange(evt) {
    filteredAdverts = window.init.defaultAdverts;

    if (evt.target.id === housingType.id) {
      advertType = evt.target.value;
    } else if (evt.target.id === housingPrice.id) {
      advertPrice = evt.target.value;
    } else if (evt.target.id === housingRooms.id) {
      advertRoom = evt.target.value;
    } else if (evt.target.id === housingGuests.id) {
      advertGuest = evt.target.value;
    } else if (evt.target.id === ('filter-' + evt.target.value)) {
      advertFeatures = Array.from(filterForm.querySelectorAll('input:checked')).map(function (advert) {
        return advert.value;
      });
    }

    filteredAdverts = filteredAdverts.filter(filterType).filter(filterPrice).filter(filterRoom).filter(filterGuest).filter(filterFeatures);
    updatePins();
  }


  function filterType(item) {
    return advertType === 'any' ? true : advertType === item.offer.type;
  }

  function filterPrice(item) {
    return advertPrice === 'any' ? true :
      priceToRange[advertPrice].min <= item.offer.price && priceToRange[advertPrice].max >= item.offer.price;
  }

  function filterRoom(item) {
    return advertRoom === 'any' ? true :
      parseFloat(advertRoom) === item.offer.rooms;
  }

  function filterGuest(item) {
    return advertGuest === 'any' ? true :
      parseFloat(advertGuest) === item.offer.guests;
  }

  function filterFeatures(item) {
    return advertFeatures.every(function (feature) {
      return item.offer.features.includes(feature);
    });
  }

  /**
   * @function updatePins
   * @description Перерисовка пинов на карте, согласно фильтра
   */
  function updatePins() {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }

    // console.log(advertType + ' ' + advertPrice + ' ' + advertRooms + ' ' + advertGuests);

    removeOldPins();
    window.pin.render(filteredAdverts);
  }

  /**
   * @function removeOldPins
   * @description Удаляет старые пины
   */
  function removeOldPins() {
    var oldPins = document.querySelectorAll('.map__pin');
    oldPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  }

  /**
   * @function filterDisabled
   * @description Переключение блокировки фильтра объявлений
   * @param {boolean} state
   */
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

  window.filter = {
    disabled: filterDisabled
  };
})();
