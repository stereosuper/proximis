(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ReferencesSlider"],{

/***/ "./wp-content/themes/proximis/src/js/components/ReferencesSlider.js":
/*!**************************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/ReferencesSlider.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");



class ReferencesSlider {
    constructor() {
        [this.referenceSlider] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-slider' });
        if (!this.referenceSlider) return;
        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superPolyfill"].initializeWhatwgFetch();
        this.getCurrentContext();
    }

    checkLoadingAction() {
        this.currentReferenceId = this.currentSlide.dataset.refId;

        const action = 'check_references';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `type=${this.type}&current_reference_id=${this.currentReferenceId}`
        })
            .then(res => {
                return res.json();
            })
            .then(([id]) => {
                this.newReferenceId = id;
                const [slide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
                    selector: `.js-ref-id-${this.newReferenceId}`
                });

                if (slide) {
                    slide.classList.add('js-ref-following-slide');

                    this.slideAnimation();
                } else {
                    this.startLoadingAction();
                }
            });
    }

    startLoadingAction() {
        const action = 'load_references';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `new_reference_id=${this.newReferenceId}`
        })
            .then(res => res.text())
            .then(response => {
                this.currentSlide.insertAdjacentHTML('afterend', response);

                this.slideAnimation();
            });
    }
    slideAnimation() {
        let selector = '.js-ref-following-slide';
        let xPercent = 0;
        switch (this.type) {
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

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(followingSlide, {
            xPercent
        });

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(followingSlide, {
            xPercent
        });

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(oldSlide, 0.3, {
            xPercent: -xPercent,
            onComplete: () => {
                gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(followingSlide, 0.3, {
                    xPercent: 0,
                    onComplete: this.resetContext()
                });
            }
        });
    }
    resetContext() {
        const [oldSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])(
            { selector: '.js-ref-current-slide' },
            this.referenceSlider
        );
        const [followingSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])(
            { selector: '.js-ref-following-slide' },
            this.referenceSlider
        );

        oldSlide.classList.remove('js-ref-current-slide');

        followingSlide.classList.remove('js-ref-following-slide');
        followingSlide.classList.add('js-ref-current-slide');

        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        this.getCurrentContext();
    }
    getCurrentContext() {
        [this.currentSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-current-slide' });
        const [prevButton, nextButton] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: '.js-button-hexagon',
            ctx: this.currentSlide
        });

        const { height } = this.currentSlide.getBoundingClientRect();
        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(this.referenceSlider, 0.3, { height: `${height}px` });

        prevButton.addEventListener(
            'click',
            () => {
                this.type = 'prev';
                this.checkLoadingAction();
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                this.type = 'next';
                this.checkLoadingAction();
            },
            false
        );
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReferencesSlider);


/***/ })

}]);
//# sourceMappingURL=ReferencesSlider.js.map?84cd1bf6655b3166a6fbff7acf0f3272