import collant from 'collant';
import { query } from '@stereorepo/sac';

const stickReference = () => {
    const [btnInfos] = query({
        selector: '#btn-infos'
    });

    // collant(btnInfos, 120, {
    //     unit: 'px',
    //     minimuWidth: 780
    // });
};

export default stickReference;
