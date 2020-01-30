'use strict';

var COUNT_ADVERTISEMENTS = 8;

var Сoordinates = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 630
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
  CONDITIONER: 'Кондиционер'
};

var Price = {
  MIN: 100,
  MAX: 1000
};

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];


function getRandomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIndexFromArray(array) {
  return Math.floor(Math.random() * array.length);
}

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
      checkin: CHECK_TIME[getRandomIndexFromArray(CHECK_TIME)],
      checkout: CHECK_TIME[getRandomIndexFromArray(CHECK_TIME)],
      features: features,
      description: Type[type] + ' за ' + price + '₽/ночь отличный вариант',
      photos: PHOTOS
    },
    location: location
  };
  return advert;
}

function createAdvertisementArray(count) {
  var advertisementArray = [];
  for (var i = 0; i < count; i++) {
    advertisementArray.push(createRandomAdvertisement(i + 1));
  }
  return advertisementArray;
}
var advertisements = createAdvertisementArray(COUNT_ADVERTISEMENTS);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
function makePin(advert) {
  var advertPin = templatePin.cloneNode(true);
  advertPin.style = 'left: ' + (advert.location.x - 25) + 'px; top: ' + (advert.location.y - 70) + 'px;';
  advertPin.querySelector('img').src = advert.author.avatar;
  advertPin.querySelector('img').alt = advert.offer.title;
  return advertPin;
}

function renderPins(pin) {
  var fragment = document.createDocumentFragment();
  pin.forEach(function (item) {
    fragment.appendChild(makePin(item));
  });
  map.querySelector('.map__pins').appendChild(fragment);
}

renderPins(advertisements);

var templateCard = document.querySelector('#card').content.querySelector('.map__card');
function makeCard(advert) {
  var advertCard = templateCard.cloneNode(true);
  advertCard.querySelector('.popup__title').textContent = advert.offer.title;
  advertCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  advertCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  advertCard.querySelector('.popup__type').textContent = Type[advert.offer.type];
  advertCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  advertCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  advertCard.querySelector('.popup__features').querySelectorAll('.popup__feature').textContent = advert.offer.feature;
  advertCard.querySelector('.popup__description').textContent = advert.offer.description;

  var popupPhotos = advertCard.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  var photos = advert.offer.photos;
  for (var i = 0; i < advert.offer.photos.length; i++) {
    var img = popupPhoto.cloneNode(false);
    img.src = photos[i];
    popupPhotos.appendChild(img);
  }
  popupPhoto.remove();

  advertCard.querySelector('.popup__avatar').src = advert.author.avatar;
  return advertCard;
}

function renderCards(card) {
  var fragment = document.createDocumentFragment();
  card.forEach(function (item) {
    fragment.appendChild(makeCard(item));
  });
  map.querySelector('.map__filters-container').before(fragment);
}

renderCards(advertisements);
