import { TimelineMax, Linear } from 'gsap';

const unitedAnimHandler = () => {
    const united = document.getElementById('united');

    if (!united) return;

    const words = united.querySelectorAll('.js-word');

    const unitedHeight = united.getBoundingClientRect().height;
    const unitedTop = united.offsetTop;

    const tl = new TimelineMax({ paused: true });
    let progress = 0;
    let scrollOffset = 0;
    let scrollProgress = 0;

    const scrollHandler = () => {
        scrollOffset =
            window.$stereorepo.superScroll.scrollTop +
            window.$stereorepo.superWindow.windowHeight * 0.75;

        scrollProgress = scrollOffset - unitedTop - unitedHeight * 0.2;

        progress =
            scrollProgress < 0 ? 0 : scrollProgress / (unitedHeight * 0.6);

        tl.progress(progress);
    };

    tl.staggerTo(words, 1, { x: 0, y: 0, ease: Linear.easeNone }, 0.07);

    scrollHandler();
    window.$stereorepo.superScroll.on('scroll', scrollHandler);
};

export default unitedAnimHandler;
