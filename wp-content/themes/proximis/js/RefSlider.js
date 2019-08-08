(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["RefSlider"],{

/***/ "./wp-content/themes/proximis/src/js/components/RefSlider.js":
/*!*******************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/RefSlider.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var _stereorepo_collant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stereorepo/collant */ "./node_modules/@stereorepo/collant/src/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gsap/ScrollToPlugin */ "./node_modules/gsap/ScrollToPlugin.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global */ "./wp-content/themes/proximis/src/js/global/index.js");







// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_3__["default"];

class ReferencesSlider {
    constructor() {
        this.state = {
            transitioning: false,
            sticky: false
        };

        this.referenceSlider = null;
        this.loader = null;
        this.idsList = [];
        this.slugsList = [];
        this.collants = [];
        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        this.resetContext = this.resetContext.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);

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
            .then(({ ids, slugs }) => {
                this.idsList = [...ids];
                this.slugsList = [...slugs];
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
    scrollToReference() {
        const offset =
            window.scrollY + this.referenceSlider.getBoundingClientRect().top;

        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenLite"].to(window, 0.5, {
            scrollTo: {
                y: offset
            },
            ease: _global__WEBPACK_IMPORTED_MODULE_4__["easing"].easeInOut
        });
    }
    changeLocationHash(followingSlide) {
        const slug = followingSlide.dataset.refSlug;

        window.location.hash = slug;
    }
    checkLocationHash() {
        const { hash } = window.location;
        if (hash) {
            if (this.state.transitioning) return;

            const slugIndex = this.slugsList.indexOf(hash.replace('#', ''));
            this.newReferenceId = this.idsList[slugIndex];

            this.type = 'next';
            this.state.transitioning = true;
            this.scrollToReference();
            this.checkLoadingCall();
        }
    }
    checkLoadingCall() {
        if (this.newReferenceId !== this.currentReferenceId) {
            const [slide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
                selector: `.js-ref-id-${this.newReferenceId}`
            });

            if (slide) {
                slide.classList.add('js-ref-following-slide');
                this.slideAnimation();
            } else {
                this.startLoadingAction();
            }
        } else {
            this.newReferenceId = null;
            this.type = null;
            this.state.transitioning = false;
        }
    }
    stickElements() {
        this.state.sticky = true;

        Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(this.collants, collant => {
            collant.stickIt();
        });
    }
    unstickElements() {
        Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(this.collants, collant => {
            collant.ripIt();
        });

        this.state.sticky = false;
    }
    startLoadingAction() {
        this.loader.classList.add('loading');

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

        this.changeLocationHash(followingSlide);

        oldSlide.classList.remove('ref-slide-init');

        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].set(followingSlide, {
            xPercent
        });

        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].set(followingSlide, {
            xPercent
        });

        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].to(oldSlide, 0.5, {
            xPercent: -xPercent,
            ease: _global__WEBPACK_IMPORTED_MODULE_4__["easing"].easeInOut,
            force3D: true,
            onStart: () => {
                gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].to(followingSlide, 0.5, {
                    xPercent: 0,
                    ease: _global__WEBPACK_IMPORTED_MODULE_4__["easing"].easeInOut,
                    force3D: true,
                    onComplete: this.resetContext
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

        this.loader.classList.remove('loading');

        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].set(followingSlide, { clearProps: 'all' });

        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        this.state.transitioning = false;
        this.setCurrentContext();
    }
    setCurrentContext() {
        if (this.idsList.length < 2) return;

        this.unstickElements();
        this.collants = [];

        [this.currentSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: '.js-ref-current-slide'
        });
        this.currentReferenceId = parseInt(this.currentSlide.dataset.refId, 10);

        const [prevButton, nextButton] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: '.js-button-hexagon',
            ctx: this.currentSlide
        });

        const { height } = this.currentSlide.getBoundingClientRect();
        gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].to(this.referenceSlider, 0.3, {
            height: `${height}px`,
            ease: _global__WEBPACK_IMPORTED_MODULE_4__["easing"].easeInOut,
            force3D: true,
            onComplete: () => {
                gsap__WEBPACK_IMPORTED_MODULE_2__["TweenMax"].set(this.referenceSlider, { clearProps: 'transform' });
            }
        });

        prevButton.addEventListener(
            'click',
            () => {
                if (this.state.transitioning) return;

                this.type = 'prev';
                this.changeSlide();
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                if (this.state.transitioning) return;

                this.type = 'next';
                this.changeSlide();
            },
            false
        );

        if (
            !this.state.sticky &&
            _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].windowWidth > _global__WEBPACK_IMPORTED_MODULE_4__["breakpoints"].horizontal.xl
        ) {
            this.collants = [
                ...this.collants,
                new _stereorepo_collant__WEBPACK_IMPORTED_MODULE_1__["Collant"]({
                    ctx: this.currentSlide,
                    selector: '.js-nav-btn',
                    box: '.js-ref-first-part',
                    offsetTop: '100px'
                }),
                new _stereorepo_collant__WEBPACK_IMPORTED_MODULE_1__["Collant"]({
                    ctx: this.currentSlide,
                    selector: '.js-btn-download',
                    box: '.js-ref-content-wrapper',
                    offsetTop: '160px'
                }),
                new _stereorepo_collant__WEBPACK_IMPORTED_MODULE_1__["Collant"]({
                    ctx: this.currentSlide,
                    selector: '.js-infos-datas',
                    box: '.js-content-btn-infos',
                    offsetTop: '25px'
                })
            ];

            this.stickElements();
        }
    }
    changeSlide() {
        this.state.transitioning = true;
        this.findFollowingElement();
        this.checkLoadingCall();
    }
    initializeCaseStudyClickEvent() {
        const caseStudies = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-case-study' });

        Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(caseStudies, caseStudy => {
            caseStudy.addEventListener(
                'click',
                event => {
                    event.preventDefault();
                    if (this.state.transitioning) return;
                    const selectedId = parseInt(caseStudy.dataset.refId, 10);

                    this.scrollToReference();
                    this.selectFollowingElement({ id: selectedId });
                    this.checkLoadingCall();
                },
                false
            );
        });
    }
    resizeHandler() {
        if (
            !this.state.sticky &&
            _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].windowWidth > _global__WEBPACK_IMPORTED_MODULE_4__["breakpoints"].horizontal.xl
        ) {
            this.stickElements();
        } else if (
            this.state.sticky &&
            _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].windowWidth <= _global__WEBPACK_IMPORTED_MODULE_4__["breakpoints"].horizontal.xl
        ) {
            this.unstickElements();
        }
    }
    initialize() {
        [this.referenceSlider] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-slider' });
        if (!this.referenceSlider) return;
        [this.loader] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: '.js-loader',
            ctx: this.referenceSlider
        });

        this.getAllSlideIds(() => {
            this.initializeCaseStudyClickEvent();
            this.setCurrentContext();
            this.checkLocationHash();
        });

        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].addResizeEndFunction(this.resizeHandler);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReferencesSlider);


/***/ })

}]);
//# sourceMappingURL=RefSlider.js.map?038890f37db7285e06a6ab585826c137