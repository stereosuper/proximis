import { superPolyfill, query, forEach, superWindow } from '@stereorepo/sac';
import { Collant } from '@stereorepo/collant';
import { TweenMax, TweenLite } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import { easing, breakpoints } from '../global';

// NOTE: We need to use ScrollToPlugin in order to ensure that the plugin won't be tree-shaked
const ensureScrollTo = ScrollToPlugin;

class ReferencesSlider {
    constructor() {
        this.state = {
            transitioning: false,
            sticky: false
        };

        this.referenceSlider = null;
        this.loader = null;
        this.idsList = [];
        this.slugsList = [];
        this.collants = [];
        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        this.resetContext = this.resetContext.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);

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
            .then(({ ids, slugs }) => {
                this.idsList = [...ids];
                this.slugsList = [...slugs];
                callback();
            });
    }
    checkAnyFollowing() {
        if (this.idsList.length > 1) {
            const [navButtons] = query({
                selector: '.js-nav-btn',
                ctx: this.form
            });
            TweenMax.to(navButtons, 0.3, {
                autoAlpha: 1,
                ease: easing.easeInOut
            });
        }
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
    scrollToReference() {
        const offset =
            window.scrollY + this.referenceSlider.getBoundingClientRect().top;

        TweenLite.to(window, 0.5, {
            scrollTo: {
                y: offset
            },
            ease: easing.easeInOut
        });
    }
    changeLocationHash(followingSlide) {
        const slug = followingSlide.dataset.refSlug;

        window.location.hash = slug;
    }
    checkLocationHash() {
        const { hash } = window.location;
        if (hash) {
            if (this.state.transitioning) return;

            const slugIndex = this.slugsList.indexOf(hash.replace('#', ''));
            this.newReferenceId = this.idsList[slugIndex];

            this.type = 'next';
            this.state.transitioning = true;
            this.scrollToReference();
            this.checkLoadingCall();
        }
    }
    checkLoadingCall() {
        if (this.newReferenceId !== this.currentReferenceId) {
            const [slide] = query({
                selector: `.js-ref-id-${this.newReferenceId}`
            });

            if (slide) {
                slide.classList.add('js-ref-following-slide');
                this.slideAnimation();
            } else {
                this.startLoadingAction();
            }
        } else {
            this.newReferenceId = null;
            this.type = null;
            this.state.transitioning = false;
        }
    }
    stickElements() {
        this.state.sticky = true;

        forEach(this.collants, collant => {
            collant.stickIt();
        });
    }
    unstickElements() {
        forEach(this.collants, collant => {
            collant.ripIt();
        });

        this.state.sticky = false;
    }
    startLoadingAction() {
        this.loader.classList.add('loading');

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

        this.changeLocationHash(followingSlide);

        oldSlide.classList.remove('ref-slide-init');

        TweenMax.set(followingSlide, {
            xPercent
        });

        TweenMax.set(followingSlide, {
            xPercent
        });

        TweenMax.to(oldSlide, 0.5, {
            xPercent: -xPercent,
            ease: easing.easeInOut,
            force3D: true,
            onStart: () => {
                TweenMax.to(followingSlide, 0.5, {
                    xPercent: 0,
                    ease: easing.easeInOut,
                    force3D: true,
                    onComplete: this.resetContext
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

        this.loader.classList.remove('loading');

        TweenMax.set(followingSlide, { clearProps: 'all' });

        this.currentReferenceId = 0;
        this.newReferenceId = 0;
        this.type = null;
        this.currentSlide = null;

        this.state.transitioning = false;
        this.setCurrentContext();
    }
    setCurrentContext() {
        if (this.idsList.length < 1) return;

        this.unstickElements();
        this.collants = [];

        [this.currentSlide] = query({
            selector: '.js-ref-current-slide'
        });
        this.currentReferenceId = parseInt(this.currentSlide.dataset.refId, 10);

        const [prevButton, nextButton] = query({
            selector: '.js-button-hexagon',
            ctx: this.currentSlide
        });

        const { height } = this.currentSlide.getBoundingClientRect();
        TweenMax.to(this.referenceSlider, 0.3, {
            height: `${height}px`,
            ease: easing.easeInOut,
            force3D: true,
            onComplete: () => {
                TweenMax.set(this.referenceSlider, { clearProps: 'transform' });
            }
        });

        prevButton.addEventListener(
            'click',
            () => {
                if (this.state.transitioning) return;

                this.type = 'prev';
                this.changeSlide();
            },
            false
        );
        nextButton.addEventListener(
            'click',
            () => {
                if (this.state.transitioning) return;

                this.type = 'next';
                this.changeSlide();
            },
            false
        );

        if (
            !this.state.sticky &&
            superWindow.windowWidth > breakpoints.horizontal.xl
        ) {
            this.collants = [
                ...this.collants,
                new Collant({
                    ctx: this.currentSlide,
                    selector: '.js-nav-btn',
                    box: '.js-ref-first-part',
                    offsetTop: '100px'
                }),
                new Collant({
                    ctx: this.currentSlide,
                    selector: '.js-btn-download',
                    box: '.js-ref-content-wrapper',
                    offsetTop: '160px'
                }),
                new Collant({
                    ctx: this.currentSlide,
                    selector: '.js-infos-datas',
                    box: '.js-content-btn-infos',
                    offsetTop: '25px'
                })
            ];

            this.stickElements();
        }
    }
    changeSlide() {
        this.state.transitioning = true;
        this.findFollowingElement();
        this.checkLoadingCall();
    }
    initializeCaseStudyClickEvent() {
        const caseStudies = query({ selector: '.js-case-study' });

        forEach(caseStudies, caseStudy => {
            caseStudy.addEventListener(
                'click',
                event => {
                    event.preventDefault();
                    if (this.state.transitioning) return;
                    const selectedId = parseInt(caseStudy.dataset.refId, 10);

                    this.scrollToReference();
                    this.selectFollowingElement({ id: selectedId });
                    this.checkLoadingCall();
                },
                false
            );
        });
    }
    resizeHandler() {
        if (
            !this.state.sticky &&
            superWindow.windowWidth > breakpoints.horizontal.xl
        ) {
            this.stickElements();
        } else if (
            this.state.sticky &&
            superWindow.windowWidth <= breakpoints.horizontal.xl
        ) {
            this.unstickElements();
        }
    }
    initialize() {
        [this.referenceSlider] = query({ selector: '.js-ref-slider' });
        if (!this.referenceSlider) return;
        [this.loader] = query({
            selector: '.js-loader',
            ctx: this.referenceSlider
        });

        this.getAllSlideIds(() => {
            this.checkAnyFollowing();
            this.initializeCaseStudyClickEvent();
            this.setCurrentContext();
            this.checkLocationHash();
        });

        superWindow.addResizeEndFunction(this.resizeHandler);
    }
}

export default ReferencesSlider;
