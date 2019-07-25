(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["newsletter"],{

/***/ "./wp-content/themes/proximis/src/js/components/newsletter.js":
/*!********************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/newsletter.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");


const headerHandler = () => {
    const newsletters = document.getElementsByClassName('newsletter');
    let input, email;

    if (!newsletters.length) return;

    Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(newsletters, elt => {
        input = elt.querySelector('.wpcf7-email');
        email = elt.querySelector('.email');

        input.addEventListener('focus', () => {
            email.classList.add('on');
        });

        input.addEventListener('blur', () => {
            if (!input.value) email.classList.remove('on');
        });
    });
};

/* harmony default export */ __webpack_exports__["default"] = (headerHandler);


/***/ })

}]);
//# sourceMappingURL=newsletter.js.map?5c2242373d519a0f9c37eb56d32a49e1