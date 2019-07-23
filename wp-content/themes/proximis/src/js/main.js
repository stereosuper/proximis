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
import newsletter from './newsletter.js';


const loadHandler = () => {
    const [wrapperSlider] = query('#slider');
    let macy, slider;
    const cats = document.getElementById('cats');
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
    newsletter();

    if( wrapperSlider ){
        slider = new Slider(wrapperSlider);
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

    if( document.getElementById('blog') ){
        macy = Macy({
            container: '#blog',
            trueOrder: true,
            waitForImages: true,
            margin: 80,
            columns: 3,
            breakAt: {
                960: 2,
                580: 1
            }
        });
    }
    
    if( cats ){
        cats.addEventListener('click', () => {
            cats.classList.contains('off') ? cats.classList.remove('off') : cats.classList.add('off');
        });
    }

};


if (document.readyState === 'complete') {
    loadHandler();
} else {
    window.addEventListener('load', loadHandler, false);
}