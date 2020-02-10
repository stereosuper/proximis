import { breakpoints } from '../global';
import { query } from '@stereorepo/sac/src/core';

const error404Handler = () => {
    const state = { sticky: false };
    const [imageContainer] = query({
        selector: '.js-error-404-image-container'
    });
    const [box] = query({ selector: '.main' });

    let imageCollant = null;

    if (!imageContainer || !box) return;

    const handleWindowSize = () => {
        if (
            window.$stereorepo.superWindow.windowWidth >
                breakpoints.horizontal.l &&
            !state.sticky
        ) {
            imageCollant = window.$stereorepo.superScroll.watch({
                element: imageContainer,
                options: {
                    collant: true,
                    target: box,
                    position: 'bottom'
                }
            });
            state.sticky = true;
        } else if (
            window.$stereorepo.superWindow.windowWidth <=
                breakpoints.horizontal.l &&
            state.sticky
        ) {
            if (imageCollant) imageCollant.forget();
            state.sticky = false;
        }
    };

    handleWindowSize();

    window.$stereorepo.superWindow.addResizeEndFunction(() => {
        handleWindowSize();
        window.$stereorepo.superScroll.update();
    });
};

export default error404Handler;
