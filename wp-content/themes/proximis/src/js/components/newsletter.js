import { forEach } from '@stereorepo/sac';

const headerHandler = () => {
    const newsletters = document.getElementsByClassName('newsletter');
    let input, email;

    if (!newsletters.length) return;

    forEach(newsletters, elt => {
        input = elt.querySelector('.wpcf7-email');
        email = elt.querySelector('.email');

        input.addEventListener('focus', () => {
            email.classList.add('on');
        });

        input.addEventListener('blur', () => {
            if (!input.value) email.classList.remove('on');
        });
    });
};

export default headerHandler;
