import { superPolyfill, query, forEach } from '@stereorepo/sac';
import { TweenMax, Power2, TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = ScrollToPlugin;

class ReferencesSlider {
    constructor() {
        this.referenceSlider = null;
        this.idsList = [];
        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        superPolyfill.initializeWhatwgFetch();
    }
    getAllSlideIds(callback) {
        const action = 'get_references_ids';
        const url = `/wp-admin/admin-ajax.php?action=${action}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(({ ids }) => {
                this.idsList = [...ids];
                callback();
            });
    }
    selectFollowingElement({ id = null }) {
        if (id !== null) {
            this.newReferenceId = id;
        } else {
            this.findFollowingElement();
        }
    }
    findFollowingElement() {
        const idIndex = this.idsList.indexOf(this.currentReferenceId);

        if (this.type === 'next') {
            this.newReferenceId =
                idIndex + 2 > this.idsList.length
                    ? this.idsList.slice(0, 1)
                    : this.idsList.slice(idIndex + 1, idIndex + 2);
        } else if (this.type === 'prev') {
            this.newReferenceId =
                idIndex - 1 < 0
                    ? this.idsList.slice(-1)
                    : this.idsList.slice(idIndex - 1, idIndex - 2);
        }
    }
    checkLoadingCall() {
        if (this.newReferenceId === this.currentReferenceId) return;
        const [slide] = query({
            selector: `.js-ref-id-${this.newReferenceId}`
        });

        if (slide) {
            slide.classList.add('js-ref-following-slide');
            this.slideAnimation();
        } else {
            this.startLoadingAction();
        }
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

        this.setCurrentContext();
    }
    setCurrentContext() {
        if (this.idsList.length < 2) return;

        [this.currentSlide] = query({ selector: '.js-ref-current-slide' });
        this.currentReferenceId = parseInt(this.currentSlide.dataset.refId, 10);

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
                this.findFollowingElement();
                this.checkLoadingCall();
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                this.type = 'next';
                this.findFollowingElement();
                this.checkLoadingCall();
            },
            false
        );
    }
    initializeCaseStudyClickEvent() {
        const caseStudies = query({ selector: '.js-case-study' });

        forEach(caseStudies, caseStudy => {
            caseStudy.addEventListener(
                'click',
                event => {
                    event.preventDefault();
                    const selectedId = parseInt(caseStudy.dataset.refId, 10);

                    const offset =
                        window.scrollY +
                        this.referenceSlider.getBoundingClientRect().top;

                    TweenLite.to(window, 0.5, {
                        scrollTo: {
                            y: offset
                        },
                        ease: Power2.easeInOut
                    });

                    this.selectFollowingElement({ id: selectedId });
                    this.checkLoadingCall();
                },
                false
            );
        });
    }
    initialize() {
        [this.referenceSlider] = query({ selector: '.js-ref-slider' });
        if (!this.referenceSlider) return;

        this.getAllSlideIds(() => {
            this.initializeCaseStudyClickEvent();
            this.setCurrentContext();
        });
    }
}

export default ReferencesSlider;
