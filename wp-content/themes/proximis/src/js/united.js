import {
    TweenLite,
    Linear
} from 'gsap';
import scroll from './Scroll.js';
import 'intersection-observer';

const unitedAnimHandler = () => {

    const united = document.getElementById('united');
    
    if (!united) return;

    const words = united.querySelectorAll('.js-word');

    let windowHeight = window.innerHeight * 0.65;

    // Constants used to create the intersection observer threshold array
    const samplesNumber = 100;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;

    let animLaunched = false,
        oScrollTop = 0;


    const init = () => {
        const tween = TweenLite.to(words, 1, {
            x: 0,
            y: 0,
            paused: true,
            ease: Linear.easeNone
        });
        let progress = 0;

        animLaunched = true;
        windowHeight += oScrollTop;

        scroll.addScrollFunction(() => {
            progress = (scroll.scrollTop - oScrollTop) / windowHeight;
            if (progress >= 0) tween.progress(progress);
        });
    };

    const intersectionCallback = entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio < 0.2 || animLaunched) return;
            oScrollTop = scroll.scrollTop;
            init();
        });
    };


    for (index; index <= samplesNumber; index++) {
        thresholdSamples[index] = index / samplesNumber;
    }

    observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: '0px',
        threshold: thresholdSamples,
    });

    observer.observe(united);

};

export default unitedAnimHandler;