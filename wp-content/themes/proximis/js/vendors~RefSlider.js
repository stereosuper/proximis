(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~RefSlider"],{

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

/***/ "./node_modules/gsap/ScrollToPlugin.js":
/*!*********************************************!*\
  !*** ./node_modules/gsap/ScrollToPlugin.js ***!
  \*********************************************/
/*! exports provided: ScrollToPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollToPlugin", function() { return ScrollToPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollToPlugin; });
/* harmony import */ var _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 1.9.2
 * DATE: 2019-02-07
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
/* eslint-disable */




var _doc = (_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"].document || {}).documentElement,
		_window = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"],
		_max = function(element, axis) {
			var dim = (axis === "x") ? "Width" : "Height",
				scroll = "scroll" + dim,
				client = "client" + dim,
				body = document.body;
			return (element === _window || element === _doc || element === body) ? Math.max(_doc[scroll], body[scroll]) - (_window["inner" + dim] || _doc[client] || body[client]) : element[scroll] - element["offset" + dim];
		},
		_unwrapElement = function(value) {
			if (typeof(value) === "string") {
				value = TweenLite.selector(value);
			}
			if (value.length && value !== _window && value[0] && value[0].style && !value.nodeType) {
				value = value[0];
			}
			return (value === _window || (value.nodeType && value.style)) ? value : null;
		},
		_buildGetter = function(e, axis) { //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
			var p = "scroll" + ((axis === "x") ? "Left" : "Top");
			if (e === _window) {
				if (e.pageXOffset != null) {
					p = "page" + axis.toUpperCase() + "Offset";
				} else if (_doc[p] != null) {
					e = _doc;
				} else {
					e = document.body;
				}
			}
			return function() {
				return e[p];
			};
		},
		_getOffset = function(element, container) {
			var rect = _unwrapElement(element).getBoundingClientRect(),
				b = document.body,
				isRoot = (!container || container === _window || container === b),
				cRect = isRoot ? {top:_doc.clientTop - (window.pageYOffset || _doc.scrollTop || b.scrollTop || 0), left:_doc.clientLeft - (window.pageXOffset || _doc.scrollLeft || b.scrollLeft || 0)} : container.getBoundingClientRect(),
				offsets = {x: rect.left - cRect.left, y: rect.top - cRect.top};
			if (!isRoot && container) { //only add the current scroll position if it's not the window/body.
				offsets.x += _buildGetter(container, "x")();
				offsets.y += _buildGetter(container, "y")();
			}
			return offsets;
			/*	PREVIOUS
			var rect = _unwrapElement(element).getBoundingClientRect(),
				isRoot = (!container || container === _window || container === document.body),
				cRect = (isRoot ? _doc : container).getBoundingClientRect(),
				offsets = {x: rect.left - cRect.left, y: rect.top - cRect.top};
			if (!isRoot && container) { //only add the current scroll position if it's not the window/body.
				offsets.x += _buildGetter(container, "x")();
				offsets.y += _buildGetter(container, "y")();
			}
			return offsets;
			*/
		},
		_parseVal = function(value, target, axis, currentVal) {
			var type = typeof(value);
			return !isNaN(value) ? parseFloat(value) : (type === "string" && value.charAt(1) === "=") ? parseInt(value.charAt(0) + "1", 10) * parseFloat(value.substr(2)) + currentVal : (value === "max") ? _max(target, axis) : Math.min(_max(target, axis), _getOffset(value, target)[axis]);
		},

		ScrollToPlugin = _TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine.plugin({
			propName: "scrollTo",
			API: 2,
			global: true,
			version:"1.9.2",

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween) {
				this._wdw = (target === _window);
				this._target = target;
				this._tween = tween;
				if (typeof(value) !== "object") {
					value = {y:value}; //if we don't receive an object as the parameter, assume the user intends "y".
					if (typeof(value.y) === "string" && value.y !== "max" && value.y.charAt(1) !== "=") {
						value.x = value.y;
					}
				} else if (value.nodeType) {
					value = {y:value, x:value};
				}
				this.vars = value;
				this._autoKill = (value.autoKill !== false);
				this.getX = _buildGetter(target, "x");
				this.getY = _buildGetter(target, "y");
				this.x = this.xPrev = this.getX();
				this.y = this.yPrev = this.getY();
				if (value.x != null) {
					this._addTween(this, "x", this.x, _parseVal(value.x, target, "x", this.x) - (value.offsetX || 0), "scrollTo_x", true);
					this._overwriteProps.push("scrollTo_x");
				} else {
					this.skipX = true;
				}
				if (value.y != null) {
					this._addTween(this, "y", this.y, _parseVal(value.y, target, "y", this.y) - (value.offsetY || 0), "scrollTo_y", true);
					this._overwriteProps.push("scrollTo_y");
				} else {
					this.skipY = true;
				}
				return true;
			},

			//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
			set: function(v) {
				this._super.setRatio.call(this, v);

				var x = (this._wdw || !this.skipX) ? this.getX() : this.xPrev,
					y = (this._wdw || !this.skipY) ? this.getY() : this.yPrev,
					yDif = y - this.yPrev,
					xDif = x - this.xPrev,
					threshold = ScrollToPlugin.autoKillThreshold;

				if (this.x < 0) { //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
					this.x = 0;
				}
				if (this.y < 0) {
					this.y = 0;
				}
				if (this._autoKill) {
					//note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
					if (!this.skipX && (xDif > threshold || xDif < -threshold) && x < _max(this._target, "x")) {
						this.skipX = true; //if the user scrolls separately, we should stop tweening!
					}
					if (!this.skipY && (yDif > threshold || yDif < -threshold) && y < _max(this._target, "y")) {
						this.skipY = true; //if the user scrolls separately, we should stop tweening!
					}
					if (this.skipX && this.skipY) {
						this._tween.kill();
						if (this.vars.onAutoKill) {
							this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []);
						}
					}
				}
				if (this._wdw) {
					_window.scrollTo((!this.skipX) ? this.x : x, (!this.skipY) ? this.y : y);
				} else {
					if (!this.skipY) {
						this._target.scrollTop = this.y;
					}
					if (!this.skipX) {
						this._target.scrollLeft = this.x;
					}
				}
				this.xPrev = this.x;
				this.yPrev = this.y;
			}

		}),
		p = ScrollToPlugin.prototype;

	ScrollToPlugin.max = _max;
	ScrollToPlugin.getOffset = _getOffset;
	ScrollToPlugin.buildGetter = _buildGetter;
	ScrollToPlugin.autoKillThreshold = 7;

	p._kill = function(lookup) {
		if (lookup.scrollTo_x) {
			this.skipX = true;
		}
		if (lookup.scrollTo_y) {
			this.skipY = true;
		}
		return this._super._kill.call(this, lookup);
	};




/***/ })

}]);
//# sourceMappingURL=vendors~RefSlider.js.map?fd53a7a64e86f089789bc3510cffae7a