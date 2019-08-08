import { query, forEach } from '@stereorepo/sac';

const modal = () => {
    const modalTriggers = query({
        selector: '.js-modal'
    });
    const modals = query({ selector: '.js-wrapper-modal' });

    if (!modalTriggers.length && !modals.length) return;
    const state = {
        alreadyClicked: false
    };

    let closeModal = null;
    let modalTarget = null;

    const checkSubmissionPage = () => {
        forEach(modals, modal => {
            const [form] = query({ selector: '.wpcf7-form', ctx: modal });
            const classesToCheck = ['invalid', 'sent'];

            const hasClass = classesToCheck.some(className =>
                form.classList.contains(className)
            );

            if (hasClass) {
                modal.classList.add('on');
            }
        });
    };

    const handleModalsTrigger = () => {
        forEach(modalTriggers, trigger => {
            trigger.addEventListener('click', e => {
                let modalData = e.target.dataset.modal;

                [modalTarget] = query({
                    selector: '#' + modalData
                });
                modalTarget.classList.add('on');

                if (state.alreadyClicked) return;
                state.alreadyClicked = true;
            });
        });
    };

    const handleModalsClosure = () => {
        closeModal = query({
            selector: '.js-close-modal',
            ctx: modalTarget
        });

        forEach(closeModal, closeButton => {
            closeButton.addEventListener('click', () => {
                const modal = closeButton.closest('.js-wrapper-modal');
                modal.classList.remove('on');
            });
        });
    };

    checkSubmissionPage();
    handleModalsTrigger();
    handleModalsClosure();
};

export default modal;
