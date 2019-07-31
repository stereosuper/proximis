(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["search"],{

/***/ "./wp-content/themes/proximis/src/js/components/search.js":
/*!****************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/search.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
!(function webpackMissingModule() { var e = new Error("Cannot find module '../utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());


const searchHandler = () => {
    const [form] = !(function webpackMissingModule() { var e = new Error("Cannot find module '../utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        selector: '#searchform'
    });
    const [blogNav] = !(function webpackMissingModule() { var e = new Error("Cannot find module '../utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        selector: '#blog-nav'
    });

    if (!form || !blogNav) return;

    const [input] = !(function webpackMissingModule() { var e = new Error("Cannot find module '../utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
        selector: 'input',
        ctx: form
    });

    form.addEventListener('submit', e => {
        if (!form.classList.contains('on')) {
            e.preventDefault();
            const [inputToFocus] = !(function webpackMissingModule() { var e = new Error("Cannot find module '../utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
                selector: 'input',
                ctx: form
            });

            form.classList.add('on');
            inputToFocus.focus();
            blogNav.classList.add('off');
        }
    });

    input.addEventListener('blur', e => {
        if (e.relatedTarget !== form.getElementById('#search')) {
            form.classList.remove('on');
            blogNav.classList.remove('off');
        }
    });
};

/* harmony default export */ __webpack_exports__["default"] = (searchHandler);

/***/ })

}]);
//# sourceMappingURL=search.js.map?69afd6a291c031d1700879fd0302d064