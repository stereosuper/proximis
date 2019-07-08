import { TweenLite, TimelineLite, Linear } from 'gsap';
import scroll from './Scroll.js';

const unitedAnimHandler = () => {
    
    const united = document.getElementById('united');
    const words = united.querySelectorAll('.js-word');

    if( !united ) return;

    const unitedHeight = united.offsetHeight;

    // Constants used to create the intersection observer threshold array
    const samplesNumber = 100;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;

    let animLaunched = false, oScrollTop = 0;


    const init = () => {
        const tween = TweenLite.to(words, 1, {x: 0, y: 0, paused: true, ease: Linear.easeNone});
        let progress = 0;

        animLaunched = true;

        scroll.addScrollFunction(() => {
            progress = (scroll.scrollTop-oScrollTop)/(unitedHeight+oScrollTop);
            tween.progress(progress);
        });
    };

    const intersectionCallback = entries => {
        entries.forEach(entry => {
            if( entry.intersectionRatio < 0.2 || animLaunched ) return;
            oScrollTop = window.pageYOffset || window.scrollY;
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
