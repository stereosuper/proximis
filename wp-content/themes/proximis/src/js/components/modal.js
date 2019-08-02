import {
    query,
    forEach
} from '@stereorepo/sac';

const modal = (triggers) => {
    if (!triggers.length) return;
    let closeModal = null;
    let modalTarget = null;
    const state = {
        alreadyClicked: false
    };

    forEach(triggers, elt => {
        elt.addEventListener('click', (e) => {
            let modalData = e.target.dataset.modal;
            [modalTarget] = query({
                selector: '#' + modalData
            });
            modalTarget.classList.add('on');
            if (state.alreadyClicked) return;
            closeModal = query({
                selector: '.js-close-modal',
                ctx: modalTarget
            });
            forEach(closeModal, elt => {
                elt.addEventListener('click', () => {
                    modalTarget.classList.remove('on');
                });
            });
            state.alreadyClicked = true;
        });
    });
};

export default modal;