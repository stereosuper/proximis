import { query } from '@stereorepo/sac';
import Collant from '@stereorepo/collant/src/components/Collant';

const error404Handler = () => {
    // const [image404] = query({ selector: '.js-404-image' });
    // if (!image404) return;

    const imageCollant = new Collant({
        selector: '.js-error-404-image-wrapper',
        box: '.main',
        offsetBottom: '0px'
    });

    imageCollant.stickIt();
};

export default error404Handler;
