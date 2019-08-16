import { forEach, superScroll, superWindow } from '@stereorepo/sac';
import { TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { Collant } from '@stereorepo/collant';

import { easing } from '../global';

// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = ScrollToPlugin;

const navHandler = () => {
    const nav = document.getElementById('mission-nav');

    if( !nav ) return;

    const btns = nav.querySelectorAll('a');

    let href, elt, offset, active, elts = [], count = 0, collant;

    const setActive = (btn) => {
        active = nav.querySelector('.active');
        if( active ) nav.querySelector('.active').classList.remove('active');

        btn.classList.add('active');
    };

    const scrollHandler = () => {
        forEach(btns, btn => {
            if( superScroll.scrollTop <= elts[[].slice.call(btns).indexOf(btn)].offset ) return;
            setActive(btn);
        });
    };

    forEach(btns, btn => {
        href = btn.getAttribute('href');
        href = href.replace('#', '');
        elt = document.getElementById(href);

        if (elt){
            elts[count] = {
                'id' : href,
                'offset' : superScroll.scrollTop + elt.getBoundingClientRect().top
            };

            btn.addEventListener(
                'click',
                e => {
                    e.preventDefault();

                    offset = elts[[].slice.call(btns).indexOf(btn)].offset;
                    TweenLite.to(window, 0.5, {scrollTo: {y: offset + 20}, ease: easing.easeInOut});

                    setActive(btn);
                },
                false
            );

            count ++;
        }
    });

    superScroll.addScrollFunction(scrollHandler);

    collant = new Collant({
        selector: '.mission-nav',
        box: '.mission',
        offsetTop: (superWindow.windowHeight/2 - 78) + 'px'
    });

    collant.stickIt();
};

export default navHandler;
