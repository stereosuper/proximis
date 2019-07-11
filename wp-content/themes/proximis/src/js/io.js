import 'intersection-observer';
import {
    TweenMax
} from 'gsap';
import {
    query
} from './utils.js';

const io = function () {

    const threshold = 0.15;

    this.resized = true;

    this.init = () => {
        const objectsToIO = [...document.querySelectorAll('[data-io]')];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > threshold) {
                    this[`${entry.target.dataset.io}In`](entry.target);
                    if (entry.target.hasAttribute('data-io-single')) observer.unobserve(entry.target);
                } else if (entry.intersectionRatio < threshold) {
                    this[`${entry.target.dataset.io}Out`](entry.target);
                }
            });
        }, {
            threshold: threshold,
            rootMargin: '-100px 0px',
        });

        objectsToIO.forEach((obj) => {
            if (!obj.hasAttribute('data-io-observed')) {
                observer.observe(obj);
                obj.setAttribute('data-io-observed', '');
            }
        });
    };

    this.highlightedIn = entry => {
        let line = query('.line', entry);
        if (line) {
            TweenMax.to(line, 0.5, {
                scaleX: 1,
                ease: Power2.easeInOut
            });
        }
    };

    this.highlightedOut = entry => {
        let line = query('.line', entry);
        if (line) {
            TweenMax.to(line, 0.2, {
                scaleX: 0,
                ease: Power2.easeOut
            });
        }
    };
};

export default new io();