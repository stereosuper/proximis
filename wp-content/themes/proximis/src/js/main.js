import '../scss/main.scss';

//import { TweenLite, TimelineLite } from 'gsap';

//import win from './Window.js';
//import io from './io.js';
//import scroll from './Scroll.js';
//import fallback from './fallback.js';
//import $ from 'jquery-slim';

import lottie from 'lottie-web';


const loadHandler = () => {
    //scroll.init();
    // const noTransitionElts = [].slice.call(
    //     document.getElementsByClassName('element-without-transition-on-resize')
    // );
    // win.setNoTransitionElts(noTransitionElts);
    //io.init();
    //fallback.init();

    
    const body = document.getElementsByTagName('body')[0];

    const burger = document.getElementById('burger');
    burger.addEventListener('click', () => {
        body.classList.add('menu-open');
    });

    const close = document.getElementById('close-menu');
    close.addEventListener('click', () => {
        body.classList.remove('menu-open');
    });

    [].slice.call(document.getElementsByClassName('js-benefit')).forEach(elt => {
        lottie.loadAnimation({
            container: elt,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: elt.getAttribute('data-path')
        });
    });
};


if( document.readyState === 'complete' ){
    loadHandler();
} else {
    window.addEventListener('load', loadHandler, false);
}
