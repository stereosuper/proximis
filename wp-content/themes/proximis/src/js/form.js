const formHandler = () => {
    const checkIfEmpty = ( input, focusout ) => {
        input.value ? input.classList.add('has-value') : input.classList.remove('has-value');
        
        if( focusout && input.getAttribute('aria-required') ){
            input.classList.contains('has-value') ? input.classList.remove('wpcf7-not-valid') : input.classList.add('wpcf7-not-valid');
        }
    };

    const eltHandler = ( formElt ) => {
        const inputs = document.querySelectorAll(formElt);

        if( !inputs.length ) return;

        [].slice.call(inputs).forEach(elt => {
            if( formElt === 'input' ) checkIfEmpty( elt );
            elt.addEventListener('focusout', () => { checkIfEmpty( elt, true ); });
        });
    };

    eltHandler('input');
    eltHandler('textarea');
};

export default formHandler;