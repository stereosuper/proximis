import '../scss/main.scss';

// @babel/polyfill is necessary for async imports
import '@babel/polyfill';
import { superLoad, superWindow, query, bodyRouter } from '@stereorepo/sac';
import lottie from 'lottie-web';

import io from './components/io';

import header from './components/header';
import Slider from './components/Slider';
import form from './components/form';
import newsletter from './components/newsletter';
import searchHandler from './components/searchHandler';
import modal from './components/modal';
import blog from './components/blog';
import job from './components/job';
import scrollToButton from './components/scrollToButton';
import error404 from './components/error404';

// ⚠️ DO NOT REMOVE ⚠️
// Dynamic imports function
const dynamicLoading = ({ name, isClass = false }) => async () => {
    // Do not use multiple variables for the import path, otherwise the chunck name will be composed of all the variables (and not the last one)
    const { default: defaultFunction } = await import(
        /* webpackChunkName: "[request]" */
        `./components/${name}`
    );
    if (isClass) {
        return defaultFunction;
    } else {
        defaultFunction();
    }
};
// ⚠️ DO NOT REMOVE ⚠️

const referencesSliderImport = dynamicLoading({
    name: 'RefSlider',
    isClass: true
});

const unitedHomeAnimation = dynamicLoading({
    name: 'united'
});

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

    const modals = query({
        selector: '.js-modal'
    });

    // Components with global use
    header();
    modal(modals);
    scrollToButton();
    form();
    newsletter();
    job();
    blog();
    error404();

    if (wrapperSlider) {
        slider = new Slider(wrapperSlider);
        slider.play();
    }

    bodyRouter({
        identifier: '.page-template-customers',
        callback: () => {
            const referenceSliderPromise = referencesSliderImport();
            referenceSliderPromise.then(ReferenceSlider => {
                const referenceSlider = new ReferenceSlider();
                referenceSlider.initialize();
            });
        }
    });

    [].slice.call(document.getElementsByClassName('js-lottie')).forEach(elt => {
        lottie.loadAnimation({
            container: elt,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: elt.getAttribute('data-path')
        });
    });
};

const loadCallback = () => {
    searchHandler();
};

const animationsCallback = () => {
    bodyRouter({
        identifier: '.home',
        callback: unitedHomeAnimation
    });
};

superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass:
        '.element-without-transition-on-resize, .menu-main > li > a, .nav .btn'
});
