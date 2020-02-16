/** @file генерация мокков */
/** @module mock */

'use strict';

(function () {
  var Utils = window.utils;

  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];

  var Сoordinates = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
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

  /** @function
   * @name createRandomAdvertisement
   * @description Создаёт объявление из случайных данных
   * @param {number} i индекс создаваемого объявления
   * @return {object} возвращает объект со случайными данными
   */
  function createRandomAdvertisement(i) {
    var location = {
      x: Utils.getRandomMinMax(Сoordinates.X_MIN, Сoordinates.X_MAX),
      y: Utils.getRandomMinMax(Сoordinates.Y_MIN, Сoordinates.Y_MAX)
    };
    var price = Utils.getRandomMinMax(Price.MIN, Price.MAX);
    var type = Object.keys(Type)[Utils.getRandomIndexFromArray(Object.keys(Type))];
    var features = Utils.getRandomElementsFromArray(Object.keys(Features), Utils.getRandomIndexFromArray(Object.keys(Features)));
    features.forEach(function (feature, index) {
      var temp = feature.toLowerCase();
      features[index] = temp;
    });
    var photos = Utils.getRandomElementsFromArray(PHOTOS, Utils.getRandomIndexFromArray(PHOTOS));

    var advert = {
      author: {
        avatar: i <= 8 ? 'img/avatars/user0' + i + '.png' : 'img/avatars/default.png',
      },
      offer: {
        title: 'Сдаю ' + Type[type],
        address: location.x + ', ' + location.y,
        price: price,
        type: type.toLowerCase(),
        rooms: Utils.getRandomMinMax(Rooms.MIN, Rooms.MAX),
        guests: Utils.getRandomMinMax(Guests.MIN, Guests.MAX),
        checkin: CHECK_TIMES[Utils.getRandomIndexFromArray(CHECK_TIMES)],
        checkout: CHECK_TIMES[Utils.getRandomIndexFromArray(CHECK_TIMES)],
        features: features,
        description: Type[type] + ' за ' + price + '₽/ночь отличный вариант',
        photos: photos
      },
      location: location
    };
    return advert;
  }

  /** @function
   * @name createAdvertisements
   * @description Создаёт массив объявлений
   * @param {number} count колличество создоваеммых объявлений
   * @return {array} возвращает массив созданных объявлений
   */
  function createAdvertisements(count) {
    var advertisementArray = [];
    for (var i = 0; i < count; i++) {
      advertisementArray.push(createRandomAdvertisement(i + 1));
    }
    return advertisementArray;
  }

  window.mock = {
    createAdvertisements: createAdvertisements
  };
})();
