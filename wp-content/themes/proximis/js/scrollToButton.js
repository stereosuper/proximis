(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["scrollToButton"],{

/***/ "./wp-content/themes/proximis/src/js/components/scrollToButton.js":
/*!************************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/scrollToButton.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");


const scrollToButtonHandler = () => {
    const scrollToButtons = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-button-scroll-to' });
    if (!scrollToButtons.length) return;

    Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(scrollToButtons, button => {
        console.log('TCL: scrollToButtonHandler -> button', button);
        button.addEventListener(
            'click',
            event => {
                event.preventDefault();
                const element = button.href;
                console.log('TCL: scrollToButtonHandler -> element', element);
            },
            false
        );
    });
};

/* harmony default export */ __webpack_exports__["default"] = (scrollToButtonHandler);


/***/ })

}]);
//# sourceMappingURL=scrollToButton.js.map?48978ea681cce64311233315ac41089e