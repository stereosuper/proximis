(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Slider"],{

/***/ "./wp-content/themes/proximis/src/js/components/Slider.js":
/*!****************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/Slider.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");




function Slider(wrapper) {
    this.wrapper = wrapper;
    this.slides = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.slide', ctx: this.wrapper });
    this.dots = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.dot', ctx: this.wrapper });
    this.activeSlide = 0;
    this.nextSlide = 1;
    this.nbSlides = this.slides.length;
    Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(this.dots, (dot, dotIndex) => {
        dot.addEventListener('click', () => {
            if (
                !gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].isTweening(this.slides) &&
                this.activeSlide != dotIndex
            ) {
                this.kill();
                this.nextIndex(this, dotIndex);
            }
        });
    });

    this.calculHeight(this);

    _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].addResizeFunction(() => this.calculHeight(this));
}

Slider.prototype.calculHeight = function calculHeight(self) {
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.wrapper, {
        height: 'auto'
    });
    self.maxHeight = 0;
    self.slides.forEach(el => {
        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(el, {
            height: 'auto'
        });
        self.itemHeight = el.clientHeight;
        self.maxHeight = Math.max(self.maxHeight, self.itemHeight);
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.wrapper, {
        height: self.maxHeight
    });
    self.slides.forEach(el => {
        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(el, {
            height: self.maxHeight
        });
    });
};

Slider.prototype.play = function play() {
    if (this.nbSlides > 1) {
        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].delayedCall(20, this.next, [this]);
    }
};

Slider.prototype.pause = function pause() {};

Slider.prototype.next = function next(self) {
    if (self.activeSlide + 1 < self.nbSlides) {
        self.nextSlide = self.activeSlide + 1;
    } else {
        self.nextSlide = 0;
    }
    self.animate(self);
};

Slider.prototype.nextIndex = function nextIndex(self, index) {
    self.nextSlide = index;
    self.animate(self);
};

Slider.prototype.animate = function animate(self) {
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.slides[self.nextSlide], {
        zIndex: 3
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.slides[self.activeSlide], {
        zIndex: 4
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.dots[self.activeSlide], {
        css: {
            className: '-=active'
        }
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.dots[self.nextSlide], {
        css: {
            className: '+=active'
        }
    });
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(self.slides[self.activeSlide], 1, {
        'clip-path': 'circle(0% at 75% 75%)',
        onComplete: () => {
            gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.slides[self.nextSlide], {
                zIndex: 4
            });
            gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(self.slides[self.activeSlide], {
                zIndex: 2,
                'clip-path': 'circle(150% at 75% 75%)'
            });
            self.activeSlide = self.nextSlide;
        }
    });
    self.play();
};

Slider.prototype.kill = function kill() {
    gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].killTweensOf(this.next);
};

/* harmony default export */ __webpack_exports__["default"] = (Slider);


/***/ })

}]);
//# sourceMappingURL=Slider.js.map?341fed675de7a2150b906796f79ecd50