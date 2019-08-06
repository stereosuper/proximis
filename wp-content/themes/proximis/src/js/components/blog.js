import Macy from 'macy';

const blogHandler = () => {
    const layout = () => {
        if (!document.getElementById('blog')) return;

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
        const cats = document.getElementById('cats');

        if (!cats) return;

        document.addEventListener('click', e => {
            let targetElement = e.target;

            do {
                if (targetElement == cats) {
                    // This is a click inside.
                    cats.classList.contains('off')
                        ? cats.classList.remove('off')
                        : cats.classList.add('off');
                    return;
                }
                // Go up the DOM
                targetElement = targetElement.parentNode;
            } while (targetElement);

            // This is a click outside.
            if (!cats.classList.contains('off')) {
                cats.classList.add('off');
            }
        });
    };

    layout();
    cats();
};

export default blogHandler;
