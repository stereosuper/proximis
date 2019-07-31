(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["searchHandler"],{

/***/ "./wp-content/themes/proximis/src/js/components/searchHandler.js":
/*!***********************************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/components/searchHandler.js ***!
  \***********************************************************************/
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
//# sourceMappingURL=searchHandler.js.map?5a9f9c3e38fdbdb268d6274c42e98cb2