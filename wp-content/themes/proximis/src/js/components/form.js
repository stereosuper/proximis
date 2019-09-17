const formHandler = () => {
    const checkIfEmpty = (input, focusout) => {
        input.value
            ? input.classList.add('has-value')
            : input.classList.remove('has-value');

        if (focusout && input.getAttribute('aria-required')) {
            input.classList.contains('has-value')
                ? input.classList.remove('wpcf7-not-valid')
                : input.classList.add('wpcf7-not-valid');
        }
    };

    const eltHandler = formElt => {
        const inputs = document.querySelectorAll(formElt);

        if (!inputs.length) return;

        [].slice.call(inputs).forEach(elt => {
            if (formElt === 'input') checkIfEmpty(elt);
            elt.addEventListener('focusout', () => {
                checkIfEmpty(elt, true);
            });
        });
    };

    // const cf7formValidHandler = () => {
    //     const cf7form = document.querySelector('.wpcf7-form');

    //     if (!cf7form || !cf7form.classList.contains('sent')) return;

    //     const validLink = document.getElementById('valid-link');
    //     const validMsg = document.getElementById('valid-msg');
    //     const msg = cf7form.querySelector('.wpcf7-mail-sent-ok');
    //     let btn, span;

    //     document
    //         .getElementsByTagName('body')[0]
    //         .classList.add('form-validated');

    //     if (!msg || !validLink || !validMsg) return;

    //     span = document.createElement('span');
    //     span.innerText = validMsg.innerText;

    //     btn = document.createElement('a');
    //     btn.innerText = validLink.innerText;
    //     btn.href = window.location.origin + window.location.pathname;

    //     msg.appendChild(span);
    //     msg.appendChild(btn);
    // };

    eltHandler('input');
    eltHandler('textarea');
    //cf7formValidHandler();
};

export default formHandler;
