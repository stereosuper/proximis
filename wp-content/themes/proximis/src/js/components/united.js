import { TweenMax, TimelineMax, Linear } from 'gsap';
import { superScroll, superPolyfill } from '@stereorepo/sac';

const unitedAnimHandler = () => {
    const united = document.getElementById('united');

    if (!united) return;

    superPolyfill.initializeIntersectionObserver();

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
        const tl = new TimelineMax({ paused: true });
        tl.staggerTo(
            words,
            0.93,
            {
                x: 0,
                y: 0,
                ease: Linear.easeNone
            },
            0.07
        );
        let progress = 0;

        animLaunched = true;
        windowHeight += oScrollTop;

        superScroll.addScrollFunction(() => {
            progress = (superScroll.scrollTop - oScrollTop) / windowHeight;
            if (progress >= 0) tl.progress(progress);
        });
    };

    const intersectionCallback = entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio < 0.2 || animLaunched) return;
            oScrollTop = superScroll.scrollTop;
            init();
        });
    };

    for (index; index <= samplesNumber; index++) {
        thresholdSamples[index] = index / samplesNumber;
    }

    observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: '0px',
        threshold: thresholdSamples
    });

    observer.observe(united);
};

export default unitedAnimHandler;
