import { forEach, query } from '@stereorepo/sac';

const headerHandler = () => {
    const newsletters = query({ selector: '.newsletter' });
    let input, email;

    if (!newsletters.length) return;

    forEach(newsletters, elt => {
        [input] = query({
            selector: '.wpcf7-email',
            ctx: elt
        });
        [email] = query({
            selector: '.email',
            ctx: elt
        });

        if (input) {
            input.addEventListener('focus', () => {
                email.classList.add('on');
            });
            input.addEventListener('blur', () => {
                if (!input.value) email.classList.remove('on');
            });
        }
    });
};

export default headerHandler;
