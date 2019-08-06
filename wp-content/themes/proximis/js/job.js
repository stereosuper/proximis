(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["job"],{

/***/ "./node_modules/@stereorepo/collant/src/components/Collant.js":
/*!********************************************************************!*\
  !*** ./node_modules/@stereorepo/collant/src/components/Collant.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");


class Collant {
    constructor({
        ctx = null,
        selector = '.js-collant-selector',
        box = '.js-collant-box',
        offsetTop = '0px',
        offsetBottom = '0px'
    }) {
        this.contextElement = ctx;
        this.collantSelector = selector;
        this.boxSelector = box;
        this.rawOffset = offsetBottom !== '0px' ? offsetBottom : offsetTop;
        this.offsetPosition = offsetBottom !== '0px' ? 'bottom' : 'top';

        this.state = {
            resizing: false
        };

        this.collantElement = null;
        this.boxElement = null;

        this.boxBoundings = null;
        this.collantBoundings = null;
        this.windowPositions = null;
        this.offset = 0;

        this.scrollHandler = this.scrollHandler.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.stickIt = this.stickIt.bind(this);
    }
    computeOffsetPx() {
        this.offset = parseInt(this.rawOffset.replace('px', ''), 10);
    }
    computeOffsetVh() {
        this.offset =
            (parseInt(this.rawOffset.replace('vh', ''), 10) *
                _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].windowHeight) /
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
    handleOffset() {
        let scrollOffset = 0;
        if (this.offsetPosition === 'top') {
            scrollOffset = _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superScroll"].scrollTop + this.offset;
        } else if (this.offsetPosition === 'bottom') {
            scrollOffset =
                _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superScroll"].scrollTop +
                _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].h -
                this.collantBoundings.height -
                this.offset;
        }

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
            if (this.offsetPosition === 'top') {
                this.collantElement.style.top = `${this.offset}px`;
                this.collantElement.style.bottom = 'auto';
            } else if (this.offsetPosition === 'bottom') {
                this.collantElement.style.top = 'auto';
                this.collantElement.style.bottom = `${this.offset}px`;
            }
            this.collantElement.style.position = 'fixed';
        }
    }
    scrollHandler() {
        if (this.state.resizing) return;
        this.handleOffset();
    }
    resizeHandler() {
        this.resetCollantProperties();
        this.getWindowPosition();
        this.setBoundings();

        this.collantDelimiter = this.getOffsetParents(this.collantElement);

        this.state.resizing = false;
    }
    stickIt() {
        [this.boxElement] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: this.boxSelector,
            ctx: this.contextElement
        });
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
        this.scrollFunctionId = _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superScroll"].addScrollFunction(() => {
            this.scrollHandler();
        });

        this.resizeFunctionId = _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].addResizeFunction(() => {
            this.state.resizing = true;
        });

        this.resizeEndFunctionId = _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].addResizeEndFunction(
            this.resizeHandler
        );
    }
    ripIt() {
        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superScroll"].removeScrollFunction(this.scrollFunctionId);
        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].removeResizeFunction(this.resizeFunctionId);
        _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["superWindow"].removeResizeEndFunction(this.resizeEndFunctionId);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Collant);


/***/ }),

/***/ "./node_modules/@stereorepo/collant/src/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@stereorepo/collant/src/index.js ***!
  \*******************************************************/
/*! exports provided: Collant, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collant", function() { return Collant; });
/* harmony import */ var _components_Collant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Collant */ "./node_modules/@stereorepo/collant/src/components/Collant.js");


const Collant = _components_Collant__WEBPACK_IMPORTED_MODULE_0__["default"];

/* harmony default export */ __webpack_exports__["default"] = ({
    Collant
});


/***/ }),

/***/ "./wp-content/themes/proximis/src/js/components/job.js":
/*!*************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/job.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_collant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/collant */ "./node_modules/@stereorepo/collant/src/index.js");


const jobHandler = () => {
    const mail = document.getElementById('job-mail');

    if (!mail) return;

    new _stereorepo_collant__WEBPACK_IMPORTED_MODULE_0__["Collant"]({
        //ctx: mail,
        selector: mail,
        box: '.container-tiny',
        offsetTop: '100px'
    });
};

/* harmony default export */ __webpack_exports__["default"] = (jobHandler);


/***/ })

}]);
//# sourceMappingURL=job.js.map?71ce496d5631e8204e80adbe0a5021c9