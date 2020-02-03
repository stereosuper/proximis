import { forEach, query } from '@stereorepo/sac';

const newsHandler = () => {
    const newsletters = query({ selector: '.newsletter' });
    let form, input, email;

    if (!newsletters.length) return;

    forEach(newsletters, elt => {
        [form] = query({ selector: '.wpcf7-form' });

        if (!form) return;

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

        if (form.classList.contains('sent')) {
            gtag('event', 'newsletter', {
                event_category: 'inscription',
                event_label: 'blog'
            });
        }
    });
};

export default newsHandler;
