const partnersCatsHandler = () => {
    const wrapper = document.getElementById('partners-cat');
    const refs = document.getElementById('ref-list');

    if ( !wrapper || !refs ) return;

    const btns = wrapper.querySelectorAll('button');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(item => item.classList.remove('on'));
            btn.classList.add('on');
            
            if( btn.dataset.cat === 'all'){
                refs.querySelectorAll('li').forEach(elt => elt.classList.remove('hidden') );
            }else{
                refs.querySelectorAll('li').forEach(elt => elt.classList.add('hidden') );
                refs.querySelectorAll('[data-cat="' + btn.dataset.cat + '"]').forEach(elt => elt.classList.remove('hidden') );
            }
        });
    });
};

export default partnersCatsHandler;
