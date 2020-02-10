import { query } from '@stereorepo/sac';

const jobHandler = () => {
    const mail = query({ selector: '#job-mail' });

    if (!mail) return;

    let collant = null;
    let collantOffset = 0;

    const [highlighted] = query({ selector: '.highlighted' });
    const [main] = query({ selector: '.main' });

    const stickSidebar = () => {
        collantOffset =
            window.$stereorepo.superWindow.windowWidth < 1100 ? 1 : 200;

        collant = window.$stereorepo.superScroll.watch({
            element: highlighted,
            options: {
                collant: true,
                target: main,
                collantOffset,
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
