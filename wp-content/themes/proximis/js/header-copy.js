(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["header-copy"],{

/***/ "./wp-content/themes/proximis/src/js/components/header copy.js":
/*!*********************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/header copy.js ***!
  \*********************************************************************/
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
//# sourceMappingURL=header-copy.js.map?49f7d4da854e7b7156783b7a1006e23c