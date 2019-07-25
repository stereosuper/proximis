(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["io"],{

/***/ "./wp-content/themes/proximis/src/js/components/io.js":
/*!************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/io.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");



const io = function() {
    const threshold = 0.15;

    this.resized = true;

    this.init = () => {
        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superPolyfill"].initializeIntersectionObserver();

        const objectsToIO = [...document.querySelectorAll('[data-io]')];

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > threshold) {
                        this[`${entry.target.dataset.io}In`](entry.target);
                        if (entry.target.hasAttribute('data-io-single'))
                            observer.unobserve(entry.target);
                    } else if (entry.intersectionRatio < threshold) {
                        this[`${entry.target.dataset.io}Out`](entry.target);
                    }
                });
            },
            {
                threshold: threshold,
                rootMargin: '-100px 0px'
            }
        );

        objectsToIO.forEach(obj => {
            if (!obj.hasAttribute('data-io-observed')) {
                observer.observe(obj);
                obj.setAttribute('data-io-observed', '');
            }
        });
    };

    this.highlightedIn = entry => {
        let line = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.line', ctx: entry });
        if (line) {
            gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(line, 0.5, {
                scaleX: 1,
                ease: gsap__WEBPACK_IMPORTED_MODULE_1__["Power2"].easeInOut
            });
        }
    };

    this.highlightedOut = entry => {
        let line = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.line', ctx: entry });
        if (line) {
            gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(line, 0.2, {
                scaleX: 0,
                ease: gsap__WEBPACK_IMPORTED_MODULE_1__["Power2"].easeOut
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["default"] = (new io());


/***/ })

}]);
//# sourceMappingURL=io.js.map?bdb09c8d4031232cdeb4e2ba2e769381