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
/* harmony import */ var gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/ScrollToPlugin */ "./node_modules/gsap/ScrollToPlugin.js");




// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_2__["default"];

class ReferencesSlider {
    constructor() {
        this.referenceSlider = null;
        this.idsList = [];
        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superPolyfill"].initializeWhatwgFetch();
    }
    getAllSlideIds(callback) {
        const action = 'get_references_ids';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(({ ids }) => {
                this.idsList = [...ids];
                callback();
            });
    }
    selectFollowingElement({ id = null }) {
        if (id !== null) {
            this.newReferenceId = id;
        } else {
            this.findFollowingElement();
        }
    }
    findFollowingElement() {
        const idIndex = this.idsList.indexOf(this.currentReferenceId);

        if (this.type === 'next') {
            this.newReferenceId =
                idIndex + 2 > this.idsList.length
                    ? this.idsList.slice(0, 1)
                    : this.idsList.slice(idIndex + 1, idIndex + 2);
        } else if (this.type === 'prev') {
            this.newReferenceId =
                idIndex - 1 < 0
                    ? this.idsList.slice(-1)
                    : this.idsList.slice(idIndex - 1, idIndex - 2);
        }
    }
    checkLoadingCall() {
        if (this.newReferenceId === this.currentReferenceId) return;
        const [slide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: `.js-ref-id-${this.newReferenceId}`
        });

        if (slide) {
            slide.classList.add('js-ref-following-slide');
            this.slideAnimation();
        } else {
            this.startLoadingAction();
        }
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

        this.setCurrentContext();
    }
    setCurrentContext() {
        if (this.idsList.length < 2) return;

        [this.currentSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-current-slide' });
        this.currentReferenceId = parseInt(this.currentSlide.dataset.refId, 10);

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
                this.findFollowingElement();
                this.checkLoadingCall();
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                this.type = 'next';
                this.findFollowingElement();
                this.checkLoadingCall();
            },
            false
        );
    }
    initializeCaseStudyClickEvent() {
        const caseStudies = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-case-study' });

        Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(caseStudies, caseStudy => {
            caseStudy.addEventListener(
                'click',
                event => {
                    event.preventDefault();
                    const selectedId = parseInt(caseStudy.dataset.refId, 10);

                    const offset =
                        window.scrollY +
                        this.referenceSlider.getBoundingClientRect().top;

                    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenLite"].to(window, 0.5, {
                        scrollTo: {
                            y: offset
                        },
                        ease: gsap__WEBPACK_IMPORTED_MODULE_1__["Power2"].easeInOut
                    });

                    this.selectFollowingElement({ id: selectedId });
                    this.checkLoadingCall();
                },
                false
            );
        });
    }
    initialize() {
        [this.referenceSlider] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-slider' });
        if (!this.referenceSlider) return;

        this.getAllSlideIds(() => {
            this.initializeCaseStudyClickEvent();
            this.setCurrentContext();
        });
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReferencesSlider);


/***/ })

}]);
//# sourceMappingURL=referencesSlider.js.map?94d261b2cd16286f48b9da8dce0567f7