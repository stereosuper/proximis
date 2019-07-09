import {
    query,
    forEach
} from './utils.js';

import {
    TweenMax
} from 'gsap';

import win from './Window.js';

function Slider(
    wrapper
) {
    this.wrapper = wrapper;
    this.slides = query('.slide', this.wrapper);
    this.dots = query('.dot', this.wrapper);
    this.activeSlide = 0;
    this.nextSlide = 1;
    this.nbSlides = this.slides.length;
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

    this.calculHeight(this);

    win.addResizeFunction(() => this.calculHeight(this));
}

Slider.prototype.calculHeight = function calculHeight(self) {
    TweenMax.set(self.wrapper, {
        height: 'auto'
    });
    self.maxHeight = 0;
    self.slides.forEach((el) => {
        TweenMax.set(el, {
            height: 'auto'
        });
        self.itemHeight = el.clientHeight;
        self.maxHeight = Math.max(self.maxHeight, self.itemHeight)
    });
    TweenMax.set(self.wrapper, {
        height: self.maxHeight
    });
    self.slides.forEach((el) => {
        TweenMax.set(el, {
            height: self.maxHeight
        });
    });
}

Slider.prototype.play = function play() {
    if (this.nbSlides > 1) {
        TweenMax.delayedCall(20, this.next, [this]);
    }
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