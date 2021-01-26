import { forEach } from '@stereorepo/sac';
import { TweenMax } from 'gsap';

const infiniteLogos = () => {
    const logos = document.getElementById('infinite-logos');

    if (!logos) return;

    const list = logos.querySelector('#logos');
    const wrapper = logos.querySelector('#logos-wrapper');

    if(list.clientWidth <= logos.clientWidth){
        wrapper.classList.add('center');
        return;
    }

    const listClone = list.cloneNode(true);
    const dur = 70;

    listClone.id = 'logos-clone';
    wrapper.appendChild(listClone);

    TweenMax.to(list, dur, {
        x: '-100%', ease: Linear.easeNone, repeat: -1, onComplete: () => {
            TweenMax.fromTo(list, dur, { x: '100%' }, { x: '0%', ease: Linear.easeNone});
    }});
    TweenMax.fromTo(listClone, dur, {x: '0%'}, {
        x: '-100%', ease: Linear.easeNone, repeat: -1, onComplete: () => {
            TweenMax.to(listClone, dur, { x: '-200%', ease: Linear.easeNone });
    }});
};

export default infiniteLogos;
