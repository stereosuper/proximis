import { superPolyfill, query } from '@stereorepo/sac';
import { TweenMax } from 'gsap';

class referencesSlider {
    constructor() {
        [this.referenceSlider] = query({ selector: '.js-ref-slider' });
        if (!this.referenceSlider) return;
        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        superPolyfill.initializeWhatwgFetch();
        this.getCurrentContext();
    }

    checkLoadingAction() {
        this.currentReferenceId = this.currentSlide.dataset.refId;

        const action = 'check_references';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `type=${this.type}&current_reference_id=${this.currentReferenceId}`
        })
            .then(res => {
                return res.json();
            })
            .then(([id]) => {
                this.newReferenceId = id;
                const [slide] = query({
                    selector: `.js-ref-id-${this.newReferenceId}`
                });

                if (slide) {
                    slide.classList.add('js-ref-following-slide');

                    this.slideAnimation();
                } else {
                    this.startLoadingAction();
                }
            });
    }

    startLoadingAction() {
        const action = 'load_references';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `new_reference_id=${this.newReferenceId}`
        })
            .then(res => res.text())
            .then(response => {
                this.currentSlide.insertAdjacentHTML('afterend', response);

                this.slideAnimation();
            });
    }
    slideAnimation() {
        let selector = '.js-ref-following-slide';
        let xPercent = 0;
        switch (this.type) {
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
            ctx: this.referenceSlider
        });

        const [oldSlide] = query({
            selector: '.js-ref-current-slide',
            ctx: this.referenceSlider
        });

        oldSlide.classList.remove('ref-slide-init');

        TweenMax.set(followingSlide, {
            xPercent
        });

        TweenMax.set(followingSlide, {
            xPercent
        });

        TweenMax.to(oldSlide, 0.3, {
            xPercent: -xPercent,
            onComplete: () => {
                TweenMax.to(followingSlide, 0.3, {
                    xPercent: 0,
                    onComplete: this.resetContext()
                });
            }
        });
    }
    resetContext() {
        const [oldSlide] = query(
            { selector: '.js-ref-current-slide' },
            this.referenceSlider
        );
        const [followingSlide] = query(
            { selector: '.js-ref-following-slide' },
            this.referenceSlider
        );

        oldSlide.classList.remove('js-ref-current-slide');

        followingSlide.classList.remove('js-ref-following-slide');
        followingSlide.classList.add('js-ref-current-slide');

        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        this.getCurrentContext();
    }
    getCurrentContext() {
        [this.currentSlide] = query({ selector: '.js-ref-current-slide' });
        const [prevButton, nextButton] = query({
            selector: '.js-button-hexagon',
            ctx: this.currentSlide
        });

        const { height } = this.currentSlide.getBoundingClientRect();
        TweenMax.to(this.referenceSlider, 0.3, { height: `${height}px` });

        prevButton.addEventListener(
            'click',
            () => {
                this.type = 'prev';
                this.checkLoadingAction();
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                this.type = 'next';
                this.checkLoadingAction();
            },
            false
        );
    }
}

export default referencesSlider;
