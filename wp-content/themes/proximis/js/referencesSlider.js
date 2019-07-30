(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["referencesSlider"],{

/***/ "./wp-content/themes/proximis/src/js/components/referencesSlider.js":
/*!**************************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/referencesSlider.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");



class referencesSlider {
    constructor() {
        [this.referenceSlider] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-slider' });
        if (!this.referenceSlider) return;
        this.currentReferenceId = 0;

        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superPolyfill"].initializeWhatwgFetch();
        this.getCurrentContext();
    }

    checkLoadingAction({ type = 'next', currentSlide }) {
        this.currentReferenceId = currentSlide.dataset.refId;

        const action = 'check_references';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `type=${type}&current_reference_id=${this.currentReferenceId}`
        })
            .then(res => {
                return res.json();
            })
            .then(([id]) => {
                const [slide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: `.js-ref-id-${id}` });

                if (slide) {
                } else {
                    this.startLoadingAction();
                }
            });
    }

    startLoadingAction({ type = 'next', currentSlide }) {
        const action = 'load_references';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `type=${type}&current_reference_id=${this.currentReferenceId}`
        })
            .then(res => res.text())
            .then(response => {
                currentSlide.insertAdjacentHTML('afterend', response);

                let selector = '.js-ref-following-slide';
                let xPercent = 0;
                switch (type) {
                    case 'prev':
                        xPercent = -100;
                        break;
                    case 'next':
                        xPercent = 100;
                        break;
                    default:
                        xPercent = 100;
                        break;
                }

                const [followingSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
                    selector,
                    ctx: this.referenceSlider
                });

                const [oldSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
                    selector: '.js-ref-current-slide',
                    ctx: this.referenceSlider
                });

                oldSlide.classList.remove('ref-slide-init');

                const timeline = new gsap__WEBPACK_IMPORTED_MODULE_1__["TimelineLite"]({
                    onComplete: () => {
                        oldSlide.classList.remove('js-ref-current-slide');

                        followingSlide.classList.remove(
                            'js-ref-following-slide'
                        );
                        followingSlide.classList.add('js-ref-current-slide');
                        this.getCurrentContext();
                    }
                });

                gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(followingSlide, {
                    xPercent
                });

                timeline.add(
                    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(oldSlide, 0.3, {
                        xPercent: -xPercent
                    })
                );

                timeline.add(
                    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(followingSlide, 0.3, {
                        xPercent: 0
                    })
                );

                timeline.play();
            });
    }

    getCurrentContext() {
        const [currentSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-current-slide' });
        const [prevButton, nextButton] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: '.js-button-hexagon',
            ctx: currentSlide
        });

        const { height } = currentSlide.getBoundingClientRect();
        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(this.referenceSlider, 0.3, { height: `${height}px` });

        prevButton.addEventListener(
            'click',
            () => {
                this.checkLoadingAction({
                    type: 'prev',
                    currentSlide
                });
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                this.checkLoadingAction({
                    type: 'next',
                    currentSlide
                });
            },
            false
        );
    }
}

/* harmony default export */ __webpack_exports__["default"] = (referencesSlider);


/***/ })

}]);
//# sourceMappingURL=referencesSlider.js.map?61d79397048b901143c707a652d92e0b