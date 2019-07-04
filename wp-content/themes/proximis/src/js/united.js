import { TweenLite, TimelineLite } from 'gsap';
import scroll from './Scroll.js';

const unitedAnimHandler = () => {
    
    const united = document.getElementById('united');
    const words = united.querySelectorAll('.js-word');

    if( !united ) return;

    // Constants used to create the intersection observer threshold array
    const samplesNumber = 10;
    const thresholdSamples = [];
    let index = 0;
    let observer = null;

    let animLaunched = false;


    const init = () => {
        animLaunched = true;

        TweenLite.to(words, 1, {x: 0, y: 0});

        scroll.addScrollFunction(() => {
            console.log(scroll.scrollTop);
        });
    };

    const intersectionCallback = entries => {
        entries.forEach(entry => {
            if( entry.intersectionRatio < 0.5 || animLaunched ) return;
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
