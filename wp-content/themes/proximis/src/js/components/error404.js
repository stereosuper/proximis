import { superWindow } from '@stereorepo/sac';
import { Collant } from '@stereorepo/collant';
import { breakpoints } from '../global';

const error404Handler = () => {
    const state = { sticky: false };

    const imageCollant = new Collant({
        selector: '.js-error-404-image-wrapper',
        box: '.main',
        offsetBottom: '0px'
    });

    const handleWindowSize = () => {
        if (
            superWindow.windowWidth > breakpoints.horizontal.l &&
            !state.sticky
        ) {
            imageCollant.stickIt();
            state.sticky = true;
        } else if (
            superWindow.windowWidth <= breakpoints.horizontal.l &&
            state.sticky
        ) {
            imageCollant.ripIt();
            state.sticky = false;
        }
    };

    handleWindowSize();

    superWindow.addResizeEndFunction(() => {
        handleWindowSize();
    });
};

export default error404Handler;
