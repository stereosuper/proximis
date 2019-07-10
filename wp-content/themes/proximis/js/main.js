/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/proximis/js";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./wp-content/themes/proximis/src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./wp-content/themes/proximis/src/js/main.js":
/*!***************************************************!*\
  !*** ./wp-content/themes/proximis/src/js/main.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/adrienlementheour/Travail/proximis/proximis/wp-content/themes/proximis/src/js/main.js: Identifier 'wrapperSlider' has already been declared (33:11)\n\n\u001b[0m \u001b[90m 31 | \u001b[39m    scroll\u001b[33m.\u001b[39minit()\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 32 | \u001b[39m    win\u001b[33m.\u001b[39minit()\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 33 | \u001b[39m    \u001b[36mconst\u001b[39m [wrapperSlider] \u001b[33m=\u001b[39m query(\u001b[32m'#slider'\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m           \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 34 | \u001b[39m    \u001b[36mif\u001b[39m (wrapperSlider) {\u001b[0m\n\u001b[0m \u001b[90m 35 | \u001b[39m        \u001b[36mconst\u001b[39m slider \u001b[33m=\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mSlider\u001b[39m(wrapperSlider)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 36 | \u001b[39m        slider\u001b[33m.\u001b[39mplay()\u001b[33m;\u001b[39m\u001b[0m\n    at Parser.raise (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:6325:17)\n    at ScopeHandler.checkRedeclarationInScope (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:3759:12)\n    at ScopeHandler.declareName (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:3725:12)\n    at Parser.checkLVal (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8021:22)\n    at Parser.checkLVal (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8047:18)\n    at Parser.parseVarId (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10502:10)\n    at Parser.parseVar (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10477:12)\n    at Parser.parseVarStatement (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10299:10)\n    at Parser.parseStatementContent (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9896:21)\n    at Parser.parseStatement (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9829:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10405:25)\n    at Parser.parseBlockBody (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10392:10)\n    at Parser.parseBlock (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10376:10)\n    at Parser.parseFunctionBody (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9424:24)\n    at Parser.parseArrowExpression (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9365:10)\n    at Parser.parseParenAndDistinguishExpression (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9002:12)\n    at Parser.parseExprAtom (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8762:21)\n    at Parser.parseExprSubscripts (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8412:23)\n    at Parser.parseMaybeUnary (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8392:21)\n    at Parser.parseExprOps (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8267:23)\n    at Parser.parseMaybeConditional (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8240:23)\n    at Parser.parseMaybeAssign (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:8187:21)\n    at Parser.parseVar (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10480:26)\n    at Parser.parseVarStatement (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10299:10)\n    at Parser.parseStatementContent (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9896:21)\n    at Parser.parseStatement (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9829:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10405:25)\n    at Parser.parseBlockBody (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:10392:10)\n    at Parser.parseTopLevel (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:9758:10)\n    at Parser.parse (/Users/adrienlementheour/Travail/proximis/proximis/node_modules/@babel/parser/lib/index.js:11270:17)");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map