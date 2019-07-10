const formHandler = () => {
    const inputs = document.querySelectorAll('input');

    if( !inputs.length ) return;

    const checkIfEmpty = ( input ) => {
        input.value ? input.classList.add('has-value') : input.classList.remove('has-value');
    };

    [].slice.call(inputs).forEach(elt => {
        checkIfEmpty( elt );
        elt.addEventListener('focusout', () => { checkIfEmpty( elt ); });
    });
};

export default formHandler;