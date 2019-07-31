import { CustomEase } from '../plugins/CustomEase';

export const easing = {
    easeIn: CustomEase.create('custom', 'M0,0 C0.42,0.08, 0.45,0.09 1,1'),
    easeOut: CustomEase.create('custom', 'M0,0 C0,0.15, 0.1,0.85 1,1'),
    easeInOut: CustomEase.create('custom', 'M0,0 C0.38,0, 0.45,0.93 1,1')
};

export default { easing };
