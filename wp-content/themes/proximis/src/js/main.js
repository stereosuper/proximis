import '../scss/main.scss';

// @babel/polyfill is necessary for async imports
import '@babel/polyfill';
import { superLoad, superWindow, query, bodyRouter } from '@stereorepo/sac';
import Macy from 'macy';
import lottie from 'lottie-web';

import io from './components/io';

import header from './components/header';
import Slider from './components/Slider';
import united from './components/united';
import form from './components/form';
import newsletter from './components/newsletter';
import searchHandler from './components/searchHandler';
import modal from './components/modal';
import stickReference from './components/stickReference';

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
    name: 'ReferencesSlider',
    isClass: true
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
    const cats = document.getElementById('cats');

    const modals = query({
        selector: '.js-modal'
    });

    // Components with global use
    header();
    form();
    newsletter();
    modal(modals);

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

        document.addEventListener('click', e => {
            let targetElement = e.target;

            do {
                if (targetElement == cats) {
                    // This is a click inside. Do nothing, just return.
                    return;
                }
                // Go up the DOM
                targetElement = targetElement.parentNode;
            } while (targetElement);

            // This is a click outside.
            if (!cats.classList.contains('off')) {
                cats.classList.add('off');
            }
        });
    }
};

const loadCallback = () => {
    searchHandler();
    stickReference();

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
};

const animationsCallback = () => {};

superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass:
        '.element-without-transition-on-resize, .menu-main > li > a, .nav .btn'
});
