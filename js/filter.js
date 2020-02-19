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

  var advertType = housingType.value;
  var advertPrice = housingPrice.value;
  var advertRoom = housingRooms.value;
  var advertGuest = housingGuests.value;
  var advertFeatures = Array.from(filterForm.querySelectorAll('input:checked')).map(function (advert) {
    return advert.value;
  });

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
    window.debounce(updatePins);
  }

  /**
   * @function filterType
   * @description Фильтрация объявлений по типу жилья
   * @param {object} advert
   * @return {boolean} если true - возвращает объявление соглано условия
   */
  function filterType(advert) {
    return advertType === 'any' ? true : advertType === advert.offer.type;
  }

  /**
   * @function filterPrice
   * @description Фильтрация объявлений по цене жилья
   * @param {object} advert
   * @return {boolean} если true - возвращает объявление соглано условия
   */
  function filterPrice(advert) {
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

    return advertPrice === 'any' ? true :
      priceToRange[advertPrice].min <= advert.offer.price && priceToRange[advertPrice].max >= advert.offer.price;
  }

  /**
   * @function filterRoom
   * @description Фильтрация объявлений по колличеству комнат
   * @param {object} advert
   * @return {boolean} если true - возвращает объявление соглано условия
   */
  function filterRoom(advert) {
    return advertRoom === 'any' ? true :
      parseFloat(advertRoom) === advert.offer.rooms;
  }

  /**
   * @function filterGuest
   * @description Фильтрация объявлений по колличеству гостей
   * @param {object} advert
   * @return {boolean} если true - возвращает объявление соглано условия
   */
  function filterGuest(advert) {
    return advertGuest === 'any' ? true :
      parseFloat(advertGuest) === advert.offer.guests;
  }

  /**
   * @function filterFeatures
   * @description Фильтрация объявлений по преимуществам
   * @param {object} advert
   * @return {boolean} если true - возвращает объявление соглано условия
   */
  function filterFeatures(advert) {
    return advertFeatures.every(function (feature) {
      return advert.offer.features.includes(feature);
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
