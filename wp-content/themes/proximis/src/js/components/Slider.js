import { forEach } from '@stereorepo/sac';
import { TweenMax } from 'gsap';

const slider = () => {
    const slider = document.getElementById('slider');

    if(!slider) return;

    const slideDatas = slider.querySelectorAll('.js-slide');
    const slide = slider.querySelector('#slide');

    slide.innerHTML = slideDatas[0].innerHTML;
    slide.classList.remove('hidden');
    slideDatas[0].classList.add('hidden');
};

export default slider;
