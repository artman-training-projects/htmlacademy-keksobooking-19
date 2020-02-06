/** @file вспомогательные функции */
/** @module utils */

'use strict';

(function () {
  var KeysClick = {
    ENTER: 'Enter',
    LEFT_MOUSE: 1
  };

  var map = document.querySelector('.map');

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

  window.util = {
    KeysClick: KeysClick,
    getRandomMinMax: getRandomMinMax,
    getRandomIndexFromArray: getRandomIndexFromArray,
    getRandomElementsFromArray: getRandomElementsFromArray,
    getCoordinates: getCoordinates
  };
})();
