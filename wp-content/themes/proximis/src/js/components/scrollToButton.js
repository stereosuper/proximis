import { query, forEach } from '@stereorepo/sac';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import { easing } from '../global';

// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = ScrollToPlugin;

const scrollToButtonHandler = () => {
    const scrollToButtons = query({ selector: '.js-button-scroll-to' });
    if (!scrollToButtons.length) return;

    forEach(scrollToButtons, button => {
        button.addEventListener(
            'click',
            event => {
                event.preventDefault();
                const elementSelector = button.href.split('/').pop();
                const [element] = query({ selector: elementSelector });

                if (!element) return;

                const offset =
                    window.$stereorepo.superScroll.scrollTop +
                    element.getBoundingClientRect().top;

                TweenLite.to(window, 0.5, {
                    scrollTo: {
                        y: offset
                    },
                    ease: easing.easeInOut
                });
            },
            false
        );
    });
};

export default scrollToButtonHandler;
