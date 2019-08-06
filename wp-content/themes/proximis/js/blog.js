(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["blog"],{

/***/ "./wp-content/themes/proximis/src/js/components/blog.js":
/*!**************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/blog.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var macy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! macy */ "./node_modules/macy/dist/macy.js");
/* harmony import */ var macy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(macy__WEBPACK_IMPORTED_MODULE_0__);


const jobHandler = () => {
    const cats = document.getElementById('cats');

    if (document.getElementById('blog')) {
        macy__WEBPACK_IMPORTED_MODULE_0___default()({
            container: '#blog',
            trueOrder: true,
            waitForImages: true,
            margin: 80,
            columns: 3,
            breakAt: {
                960: 2,
                580: 1
            }
        });
    }

    if (cats) {
        cats.addEventListener('click', () => {
            cats.classList.contains('off')
                ? cats.classList.remove('off')
                : cats.classList.add('off');
        });

        document.addEventListener('click', e => {
            let targetElement = e.target;

            do {
                if (targetElement == cats) {
                    // This is a click inside. Do nothing, just return.
                    return;
                }
                // Go up the DOM
                targetElement = targetElement.parentNode;
            } while (targetElement);

            // This is a click outside.
            if (!cats.classList.contains('off')) {
                cats.classList.add('off');
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = (jobHandler);


/***/ })

}]);
//# sourceMappingURL=blog.js.map?a2298a37699aefb27d372fb54e813d19