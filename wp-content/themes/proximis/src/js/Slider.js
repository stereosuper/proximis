import {
    query,
    forEach
} from './utils.js';

import {
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
    forEach(this.dots, (dot, dotIndex) => {
        dot.addEventListener('click', () => {
            if (
                !TweenMax.isTweening(this.slides) && this.activeSlide != dotIndex
            ) {
                this.kill();
                this.nextIndex(this, dotIndex);
            }
        });
    });

    console.log("this.slides : " + this.slides);
    this.slides.forEach((el) => {
        this.itemHeight = el.clientHeight;
        console.log("el.clientHeight : " + el.clientHeight);
        this.maxHeight = Math.max(this.maxHeight, this.itemHeight)
    });
    this.slides.forEach((el) => {
        TweenMax.set(el, {
            height: this.maxHeight
        });
        TweenMax.set(this.wrapper, {
            height: this.maxHeight
        });
    });
}

Slider.prototype.play = function play() {
    TweenMax.delayedCall(20, this.next, [this]);
};

Slider.prototype.pause = function pause() {};

Slider.prototype.next = function next(self) {
    if (self.activeSlide + 1 < self.nbSlides) {
        self.nextSlide = self.activeSlide + 1;
    } else {
        self.nextSlide = 0;
    }
    self.animate(self);
};

Slider.prototype.nextIndex = function nextIndex(self, index) {
    self.nextSlide = index;
    self.animate(self);
};

Slider.prototype.animate = function animate(self) {
    TweenMax.set(self.slides[self.nextSlide], {
        zIndex: 3
    });
    TweenMax.set(self.slides[self.activeSlide], {
        zIndex: 4
    });
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
    TweenMax.to(self.slides[self.activeSlide], 1, {
        webkitClipPath: 'circle(0% at 75% 75%)',
        onComplete: () => {
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
    self.play();
}

Slider.prototype.kill = function kill() {
    TweenMax.killTweensOf(this.next);
};

export default Slider;