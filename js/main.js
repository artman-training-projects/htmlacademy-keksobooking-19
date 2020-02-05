'use strict';

/** @file генерация мокков */
/** @module main */

var COUNT_ADVERTISEMENTS = 8;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];

var Сoordinates = {
  X_MIN: 0,
  X_MAX: 1200,
  X_START: 570,
  Y_MIN: 130,
  Y_MAX: 630,
  Y_START: 375
};

var Type = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

var Rooms = {
  MIN: 1,
  MAX: 4
};

var Guests = {
  MIN: 1,
  MAX: 4
};

var Features = {
  WIFI: 'Wi-Fi',
  DISHWASHER: 'посудомоечная машина',
  PARKING: 'паркинг',
  WASHER: 'стиральная машина',
  ELEVATOR: 'лифт',
  CONDITIONER: 'кондиционер'
};

var Price = {
  MIN: 0,
  MAX: 1000000
};

var Pins = {
  WIDTH: 50,
  HEIGHT: 70,
  WIDDTH_MAIN: 65,
  HEIGHT_MAIN: 85
};

var Keyboard = {
  ENTER: 'Enter',
  LEFT_MOUSE: 1
};

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
templateCard.style = 'visibility: hidden';

var advertisements = createAdvertisementArray(COUNT_ADVERTISEMENTS);

isPageDisabled(true);

/* Слушатели событий */
mapPinMain.addEventListener('mousedown', onMapPinClick);
mapPinMain.addEventListener('keydown', onMapPinClick);
adForm.addEventListener('change', adFormChange);

/* Обработчики событий */
/** @function
 * @name onMapPinClick
 * @description при нажатии мышкой на пин делает карту активной
 * @param {event} evt
 */
function onMapPinClick(evt) {
  evt.preventDefault();

  if ((evt.which === Keyboard.LEFT_MOUSE) || (evt.key === Keyboard.ENTER)) {
    isPageDisabled(false);
  }
}

/** @function
 * @name adFormChange
 * @description выполняет валидацию при внесении данных в форму
 * @param {event} evt
 */
function adFormChange(evt) {
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

/* Функции */
/** @function
 * @name getRandomMinMax
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @return {number} возвращает целое случайное из диапазона min и max
 */
function getRandomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/** @function
 * @name getRandomIndexFromArray
 * @param {array} array массив
 * @return {number} возвращает случайный индес из переданного массива
 */
function getRandomIndexFromArray(array) {
  return Math.floor(Math.random() * array.length);
}


/** @function
 * @name getRandomElementsFromArray
 * @param {array} array
 * @param {number} n колличество элементов, извлекаемых из массива
 * @return {array} возвращает массив случайных элементов, из элементов полученного массива
 */
function getRandomElementsFromArray(array, n) {
  var oldArray = array.slice();
  var newArray = [];
  for (var i = 0; i < n; i++) {
    var elem = getRandomIndexFromArray(oldArray);
    newArray.push(oldArray[elem]);
    oldArray.splice(elem, 1);
  }
  return newArray;
}

/** @function
 * @name createRandomAdvertisement
 * @param {number} i индекс создаваемого объявления
 * @return {object} возвращает объект со случайными данными
 */
function createRandomAdvertisement(i) {
  var location = {
    x: getRandomMinMax(Сoordinates.X_MIN, Сoordinates.X_MAX),
    y: getRandomMinMax(Сoordinates.Y_MIN, Сoordinates.Y_MAX)
  };
  var price = getRandomMinMax(Price.MIN, Price.MAX);
  var type = Object.keys(Type)[getRandomIndexFromArray(Object.keys(Type))];
  var features = getRandomElementsFromArray(Object.keys(Features), getRandomIndexFromArray(Object.keys(Features)));
  features.forEach(function (feature, index) {
    var temp = feature.toLowerCase();
    features[index] = temp;
  });
  var photos = getRandomElementsFromArray(PHOTOS, getRandomIndexFromArray(PHOTOS));

  var advert = {
    author: {
      avatar: i <= 8 ? 'img/avatars/user0' + i + '.png' : 'img/avatars/default.png',
    },
    offer: {
      title: 'Сдаю ' + Type[type],
      address: location.x + ', ' + location.y,
      price: price,
      type: type,
      rooms: getRandomMinMax(Rooms.MIN, Rooms.MAX),
      guests: getRandomMinMax(Guests.MIN, Guests.MAX),
      checkin: CHECK_TIMES[getRandomIndexFromArray(CHECK_TIMES)],
      checkout: CHECK_TIMES[getRandomIndexFromArray(CHECK_TIMES)],
      features: features,
      description: Type[type] + ' за ' + price + '₽/ночь отличный вариант',
      photos: photos
    },
    location: location
  };
  return advert;
}

/** @function
 * @name createAdvertisementArray
 * @param {number} count колличество создоваеммых объявлений
 * @return {array} возвращает массив созданных объявлений
 */
function createAdvertisementArray(count) {
  var advertisementArray = [];
  for (var i = 0; i < count; i++) {
    advertisementArray.push(createRandomAdvertisement(i + 1));
  }
  return advertisementArray;
}

/** @function
 * @name makePin
 * @param {object} advert принимает объявление
 * @return {object} возвращает html-элемент, раположение пина
 */
function makePin(advert) {
  var advertPin = templatePin.cloneNode(true);
  advertPin.style = 'left: ' + (advert.location.x - (Pins.WIDTH / 2)) + 'px; top: ' + (advert.location.y - Pins.HEIGHT) + 'px;';
  advertPin.querySelector('img').src = advert.author.avatar;
  advertPin.querySelector('img').alt = advert.offer.title;
  return advertPin;
}

/** @function
 * @name renderPins
 * @description вставляет пины в разметку
 * @param {array} pin массив объявлений
 */
function renderPins(pin) {
  var fragment = document.createDocumentFragment();

  pin.forEach(function (item) {
    fragment.appendChild(makePin(item));
  });

  map.querySelector('.map__pins').appendChild(fragment);
}

/** @function
 * @name makeCard
 * @param {object} advert принимает объявление
 * @return {object} возвращает html-элемент, карточка
 */
function makeCard(advert) {
  var advertCard = templateCard.cloneNode(true);
  advertCard.querySelector('.popup__title').textContent = advert.offer.title;
  advertCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  advertCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  advertCard.querySelector('.popup__type').textContent = Type[advert.offer.type];
  advertCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  advertCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  var popupFeatures = advertCard.querySelector('.popup__features');
  popupFeatures.innerHTML = '';
  var features = advert.offer.features;
  if (features.length === 0) {
    popupFeatures.remove();
  }

  features.forEach(function (feature) {
    var addFeature = document.createElement('li');
    addFeature.classList.add('popup__feature');
    addFeature.classList.add('popup__feature--' + feature);
    popupFeatures.appendChild(addFeature);
  });

  advertCard.querySelector('.popup__description').textContent = advert.offer.description;

  var popupPhotos = advertCard.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  var photos = advert.offer.photos;
  if (photos.length === 0) {
    popupPhotos.remove();
  }

  photos.forEach(function (photo) {
    var img = popupPhoto.cloneNode(false);
    img.src = photo;
    popupPhotos.appendChild(img);
  });
  popupPhoto.remove();

  advertCard.querySelector('.popup__avatar').src = advert.author.avatar;
  return advertCard;
}

/** @function
 * @name renderCards
 * @description вставляет обявления в разметку
 * @param {array} cards массив объявлений
 */
function renderCards(cards) {
  var fragment = document.createDocumentFragment();
  cards.forEach(function (item) {
    fragment.appendChild(makeCard(item));
  });

  map.querySelector('.map__filters-container').before(fragment);
}

/** @function
 * @name getCoordinates
 * @description вычиляет координаты элемента top left, относительно body
 * @param {*} element DOM-элемент
 * @return {object} возвращает координаты top и left
 */
function getCoordinates(element) {
  var maps = map.getBoundingClientRect();
  var pin = element.getBoundingClientRect();

  return {
    left: pin.left + pageXOffset - maps.x,
    top: pin.top + pageYOffset
  };
}

/** @function
 * @name isPageDisabled
 * @description ауправляет состояние страницы - активна или нет
 * @param {boolean} state true - страница не активна, false - страница активна
 */
function isPageDisabled(state) {
  if (state) {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    adFormFieldset.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });

    adFormAddress.setAttribute('value', Math.round(Сoordinates.X_START + Pins.WIDDTH_MAIN / 2) + ', ' + Math.round(Сoordinates.Y_START + Pins.HEIGHT_MAIN / 2));

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

    mapPinMain.addEventListener('mousedown', onMapPinClick);
    mapPinMain.addEventListener('keydown', onMapPinClick);
  } else {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    adFormFieldset.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });

    adFormAddress.setAttribute('disabled', 'disabled');
    adFormAddress.setAttribute('value', Math.round(Сoordinates.X_START + Pins.WIDDTH_MAIN / 2) + ', ' + Math.round(Сoordinates.Y_START + Pins.HEIGHT_MAIN));

    renderPins(advertisements);
    renderCards(advertisements);

    mapPinMain.removeEventListener('mousedown', onMapPinClick);
    mapPinMain.removeEventListener('keydown', onMapPinClick);
  }
}
