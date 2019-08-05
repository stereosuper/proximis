(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Collant"],{

/***/ "./wp-content/themes/proximis/src/js/components/Collant.js":
/*!*****************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/Collant.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");


class Collant {
    constructor({
        selector = '.js-collant-selector',
        box = '.js-collant-box',
        offsetTop = '0px',
        offsetBottom = '0px'
    }) {
        this.collantSelector = selector;
        this.boxSelector = box;
        this.rawOffset = offsetBottom !== '0px' ? offsetBottom : offsetTop;
        this.offsetPosition = offsetBottom !== '0px' ? 'bottom' : 'top';

        this.collantElement = null;
        this.boxElement = null;

        this.boxBoundings = null;
        this.collantBoundings = null;
        this.windowPositions = null;
        this.offset = 0;

        this.scrollHandler = this.scrollHandler.bind(this);
        this.stickIt = this.stickIt.bind(this);
    }
    computeOffsetPx() {
        this.offset = parseInt(this.rawOffset.replace('px', ''), 10);
    }
    computeOffsetVh() {
        this.offset =
            (parseInt(this.rawOffset.replace('vh', ''), 10) * _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].h) /
            100;
    }
    computeOffset() {
        switch (true) {
            case /px$/.test(this.rawOffset):
                this.computeOffsetPx();
                break;
            case /vh$/.test(this.rawOffset):
                this.computeOffsetVh();
                break;

            default:
                break;
        }
    }
    getOffsetParents(element) {
        const { offsetParent } = element;
        let offset = element.offsetTop;
        if (offsetParent) {
            offset += this.getOffsetParents(offsetParent);
        }
        return offset;
    }
    setBoundings() {
        this.boxBoundings = this.boxElement.getBoundingClientRect();
        this.collantBoundings = this.collantElement.getBoundingClientRect();
    }
    getWindowPosition() {
        this.windowPositions = {
            y: window.scrollY
        };
    }
    resetCollantProperties() {
        this.collantElement.style.removeProperty('top');
        this.collantElement.style.removeProperty('bottom');
        this.collantElement.style.removeProperty('position');
    }
    handleTopOffset() {
        const scrollOffset = _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superScroll"].scrollTop + this.offset;
        const bottomDelimiter =
            this.boxBoundings.y +
            this.boxBoundings.height +
            this.windowPositions.y -
            this.collantBoundings.height;

        this.resetCollantProperties();
        if (scrollOffset > bottomDelimiter) {
            this.collantElement.style.top = 'auto';
            this.collantElement.style.bottom = '0px';
            this.collantElement.style.position = 'absolute';
        } else if (scrollOffset > this.collantDelimiter) {
            this.collantElement.style.top = `${this.offset}px`;
            this.collantElement.style.position = 'fixed';
        }
    }
    handleBottomOffset() {}
    scrollHandler() {
        if (this.offsetPosition === 'top') {
            this.handleTopOffset();
        } else if (this.offsetPosition === 'bottom') {
            this.handleBottomOffset();
        }
    }
    resizeHandler() {
        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].addResizeEndFunction(() => {
            this.getWindowPosition();
            this.setBoundings();
        });
    }
    stickIt() {
        [this.boxElement] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: this.boxSelector });
        if (!this.boxElement) return;

        [this.collantElement] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: this.collantSelector,
            ctx: this.boxElement
        });
        if (!this.collantElement) return;

        this.computeOffset();
        this.getWindowPosition();
        this.setBoundings();

        this.collantDelimiter = this.getOffsetParents(this.collantElement);

        this.scrollHandler();
        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superScroll"].addScrollFunction(() => {
            this.scrollHandler();
        });
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Collant);


/***/ })

}]);
//# sourceMappingURL=Collant.js.map?2891d257d09f6199045a678a719e64ee