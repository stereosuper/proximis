import { forEach } from '@stereorepo/sac';
import { TweenMax } from 'gsap';

const slider = () => {
    const slider = document.getElementById('slider');

    if(!slider) return;

    const slideDatas = slider.querySelectorAll('.js-slide');
    const nav = slider.querySelector('#slide-nav');
    const btns = nav.querySelectorAll('button');
    const slide = slider.querySelector('#slide');

    if (!slide || !slideDatas.length) return;

    const text = slide.querySelector('#slide-text');
    const img = slide.querySelector('#slide-img');

    text.innerHTML = slideDatas[0].querySelector('.slide-text').innerHTML;
    img.innerHTML = slideDatas[0].querySelector('.slide-img').innerHTML;
    slide.classList.remove('hidden');

    nav.querySelector('li').querySelector('button').classList.add('on');

    slideDatas[0].classList.add('hidden');

    forEach(btns, btn => {
        btn.addEventListener('click', e => {
            forEach(btns, btn => { btn.classList.remove('on'); });
            e.target.classList.add('on');

            TweenMax.to(text, 0.3, {opacity: 0, onComplete: () => {
                text.innerHTML = slideDatas[e.target.dataset.slide].querySelector('.slide-text').innerHTML;
                TweenMax.to(text, 0.3, {opacity: 1});
            }});
            
            TweenMax.to(img.querySelector('img'), 0.3, {
                opacity: 0, y: 10, delay: 0.1, onComplete: () => {
                    img.innerHTML = slideDatas[e.target.dataset.slide].querySelector('.slide-img').innerHTML;
                    TweenMax.fromTo(img.querySelector('img'), 0.3, { opacity: 0, y: 10 }, { opacity: 1, y: 0, delay: 0.1 });
                }
            });
        }, false);
    });
};

export default slider;
