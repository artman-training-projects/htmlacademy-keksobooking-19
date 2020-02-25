/** @file генерация и отрисовка карточки */
/** @module card */

'use strict';

(function () {
  var Type = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var map = document.querySelector('.map');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  /** @function
   * @name makeCard
   * @description Создаёт карточку объявления
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

    var popupClose = advertCard.querySelector('.popup__close');

    /* Слушатели событий */
    popupClose.addEventListener('mousedown', onPopupCloseMousedown);
    document.addEventListener('keydown', onPopupCloseKeydown);

    /* Обработчики событий */
    function onPopupCloseMousedown(evt) {
      if (evt.which === window.utils.KeysClick.LEFT_MOUSE) {
        removeActiveCard();
      }
    }

    function onPopupCloseKeydown(evt) {
      if (evt.key === window.utils.KeysClick.ESCAPE) {
        removeActiveCard();
      }
    }

    function removeActiveCard() {
      advertCard.remove();
      if (map.querySelector('.map__pin--active')) {
        map.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }

      document.removeEventListener('keydown', onPopupCloseKeydown);
    }

    return advertCard;
  }

  /** @function
   * @name renderCard
   * @description Вставляет обявления в разметку
   * @param {number} card массив объявлений
   */
  function renderCard(card) {
    if (map.querySelector('.map__pin--active')) {
      map.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }

    map.querySelector('.map__filters-container').before(makeCard(card));
  }

  /** @function
   * @name removeCard
   * @description Удаляет карточки объявлений
   */
  function removeCard() {
    var cards = map.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      card.remove();
    });
  }

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
