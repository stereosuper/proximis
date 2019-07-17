import '../scss/main.scss';

//import { TweenLite, TimelineLite } from 'gsap';
import '@babel/polyfill';
import Macy from 'macy';

import win from './Window.js';
import io from './io.js';
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
import form from './form.js';


const loadHandler = () => {
    const [wrapperSlider] = query('#slider');
    // const noTransitionElts = [].slice.call(
    //     document.getElementsByClassName('element-without-transition-on-resize')
    // );

    // win.setNoTransitionElts(noTransitionElts);
    io.init();
    fallback.init();
    scroll.init();
    win.init();

    header();
    form();

    if (wrapperSlider) {
        const slider = new Slider(wrapperSlider);
        slider.play();
    }

    united();

    [].slice.call(document.getElementsByClassName('js-lottie')).forEach(elt => {
        lottie.loadAnimation({
            container: elt,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: elt.getAttribute('data-path')
        });
    });

    var macy = Macy({
        container: '#blog',
        trueOrder: true,
        waitForImages: true,
        margin: 55,
        columns: 3,
        breakAt: {
            780: 2,
            580: 1
        }
    });


};


if (document.readyState === 'complete') {
    loadHandler();
} else {
    window.addEventListener('load', loadHandler, false);
}