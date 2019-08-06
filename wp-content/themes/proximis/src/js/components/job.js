import { Collant } from '@stereorepo/collant';

const jobHandler = () => {
    const mail = document.getElementById('job-mail');

    if (!mail) return;

    new Collant({
        //ctx: mail,
        selector: mail,
        box: '.container-tiny',
        offsetTop: '100px'
    });
};

export default jobHandler;
