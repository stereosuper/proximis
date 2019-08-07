import { Collant } from '@stereorepo/collant';
import { superWindow } from '@stereorepo/sac';

const jobHandler = () => {
    const mail = document.getElementById('job-mail');

    if (!mail) return;

    let collant;

    const stickSidebar = () => {
        if (superWindow.windowWidth < 1100) {
            collant = new Collant({
                selector: '.highlighted',
                box: '.main',
                offsetBottom: '1px'
            });
        } else {
            collant = new Collant({
                selector: '.highlighted',
                box: '.main',
                offsetTop: '200px'
            });
        }

        collant.stickIt();
    };

    stickSidebar();

    superWindow.addResizeEndFunction(() => {
        collant.ripIt();
        stickSidebar();
    });
};

export default jobHandler;
