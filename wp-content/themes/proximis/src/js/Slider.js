import {
    query
} from './utils.js';

import {
    TimelineMax,
    TweenMax
} from 'gsap';

function Slider(
    wrapper
) {
    this.wrapper = wrapper;
    this.slides = query('.slide', this.wrapper);
    this.dots = query('.dot', this.wrapper);
    this.activeSlide = 0;
    this.nextSlide = 1;
    this.nbSlides = this.slides.length;
    this.maxHeight = 0;

    this.slides.forEach((el) => {
        this.itemHeight = el.offsetHeight;
        this.maxHeight = Math.max(this.maxHeight, this.itemHeight)
    });
    TweenMax.set(this.wrapper, {
        height: this.maxHeight
    });
}

Slider.prototype.play = function play() {
    TweenMax.delayedCall(20, () => {
        this.next();
    });
};

Slider.prototype.pause = function pause() {};

Slider.prototype.next = function next() {
    const self = this;
    if (this.activeSlide + 1 < this.nbSlides) {
        this.nextSlide = this.activeSlide + 1;
    } else {
        this.nextSlide = 0;
    }

    TweenMax.set(this.slides[this.nextSlide], {
        zIndex: 3
    });
    TweenMax.set(this.slides[this.activeSlide], {
        zIndex: 4
    });
    TweenMax.to(this.slides[this.activeSlide], 1, {
        webkitClipPath: 'circle(0% at 75% 75%)',
        onComplete: function () {
            TweenMax.set(self.dots[self.activeSlide], {
                css: {
                    className: '-=active'
                }
            });
            TweenMax.set(self.dots[self.nextSlide], {
                css: {
                    className: '+=active'
                }
            });
            TweenMax.set(self.slides[self.nextSlide], {
                zIndex: 4
            });
            TweenMax.set(self.slides[self.activeSlide], {
                zIndex: 2,
                webkitClipPath: 'circle(150% at 75% 75%)'
            });
            self.activeSlide = self.nextSlide;
        }
    });
    this.play();
};

export default Slider;