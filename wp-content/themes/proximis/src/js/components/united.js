import { TimelineMax, Linear } from 'gsap';
import { superScroll, superWindow } from '@stereorepo/sac';

const unitedAnimHandler = () => {
    const united = document.getElementById('united');

    if (!united) return;

    const words = united.querySelectorAll('.js-word');

    const unitedHeight = united.getBoundingClientRect().height;
    const unitedTop = united.offsetTop;

    let progress = 0;
    const tl = new TimelineMax({ paused: true });

    const scrollHandler = () => {
        const scrollOffset =
            superScroll.scrollTop + superWindow.windowHeight * 0.75;
        const scrollProgress = scrollOffset - unitedTop - unitedHeight * 0.2;

        if (scrollProgress < 0) return;

        progress = scrollProgress / (unitedHeight * 0.6);
        tl.progress(progress);
    };

    tl.staggerTo(words, 0.93, { x: 0, y: 0, ease: Linear.easeNone }, 0.07);

    scrollHandler();
    superScroll.addScrollFunction(scrollHandler);
};

export default unitedAnimHandler;
