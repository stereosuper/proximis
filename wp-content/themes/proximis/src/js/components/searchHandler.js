import {
    query
} from '@stereorepo/sac';

const searchHandler = () => {
    const [form] = query({
        selector: '#searchform'
    });

    if (!form) return;

    const [input] = query({
        selector: 'input',
        ctx: form
    });

    const [searchBtn] = query({
        selector: '#search'
    });

    form.addEventListener('submit', e => {
        if (!form.classList.contains('on')) {
            e.preventDefault();
            const [inputToFocus] = query({
                selector: 'input',
                ctx: form
            });

            form.classList.add('on');
            inputToFocus.focus();
        }
    });

    input.addEventListener('blur', e => {
        if (e.relatedTarget !== searchBtn) {
            form.classList.remove('on');
        }
    });
};

export default searchHandler;