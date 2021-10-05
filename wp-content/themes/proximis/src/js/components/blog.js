import Macy from 'macy';
import { query } from '@stereorepo/sac';

const blogHandler = () => {
    const layout = () => {
        const [blog] = query({ selector: '#blog' });
        if (!blog) return;

        Macy({
            container: '#blog',
            trueOrder: true,
            waitForImages: true,
            margin: 80,
            columns: 3,
            breakAt: {
                960: 2,
                580: 1
            }
        });
    };

    const cats = () => {
        const [cats] = query({ selector: '#cats' });

        if (!cats) return;

        document.addEventListener('click', e => {
            e.stopImmediatePropagation();
            
            if (e.target.id === 'category-select-button') {
                // This is a click inside.
                cats.classList.contains('off') ? cats.classList.remove('off') : cats.classList.add('off');
            } else {
                cats.classList.add('off');
            }
        });
    };

    layout();
    cats();
};

export default blogHandler;
