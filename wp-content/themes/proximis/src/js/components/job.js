import { query } from '@stereorepo/sac';

const jobHandler = () => {
    const mail = query({ selector: '#job-mail' });

    if (!mail) return;

    let collant = null;

    const [highlighted] = query({ selector: '.highlighted' });
    const [main] = query({ selector: '.main' });

    const stickSidebar = () => {
        collant = window.$stereorepo.superScroll.watch({
            element: highlighted,
            options: {
                collant: true,
                target: main,
                position: 'top'
            }
        });
        window.$stereorepo.superScroll.update();
    };

    stickSidebar();

    window.$stereorepo.superWindow.addResizeEndFunction(() => {
        if (collant) collant.forget();
        collant = null;
        stickSidebar();
    });
};

export default jobHandler;
