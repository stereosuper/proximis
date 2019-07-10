import '../scss/main.scss';

//import { TweenLite, TimelineLite } from 'gsap';
import '@babel/polyfill';

import win from './Window.js';
//import io from './io.js';
import scroll from './Scroll.js';
import fallback from './fallback.js';
//import $ from 'jquery-slim';
import {
    query
} from './utils.js';
import lottie from 'lottie-web';

import header from './header.js';
import Slider from './Slider.js';
import united from './united.js';


const loadHandler = () => {
    const [wrapperSlider] = query('#slider');
    const slider = new Slider(wrapperSlider);
    // const noTransitionElts = [].slice.call(
    //     document.getElementsByClassName('element-without-transition-on-resize')
    // );

    // win.setNoTransitionElts(noTransitionElts);
    //io.init();
    //fallback.init();
    scroll.init();
    win.init();
    const [wrapperSlider] = query('#slider');
    if (wrapperSlider) {
        const slider = new Slider(wrapperSlider);
        slider.play();
    }

    const body = document.getElementsByTagName('body')[0];

    header();
    slider.play();
    united();

    [].slice.call(document.getElementsByClassName('js-benefit')).forEach(elt => {
        lottie.loadAnimation({
            container: elt,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: elt.getAttribute('data-path')
        });
    });

    united();
};


if (document.readyState === 'complete') {
    loadHandler();
} else {
    window.addEventListener('load', loadHandler, false);
}