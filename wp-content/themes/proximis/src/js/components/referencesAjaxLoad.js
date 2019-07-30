import { superPolyfill, query } from '@stereorepo/sac';

const referencesAjaxLoadHandler = () => {
    const [referenceSlider] = query({ selector: '.js-ref-slider' });

    if (!referenceSlider) return;
    superPolyfill.initializeWhatwgFetch();

    const updateOldElement = ({ oldElement, type }) => {
        oldElement.classList.add(`ref-slide-${type}-out`);
    };

    const updateFollowingElement = ({ followingElement, type }) => {
        followingElement.classList.add(`ref-slide-${type}-in`);
    };

    const startLoadingAction = ({ type = 'next', currentSlide }) => {
        const currentReferenceId = currentSlide.dataset.refId;

        const action = 'load_references';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `type=${type}&current_reference_id=${currentReferenceId}`
        })
            .then(res => res.text())
            .then(response => {
                currentSlide.insertAdjacentHTML('afterend', response);

                let selector = '';
                switch (type) {
                    case 'prev':
                        selector = '.js-ref-slide-prev';
                        break;
                    case 'next':
                        selector = '.js-ref-slide-next';
                        break;
                    default:
                        selector = '.js-ref-slide-next';
                        break;
                }

                const [followingSlide] = query({
                    selector,
                    ctx: referenceSlider
                });

                const [oldSlide] = query({
                    selector: '.js-ref-slide-current',
                    ctx: referenceSlider
                });

                const transitionElementDuration = getComputedStyle(
                    oldSlide
                ).getPropertyValue('transition-duration');

                if (transitionElementDuration !== '0s') {
                    oldSlide.addEventListener(
                        'transitionstart',
                        () => {
                            updateFollowingElement({
                                followingElement: followingSlide,
                                type
                            });
                        },
                        false
                    );
                } else {
                    updateFollowingElement({
                        followingElement: followingSlide,
                        type
                    });
                }

                updateOldElement({ oldElement: oldSlide, type });
            });
    };

    const getCurrentContext = () => {
        const [currentSlide] = query({ selector: '.js-ref-slide-current' });
        const [prevButton, nextButton] = query({
            selector: '.js-button-hexagon',
            ctx: currentSlide
        });

        prevButton.addEventListener(
            'click',
            () => {
                startLoadingAction({
                    type: 'prev',
                    currentSlide
                });
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                startLoadingAction({
                    type: 'next',
                    currentSlide
                });
            },
            false
        );
    };

    getCurrentContext();
};

export default referencesAjaxLoadHandler;
