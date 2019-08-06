(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["united"],{

/***/ "./wp-content/themes/proximis/src/js/components/united.js":
/*!****************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/united.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");



const unitedAnimHandler = () => {
    const united = document.getElementById('united');

    if (!united) return;

    const words = united.querySelectorAll('.js-word');

    const unitedHeight = united.getBoundingClientRect().height;
    const unitedTop = united.offsetTop;

    let progress = 0;
    const tl = new gsap__WEBPACK_IMPORTED_MODULE_0__["TimelineMax"]({ paused: true });

    const scrollHandler = () => {
        const scrollOffset =
            _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superScroll"].scrollTop + _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superWindow"].windowHeight * 0.75;
        const scrollProgress = scrollOffset - unitedTop - unitedHeight * 0.2;

        if (scrollProgress < 0) return;

        progress = scrollProgress / (unitedHeight * 0.6);
        tl.progress(progress);
    };

    tl.staggerTo(words, 0.93, { x: 0, y: 0, ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Linear"].easeNone }, 0.07);

    scrollHandler();
    _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superScroll"].addScrollFunction(scrollHandler);
};

/* harmony default export */ __webpack_exports__["default"] = (unitedAnimHandler);


/***/ })

}]);
//# sourceMappingURL=united.js.map?9ec7c78ba17e67a9c28fdacd796eae94