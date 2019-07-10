import snif from './Snif';

function Fallback() {
    this.html = document.documentElement;
}

Fallback.prototype.init = function init() {
    if (snif.isIOS()) this.html.classList.add('is-ios');

    if (snif.isSafari()) this.html.classList.add('is-safari');

    if (snif.isFF()) this.html.classList.add('is-ff');

    if (snif.isChromeAndroid()) this.html.classList.add('is-ca');

    if (snif.isMS()) this.html.classList.add('is-ms');

    if (snif.isIe11()) this.html.classList.add('is-ie');

    // IE11 closest polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function closestPolyfill(s) {
            let el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);

            return null;
        };
    }
};

export default new Fallback();