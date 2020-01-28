'use strict';

var COUNT_ADVERTISEMENTS = 8;

var Advertisement = {
  AUTHOR: {
    AVATAR: getAvatars(COUNT_ADVERTISEMENTS),
  },
  OFFER: {
    TITLE: ['A', 'B', 'C', 'D'],
    PRICE: {
      MIN: 100,
      MAX: 1000
    },
    TYPE: ['palace', 'flat', 'house', 'bungalo'],
    ROOMS: [1, 2, 3, 10],
    GUESTS: [1, 2, 3, 10],
    CHECKIN: ['12:00', '13:00', '14:00'],
    CHECKOUT: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    DESCRIPTION: ['aaaaaaaaaa', 'bbbbbbbbbb', 'cccccccccc', 'dddddddddd'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },
  LOCATION: {
    X: {
      MIN: 40,
      MAX: 1160
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  }
};

function getRandomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomItem(arr) {
  return Math.floor(Math.random() * arr.length);
}

function getAvatars(count) {
  var avatars = [];
  for (var i = 0; i < count; i++) {
    avatars.push(i < 8 ? ('img/avatars/user0' + (i + 1) + '.png') : ('img/avatars/default.png'));
  }
  return avatars;
}


function createRandomAdvertisement() {
  var location = [getRandomMinMax(Advertisement.LOCATION.X.MIN, Advertisement.LOCATION.X.MAX), getRandomMinMax(Advertisement.LOCATION.Y.MIN, Advertisement.LOCATION.Y.MAX)];

  var advert = {
    author: {
      avatar: Advertisement.AUTHOR.AVATAR[getRandomItem(Advertisement.AUTHOR.AVATAR)],
    },
    offer: {
      title: getRandomItem(Advertisement.OFFER.TITLE),
      address: location[0] + ', ' + location[1],
      price: getRandomMinMax(Advertisement.OFFER.PRICE.MIN, Advertisement.OFFER.PRICE.MAX),
      type: getRandomItem(Advertisement.OFFER.TYPE),
      rooms: getRandomItem(Advertisement.OFFER.ROOMS),
      guests: getRandomItem(Advertisement.OFFER.GUESTS),
      checkin: getRandomItem(Advertisement.OFFER.CHECKIN),
      checkout: getRandomItem(Advertisement.OFFER.CHECKOUT),
      features: getRandomItem(Advertisement.OFFER.FEATURES),
      description: getRandomItem(Advertisement.OFFER.DESCRIPTION),
      photos: getRandomItem(Advertisement.OFFER.PHOTOS)
    },
    location: {
      x: location[0],
      y: location[1]
    }
  };

  return advert;
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
