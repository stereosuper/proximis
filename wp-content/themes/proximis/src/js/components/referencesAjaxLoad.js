import { superPolyfill, query } from '@stereorepo/sac';
import { TweenMax, TimelineLite } from 'gsap';

const referencesAjaxLoadHandler = () => {
    const [referenceSlider] = query({ selector: '.js-ref-slider' });

    if (!referenceSlider) return;
    superPolyfill.initializeWhatwgFetch();

    const checkLoadingAction = ({ type = 'next', currentSlide }) => {};

    const startLoadingAction = ({ type = 'next', currentSlide }) => {
        const currentReferenceId = currentSlide.dataset.refId;

        const action = 'check_references';
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

                let selector = '.js-ref-following-slide';
                let xPercent = 0;
                switch (type) {
                    case 'prev':
                        xPercent = -100;
                        break;
                    case 'next':
                        xPercent = 100;
                        break;
                    default:
                        xPercent = 100;
                        break;
                }

                const [followingSlide] = query({
                    selector,
                    ctx: referenceSlider
                });

                const [oldSlide] = query({
                    selector: '.js-ref-current-slide',
                    ctx: referenceSlider
                });

                oldSlide.classList.remove('ref-slide-init');

                const timeline = new TimelineLite({
                    onComplete: () => {
                        oldSlide.classList.remove('js-ref-current-slide');

                        followingSlide.classList.remove(
                            'js-ref-following-slide'
                        );
                        followingSlide.classList.add('js-ref-current-slide');
                        getCurrentContext();
                    }
                });

                TweenMax.set(followingSlide, {
                    xPercent
                });

                timeline.add(
                    TweenMax.to(oldSlide, 0.3, {
                        xPercent: -xPercent
                    })
                );

                timeline.add(
                    TweenMax.to(followingSlide, 0.3, {
                        xPercent: 0
                    })
                );

                timeline.play();
            });
    };

    const getCurrentContext = () => {
        const [currentSlide] = query({ selector: '.js-ref-current-slide' });
        const [prevButton, nextButton] = query({
            selector: '.js-button-hexagon',
            ctx: currentSlide
        });

        const { height } = currentSlide.getBoundingClientRect();
        TweenMax.to(referenceSlider, 0.3, { height: `${height}px` });

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
