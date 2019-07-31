import '../scss/main.scss';

// @babel/polyfill is necessary for async imports
import '@babel/polyfill';
import { superLoad, superWindow, query } from '@stereorepo/sac';
import Macy from 'macy';
import lottie from 'lottie-web';

import io from './components/io';

import header from './components/header';
import Slider from './components/Slider';
import united from './components/united';
import form from './components/form';
import newsletter from './components/newsletter';
import ReferencesSlider from './components/ReferencesSlider';

// ⚠️ DO NOT REMOVE ⚠️
// Dynamic imports function
const dynamicLoading = ({ name }) => async () => {
    // Do not use multiple variables for the import path, otherwise the chunck name will be composed of all the variables (and not the last one)
    const { default: defaultFunction } = await import(
        /* webpackChunkName: "[request]" */
        `./components/${name}`
    );
    defaultFunction();
};
// ⚠️ DO NOT REMOVE ⚠️

const preloadCallback = () => {
    superWindow.setBreakpoints({
        horizontal: {
            xs: 0,
            s: 400,
            m: 580,
            l: 780,
            xl: 960,
            xxl: 1100
        },
        vertical: {}
    });

    // Stéréosuper js library init
    io.init();

    const [wrapperSlider] = query({
        selector: '#slider'
    });

    let slider = null;
    const cats = document.getElementById('cats');

    // Components with global use
    header();
    form();
    newsletter();

    const referenceSlider = new ReferencesSlider();
    referenceSlider.initialize();

    if (wrapperSlider) {
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

    if (document.getElementById('blog')) {
        Macy({
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

    if (cats) {
        cats.addEventListener('click', () => {
            cats.classList.contains('off')
                ? cats.classList.remove('off')
                : cats.classList.add('off');
        });
    }
};

const loadCallback = () => {};

const animationsCallback = () => {};

superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass:
        '.element-without-transition-on-resize, .menu-main > li > a, .nav .btn'
});
