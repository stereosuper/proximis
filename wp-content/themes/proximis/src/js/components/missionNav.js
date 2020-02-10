import { forEach, query } from '@stereorepo/sac';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import { easing } from '../global';

// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = ScrollToPlugin;

const navHandler = () => {
    const nav = document.getElementById('mission-nav');

    if (!nav) return;

    const btns = nav.querySelectorAll('a');

    let href,
        elt,
        offset,
        active,
        elts = [],
        count = 0;

    const setActive = btn => {
        active = nav.querySelector('.active');
        if (active) nav.querySelector('.active').classList.remove('active');

        btn.classList.add('active');
    };

    const scrollHandler = () => {
        if (window.$stereorepo.superWindow.windowWidth < 960) return;

        forEach(btns, btn => {
            if (
                window.$stereorepo.superScroll.scrollTop <=
                elts[[].slice.call(btns).indexOf(btn)].offset
            )
                return;
            setActive(btn);
        });
    };

    forEach(btns, btn => {
        href = btn.getAttribute('href');
        href = href.replace('#', '');
        elt = document.getElementById(href);

        if (elt) {
            elts[count] = {
                id: href,
                offset:
                    window.$stereorepo.superScroll.scrollTop +
                    elt.getBoundingClientRect().top
            };

            btn.addEventListener(
                'click',
                e => {
                    e.preventDefault();

                    offset = elts[[].slice.call(btns).indexOf(btn)].offset;
                    TweenLite.to(window, 0.5, {
                        scrollTo: { y: offset + 20 },
                        ease: easing.easeInOut
                    });

                    setActive(btn);
                },
                false
            );

            count++;
        }
    });

    window.$stereorepo.superScroll.on('scroll', scrollHandler);

    const [missionNavWrapper] = query({ selector: '.mission' });

    window.$stereorepo.superScroll.watch({
        element: nav,
        options: {
            collant: true,
            target: missionNavWrapper,
            position: 'top',
            collantOffset:
                window.$stereorepo.superWindow.windowHeight / 2 - 78 + 'px'
            // 78 = moitié de la hauteur de la nav
        }
    });
};

export default navHandler;
