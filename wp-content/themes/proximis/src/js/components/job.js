import { Collant } from '@stereorepo/collant';

const jobHandler = () => {
    const mail = document.getElementById('job-mail');

    if (!mail) return;

    const collant = new Collant({
        //ctx: '.container-tiny',
        selector: '.highlighted',
        box: '.main',
        offsetTop: '100px'
    });

    collant.stickIt();
};

export default jobHandler;
