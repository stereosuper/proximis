(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["RefSlider"],{

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




/***/ }),

/***/ "./wp-content/themes/proximis/src/js/components/RefSlider.js":
/*!*******************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/RefSlider.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stereorepo/sac */ "./node_modules/@stereorepo/sac/src/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/ScrollToPlugin */ "./node_modules/gsap/ScrollToPlugin.js");
/* harmony import */ var _Collant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Collant */ "./wp-content/themes/proximis/src/js/components/Collant.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global */ "./wp-content/themes/proximis/src/js/global/index.js");







// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = gsap_ScrollToPlugin__WEBPACK_IMPORTED_MODULE_2__["default"];

class ReferencesSlider {
    constructor() {
        this.state = {
            transitioning: false
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

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenLite"].to(window, 0.5, {
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
        this.collants = [
            ...this.collants,
            new _Collant__WEBPACK_IMPORTED_MODULE_3__["default"]({
                ctx: this.currentSlide,
                selector: '.js-nav-btn',
                box: '.js-ref-first-part',
                offsetTop: '100px'
            }),
            new _Collant__WEBPACK_IMPORTED_MODULE_3__["default"]({
                ctx: this.currentSlide,
                selector: '.js-btn-download',
                box: '.js-ref-content-wrapper',
                offsetTop: '160px'
            }),
            new _Collant__WEBPACK_IMPORTED_MODULE_3__["default"]({
                ctx: this.currentSlide,
                selector: '.js-infos-datas',
                box: '.js-content-btn-infos',
                offsetTop: '25px'
            })
        ];

        Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(this.collants, collant => {
            collant.stickIt();
        });
    }
    unstickElements() {
        Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["forEach"])(this.collants, collant => {
            collant.ripIt();
        });

        this.collant = [];
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

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(followingSlide, {
            xPercent
        });

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(followingSlide, {
            xPercent
        });

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(oldSlide, 0.5, {
            xPercent: -xPercent,
            ease: _global__WEBPACK_IMPORTED_MODULE_4__["easing"].easeInOut,
            onStart: () => {
                gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(followingSlide, 0.5, {
                    xPercent: 0,
                    ease: _global__WEBPACK_IMPORTED_MODULE_4__["easing"].easeInOut,
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

        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].set(followingSlide, { clearProps: 'all' });

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

        [this.currentSlide] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({ selector: '.js-ref-current-slide' });
        this.currentReferenceId = parseInt(this.currentSlide.dataset.refId, 10);

        const [prevButton, nextButton] = Object(_stereorepo_sac__WEBPACK_IMPORTED_MODULE_0__["query"])({
            selector: '.js-button-hexagon',
            ctx: this.currentSlide
        });

        const { height } = this.currentSlide.getBoundingClientRect();
        gsap__WEBPACK_IMPORTED_MODULE_1__["TweenMax"].to(this.referenceSlider, 0.3, {
            height: `${height}px`,
            ease: _global__WEBPACK_IMPORTED_MODULE_4__["easing"].easeInOut
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

        this.stickElements();
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
    }
}

/* harmony default export */ __webpack_exports__["default"] = (ReferencesSlider);


/***/ }),

/***/ "./wp-content/themes/proximis/src/js/global/index.js":
/*!***********************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/global/index.js ***!
  \***********************************************************/
/*! exports provided: easing, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easing", function() { return easing; });
/* harmony import */ var _plugins_CustomEase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/CustomEase */ "./wp-content/themes/proximis/src/js/plugins/CustomEase.js");


const easing = {
    easeIn: _plugins_CustomEase__WEBPACK_IMPORTED_MODULE_0__["CustomEase"].create('custom', 'M0,0 C0.42,0.08, 0.45,0.09 1,1'),
    easeOut: _plugins_CustomEase__WEBPACK_IMPORTED_MODULE_0__["CustomEase"].create('custom', 'M0,0 C0,0.15, 0.1,0.85 1,1'),
    easeInOut: _plugins_CustomEase__WEBPACK_IMPORTED_MODULE_0__["CustomEase"].create('custom', 'M0,0 C0.38,0, 0.45,0.93 1,1')
};

/* harmony default export */ __webpack_exports__["default"] = ({ easing });


/***/ }),

/***/ "./wp-content/themes/proximis/src/js/plugins/CustomEase.js":
/*!*****************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/plugins/CustomEase.js ***!
  \*****************************************************************/
/*! exports provided: CustomEase, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomEase", function() { return CustomEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomEase; });
/* harmony import */ var gsap_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap/TweenLite.js */ "./node_modules/gsap/TweenLite.js");
/*!
 * VERSION: 0.2.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
/* eslint-disable */



gsap_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["_gsScope"]._gsDefine("easing.CustomEase", ["easing.Ease"], function() {

		var _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			_scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
			_needsParsingExp = /[cLlsS]/g,
			_bezierError = "CustomEase only accepts Cubic Bezier data.",
			_bezierToPoints = function (x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
				var x12 = (x1 + x2) / 2,
					y12 = (y1 + y2) / 2,
					x23 = (x2 + x3) / 2,
					y23 = (y2 + y3) / 2,
					x34 = (x3 + x4) / 2,
					y34 = (y3 + y4) / 2,
					x123 = (x12 + x23) / 2,
					y123 = (y12 + y23) / 2,
					x234 = (x23 + x34) / 2,
					y234 = (y23 + y34) / 2,
					x1234 = (x123 + x234) / 2,
					y1234 = (y123 + y234) / 2,
					dx = x4 - x1,
					dy = y4 - y1,
					d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx),
					d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx),
					length;
				if (!points) {
					points = [{x: x1, y: y1}, {x: x4, y: y4}];
					index = 1;
				}
				points.splice(index || points.length - 1, 0, {x: x1234, y: y1234});
				if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
					length = points.length;
					_bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
					_bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 1 + (points.length - length));
				}
				return points;
			},

			_pathDataToBezier = function (d) {
				var a = (d + "").replace(_scientific, function (m) {
							var n = +m;
							return (n < 0.0001 && n > -0.0001) ? 0 : n;
						}).match(_svgPathExp) || [], //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
					path = [],
					relativeX = 0,
					relativeY = 0,
					elements = a.length,
					l = 2,
					i, x, y, command, isRelative, segment, startX, startY, prevCommand, difX, difY;
				for (i = 0; i < elements; i++) {
					prevCommand = command;
					if (isNaN(a[i])) {
						command = a[i].toUpperCase();
						isRelative = (command !== a[i]); //lower case means relative
					} else { //commands like "C" can be strung together without any new command characters between.
						i--;
					}
					x = +a[i + 1];
					y = +a[i + 2];
					if (isRelative) {
						x += relativeX;
						y += relativeY;
					}
					if (!i) {
						startX = x;
						startY = y;
					}
					if (command === "M") {
						if (segment && segment.length < 8) { //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
							path.length -= 1;
							l = 0;
						}
						relativeX = startX = x;
						relativeY = startY = y;
						segment = [x, y];
						l = 2;
						path.push(segment);
						i += 2;
						command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").

					} else if (command === "C") {
						if (!segment) {
							segment = [0, 0];
						}
						segment[l++] = x;
						segment[l++] = y;
						if (!isRelative) {
							relativeX = relativeY = 0;
						}
						segment[l++] = relativeX + a[i + 3] * 1; //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.
						segment[l++] = relativeY + a[i + 4] * 1;
						segment[l++] = relativeX = relativeX + a[i + 5] * 1;
						segment[l++] = relativeY = relativeY + a[i + 6] * 1;
						i += 6;

					} else if (command === "S") {
						if (prevCommand === "C" || prevCommand === "S") {
							difX = relativeX - segment[l - 4];
							difY = relativeY - segment[l - 3];
							segment[l++] = relativeX + difX;
							segment[l++] = relativeY + difY;
						} else {
							segment[l++] = relativeX;
							segment[l++] = relativeY;
						}
						segment[l++] = x;
						segment[l++] = y;
						if (!isRelative) {
							relativeX = relativeY = 0;
						}
						segment[l++] = relativeX = relativeX + a[i + 3] * 1;
						segment[l++] = relativeY = relativeY + a[i + 4] * 1;
						i += 4;

					} else if (command === "L" || command === "Z") {
						if (command === "Z") {
							x = startX;
							y = startY;
							segment.closed = true;
						}
						if (command === "L" || Math.abs(relativeX - x) > 0.5 || Math.abs(relativeY - y) > 0.5) {
							segment[l++] = relativeX + (x - relativeX) / 3;
							segment[l++] = relativeY + (y - relativeY) / 3;
							segment[l++] = relativeX + (x - relativeX) * 2 / 3;
							segment[l++] = relativeY + (y - relativeY) * 2 / 3;
							segment[l++] = x;
							segment[l++] = y;
							if (command === "L") {
								i += 2;
							}
						}
						relativeX = x;
						relativeY = y;
					} else {
						throw _bezierError;
					}

				}
				return path[0];
			},

			_findMinimum = function (values) {
				var l = values.length,
					min = 999999999999,
					i;
				for (i = 1; i < l; i += 6) {
					if (+values[i] < min) {
						min = +values[i];
					}
				}
				return min;
			},

			_normalize = function (values, height, originY) { //takes all the points and translates/scales them so that the x starts at 0 and ends at 1.
				if (!originY && originY !== 0) {
					originY = Math.max(+values[values.length-1], +values[1]);
				}
				var tx = +values[0] * -1,
					ty = -originY,
					l = values.length,
					sx = 1 / (+values[l - 2] + tx),
					sy = -height || ((Math.abs(+values[l - 1] - +values[1]) < 0.01 * (+values[l - 2] - +values[0])) ? _findMinimum(values) + ty : +values[l - 1] + ty),
					i;
				if (sy) { //typically y ends at 1 (so that the end values are reached)
					sy = 1 / sy;
				} else { //in case the ease returns to its beginning value, scale everything proportionally
					sy = -sx;
				}
				for (i = 0; i < l; i += 2) {
					values[i] = (+values[i] + tx) * sx;
					values[i + 1] = (+values[i + 1] + ty) * sy;
				}
			},

			_getRatio = function (p) {
				var point = this.lookup[(p * this.l) | 0] || this.lookup[this.l - 1];
				if (point.nx < p) {
					point = point.n;
				}
				return point.y + ((p - point.x) / point.cx) * point.cy;
			},


			CustomEase = function (id, data, config) {
				this._calcEnd = true;
				this.id = id;
				if (id) {
					gsap_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"].map[id] = this;
				}
				this.getRatio = _getRatio; //speed optimization, faster lookups.
				this.setData(data, config);
			},
			p = CustomEase.prototype = new gsap_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"]();

		p.constructor = CustomEase;

		p.setData = function(data, config) {
			data = data || "0,0,1,1";
			var values = data.match(_numbersExp),
				closest = 1,
				points = [],
				l, a1, a2, i, inc, j, point, prevPoint, p, precision;
			config = config || {};
			precision = config.precision || 1;
			this.data = data;
			this.lookup = [];
			this.points = points;
			this.fast = (precision <= 1);
			if (_needsParsingExp.test(data) || (data.indexOf("M") !== -1 && data.indexOf("C") === -1)) {
				values = _pathDataToBezier(data);
			}
			l = values.length;
			if (l === 4) {
				values.unshift(0, 0);
				values.push(1, 1);
				l = 8;
			} else if ((l - 2) % 6) {
				throw _bezierError;
			}
			if (+values[0] !== 0 || +values[l - 2] !== 1) {
				_normalize(values, config.height, config.originY);
			}

			this.rawBezier = values;

			for (i = 2; i < l; i += 6) {
				a1 = {x: +values[i - 2], y: +values[i - 1]};
				a2 = {x: +values[i + 4], y: +values[i + 5]};
				points.push(a1, a2);
				_bezierToPoints(a1.x, a1.y, +values[i], +values[i + 1], +values[i + 2], +values[i + 3], a2.x, a2.y, 1 / (precision * 200000), points, points.length - 1);
			}
			l = points.length;
			for (i = 0; i < l; i++) {
				point = points[i];
				prevPoint = points[i - 1] || point;
				if (point.x > prevPoint.x || (prevPoint.y !== point.y && prevPoint.x === point.x) || point === prevPoint) { //if a point goes BACKWARD in time or is a duplicate, just drop it.
					prevPoint.cx = point.x - prevPoint.x; //change in x between this point and the next point (performance optimization)
					prevPoint.cy = point.y - prevPoint.y;
					prevPoint.n = point;
					prevPoint.nx = point.x; //next point's x value (performance optimization, making lookups faster in getRatio()). Remember, the lookup will always land on a spot where it's either this point or the very next one (never beyond that)
					if (this.fast && i > 1 && Math.abs(prevPoint.cy / prevPoint.cx - points[i - 2].cy / points[i - 2].cx) > 2) { //if there's a sudden change in direction, prioritize accuracy over speed. Like a bounce ease - you don't want to risk the sampling chunks landing on each side of the bounce anchor and having it clipped off.
						this.fast = false;
					}
					if (prevPoint.cx < closest) {
						if (!prevPoint.cx) {
							prevPoint.cx = 0.001; //avoids math problems in getRatio() (dividing by zero)
							if (i === l - 1) { //in case the final segment goes vertical RIGHT at the end, make sure we end at the end.
								prevPoint.x -= 0.001;
								closest = Math.min(closest, 0.001);
								this.fast = false;
							}
						} else {
							closest = prevPoint.cx;
						}
					}
				} else {
					points.splice(i--, 1);
					l--;
				}
			}
			l = (1 / closest + 1) | 0;
			this.l = l; //record for speed optimization
			inc = 1 / l;
			j = 0;
			point = points[0];
			if (this.fast) {
				for (i = 0; i < l; i++) { //for fastest lookups, we just sample along the path at equal x (time) distance. Uses more memory and is slightly less accurate for anchors that don't land on the sampling points, but for the vast majority of eases it's excellent (and fast).
					p = i * inc;
					if (point.nx < p) {
						point = points[++j];
					}
					a1 = point.y + ((p - point.x) / point.cx) * point.cy;
					this.lookup[i] = {x: p, cx: inc, y: a1, cy: 0, nx: 9};
					if (i) {
						this.lookup[i - 1].cy = a1 - this.lookup[i - 1].y;
					}
				}
				this.lookup[l - 1].cy = points[points.length - 1].y - a1;
			} else { //this option is more accurate, ensuring that EVERY anchor is hit perfectly. Clipping across a bounce, for example, would never happen.
				for (i = 0; i < l; i++) { //build a lookup table based on the smallest distance so that we can instantly find the appropriate point (well, it'll either be that point or the very next one). We'll look up based on the linear progress. So it's it's 0.5 and the lookup table has 100 elements, it'd be like lookup[Math.floor(0.5 * 100)]
					if (point.nx < i * inc) {
						point = points[++j];
					}
					this.lookup[i] = point;
				}

				if (j < points.length - 1) {
					this.lookup[i-1] = points[points.length-2];
				}
			}
			this._calcEnd = (points[points.length-1].y !== 1 || points[0].y !== 0); //ensures that we don't run into floating point errors. As long as we're starting at 0 and ending at 1, tell GSAP to skip the final calculation and use 0/1 as the factor.
			return this;
		};

		p.getRatio = _getRatio;

		p.getSVGData = function(config) {
			return CustomEase.getSVGData(this, config);
		};

		CustomEase.create = function (id, data, config) {
			return new CustomEase(id, data, config);
		};

		CustomEase.version = "0.2.2";

		CustomEase.bezierToPoints = _bezierToPoints;
		CustomEase.get = function (id) {
			return gsap_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"].map[id];
		};
		CustomEase.getSVGData = function(ease, config) {
			config = config || {};
			var rnd = 1000,
				width = config.width || 100,
				height = config.height || 100,
				x = config.x || 0,
				y = (config.y || 0) + height,
				e = config.path,
				a, slope, i, inc, tx, ty, precision, threshold, prevX, prevY;
			if (config.invert) {
				height = -height;
				y = 0;
			}
			ease = ease.getRatio ? ease : gsap_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["Ease"].map[ease] || console.log("No ease found: ", ease);
			if (!ease.rawBezier) {
				a = ["M" + x + "," + y];
				precision = Math.max(5, (config.precision || 1) * 200);
				inc = 1 / precision;
				precision += 2;
				threshold = 5 / precision;
				prevX = (((x + inc * width) * rnd) | 0) / rnd;
				prevY = (((y + ease.getRatio(inc) * -height) * rnd) | 0) / rnd;
				slope = (prevY - y) / (prevX - x);
				for (i = 2; i < precision; i++) {
					tx = (((x + i * inc * width) * rnd) | 0) / rnd;
					ty = (((y + ease.getRatio(i * inc) * -height) * rnd) | 0) / rnd;
					if (Math.abs((ty - prevY) / (tx - prevX) - slope) > threshold || i === precision - 1) { //only add points when the slope changes beyond the threshold
						a.push(prevX + "," + prevY);
						slope = (ty - prevY) / (tx - prevX);
					}
					prevX = tx;
					prevY = ty;
				}
			} else {
				a = [];
				precision = ease.rawBezier.length;
				for (i = 0; i < precision; i += 2) {
					a.push((((x + ease.rawBezier[i] * width) * rnd) | 0) / rnd + "," + (((y + ease.rawBezier[i + 1] * -height) * rnd) | 0) / rnd);
				}
				a[0] = "M" + a[0];
				a[1] = "C" + a[1];
			}
			if (e) {
				(typeof(e) === "string" ? document.querySelector(e) : e).setAttribute("d", a.join(" "));
			}
			return a.join(" ");
		};

		return CustomEase;

	}, true);

var CustomEase = gsap_TweenLite_js__WEBPACK_IMPORTED_MODULE_0__["globals"].CustomEase;


/***/ })

}]);
//# sourceMappingURL=RefSlider.js.map?3f4759ca210bc45d854be0166d2d4c3c