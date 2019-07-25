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

    _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superPolyfill"].initializeIntersectionObserver();

    const words = united.querySelectorAll('.js-word');

    let windowHeight = window.innerHeight * 0.65;

    // Constants used to create the intersection observer threshold array
    const samplesNumber = 100;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;

    let animLaunched = false,
        oScrollTop = 0;

    const init = () => {
        const tween = gsap__WEBPACK_IMPORTED_MODULE_0__["TweenLite"].to(words, 1, {
            x: 0,
            y: 0,
            paused: true,
            ease: gsap__WEBPACK_IMPORTED_MODULE_0__["Linear"].easeNone
        });
        let progress = 0;

        animLaunched = true;
        windowHeight += oScrollTop;

        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superScroll"].addScrollFunction(() => {
            progress = (_stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superScroll"].scrollTop - oScrollTop) / windowHeight;
            if (progress >= 0) tween.progress(progress);
        });
    };

    const intersectionCallback = entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio < 0.2 || animLaunched) return;
            oScrollTop = _stereorepo_sac__WEBPACK_IMPORTED_MODULE_1__["superScroll"].scrollTop;
            init();
        });
    };

    for (index; index <= samplesNumber; index++) {
        thresholdSamples[index] = index / samplesNumber;
    }

    observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: '0px',
        threshold: thresholdSamples
    });

    observer.observe(united);
};

/* harmony default export */ __webpack_exports__["default"] = (unitedAnimHandler);


/***/ })

}]);
//# sourceMappingURL=united.js.map?005d9cb7aed46adfeaa96c076a9277eb