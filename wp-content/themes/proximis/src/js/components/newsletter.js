import { forEach, query } from '@stereorepo/sac';

const newsHandler = () => {
    const newsletters = query({ selector: '.newsletter' });
    let forms = [],
        inputs = [],
        emails = [];

    if (!newsletters.length) return;

    forEach(newsletters, (elt, i) => {
        [forms[i]] = query({ selector: '.wpcf7-form', ctx: elt });

        if (!forms[i]) return;

        [inputs[i]] = query({
            selector: '.wpcf7-email',
            ctx: elt
        });
        [emails[i]] = query({
            selector: '.email',
            ctx: elt
        });

        if (inputs[i]) {
            inputs[i].addEventListener('focus', () => {
                emails[i].classList.add('on');
            });
            inputs[i].addEventListener('blur', () => {
                if (!inputs[i].value) emails[i].classList.remove('on');
            });
        }

        if (forms[i].classList.contains('sent')) {
            gtag('event', 'newsletter', {
                event_category: 'inscription',
                event_label: 'blog'
            });
        }
    });
};

export default newsHandler;
