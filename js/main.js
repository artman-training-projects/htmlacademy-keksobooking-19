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
  var features = Object.keys(Features);

  var advert = {
    author: {
      avatar: i <= 8 ? 'img/avatars/user0' + i + '.png' : 'img/avatars/default.png',
    },
    offer: {
      title: 'Сдаю ' + Type[type],
      address: location.x + ', ' + location.y,
      price: price,
      type: type.toLowerCase(),
      rooms: getRandomMinMax(Rooms.MIN, Rooms.MAX),
      guests: getRandomMinMax(Guests.MIN, Guests.MAX),
      checkin: 'Заезд после ' + CHECK_TIME[getRandomIndexFromArray(CHECK_TIME)],
      checkout: 'выезд до ' + CHECK_TIME[getRandomIndexFromArray(CHECK_TIME)],
      features: getRandomElementsFromArray(features, getRandomIndexFromArray(features)),
      description: Type[type] + ' за ' + price + ' ₽/ночь отличный вариант',
      photos: PHOTOS
    },
    location: location
  };

  return advert;
}

console.log(createRandomAdvertisement(1));

/**

function getAvatars(count) {
  var avatars = [];
  for (var i = 0; i < count; i++) {
    avatars.push(i < 8 ? ('img/avatars/user0' + (i + 1) + '.png') : ('img/avatars/default.png'));
  }
  return avatars;
}


function createAdvertisementList(count) {
  var list = [];
  for (var i = 0; i < count; i++) {
    list.push(createRandomAdvertisement());
  }
  return list;
}

var advertisementItems = createAdvertisementList(COUNT_ADVERTISEMENTS);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
function makePin(advert) {
  var advertPin = templatePin.cloneNode(true);
  advertPin.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px;';
  advertPin.querySelector('img').src = advert.author.avatar;
  advertPin.querySelector('img').alt = advert.offer.title;
  return advertPin;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < COUNT_ADVERTISEMENTS; i++) {
  fragment.appendChild(makePin(advertisementItems[i]));
}
map.querySelector('.map__pins').appendChild(fragment);

*/
