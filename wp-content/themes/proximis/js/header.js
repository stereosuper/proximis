(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["header"],{

/***/ "./wp-content/themes/proximis/src/js/components/header.js":
/*!****************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/header.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const headerHandler = () => {
    const body = document.getElementsByTagName('body')[0];
    const burger = document.getElementById('burger');
    const close = document.getElementById('close-menu');

    burger.addEventListener('click', () => {
        body.classList.add('menu-open');
    });

    close.addEventListener('click', () => {
        body.classList.remove('menu-open');
    });
};

/* harmony default export */ __webpack_exports__["default"] = (headerHandler);


/***/ })

}]);
//# sourceMappingURL=header.js.map?3f36f07d0dcf4e65ced4b48bab2741ce