import '../scss/main.scss';

// @babel/polyfill is necessary for async imports
import '@babel/polyfill';
import {
    superLoad,
    superWindow,
    query,
    forEach,
    bodyRouter
} from '@stereorepo/sac';
import lottie from 'lottie-web';

import { breakpoints } from './global';

import io from './components/io';
import header from './components/header';
import form from './components/form';
import newsletter from './components/newsletter';
import searchHandler from './components/searchHandler';
import modal from './components/modal';
import scrollToButton from './components/scrollToButton';
import video from './components/video';
//import missionNav from './components/missionNav';

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
const sliderImport = dynamicLoading({
    name: 'Slider',
    isClass: true
});
const unitedHomeAnimation = dynamicLoading({
    name: 'united'
});
const schemaAnimation = dynamicLoading({
    name: 'schema'
});
const job = dynamicLoading({
    name: 'job'
});
const blog = dynamicLoading({
    name: 'blog'
});
const error404 = dynamicLoading({
    name: 'error404'
});
const missionNav = dynamicLoading({
    name: 'missionNav'
});

const preloadCallback = () => {
    superWindow.setBreakpoints(breakpoints);

    // Stéréosuper js library init
    io.init();

    // Components with global use
    header();
    scrollToButton();
    modal();
    form();
    newsletter();
    blog();
    video();

    bodyRouter({
        identifier: '.home',
        callback: () => {
            const sliderPromise = sliderImport();
            sliderPromise.then(Slider => {
                const slider = new Slider({ selector: '#slider' });
                slider.play();
            });
        }
    });

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

    bodyRouter({
        identifier: '.single-job',
        callback: job
    });

    bodyRouter({
        identifier: '.blog, .category, .search-results, .author',
        callback: blog
    });

    bodyRouter({
        identifier: '.error404',
        callback: error404
    });

    bodyRouter({
        identifier: '.page-template-mission',
        callback: missionNav
    });
};

const loadCallback = () => {
    searchHandler();

    const trackMailto = (e, url) => {
        e.preventDefault();
        gtag('event', 'recrutement', {
            event_category: 'contact',
            event_label: 'clic-mailto',
            event_callback: () => {
                window.location.href = url;
            }
        });
    };

    const link = query({ selector: '#mailto-recruitment a[href^=mailto]' });
    if (link && link[0]) {
        link[0].addEventListener('click', e => {
            trackMailto(e, link[0].href);
        });
    }

    const tels = query({ selector: '.display-tel' });
    if (tels) {
        let btn, num;
        forEach(tels, tel => {
            btn = tel.querySelector('.simple-link');
            num = tel.querySelector('.tel');

            btn.addEventListener('click', e => {
                btn.classList.add('hidden');
                num.classList.remove('hidden');
                gtag('event', 'telephone', {
                    event_category: 'contact',
                    event_label: 'clic-telephone'
                });
            });
        });
    }
};

const animationsCallback = () => {
    const lottieElements = query({ selector: '.js-lottie' });

    forEach(lottieElements, element => {
        lottie.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: element.getAttribute('data-path')
        });
    });

    bodyRouter({
        identifier: '.home',
        callback: unitedHomeAnimation
    });

    bodyRouter({
        identifier: '.page-template-solution',
        callback: schemaAnimation
    });

    bodyRouter({
        identifier: '.page-template-mission',
        callback: schemaAnimation
    });
};

superLoad.initializeLoadingShit({
    preloadCallback,
    loadCallback,
    animationsCallback,
    noTransElementsClass:
        '.element-without-transition-on-resize, .menu-main > li > a, .nav .btn'
});
