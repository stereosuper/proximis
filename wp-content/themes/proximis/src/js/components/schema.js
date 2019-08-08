import { forEach } from '@stereorepo/sac';
import { TimelineMax, TweenMax } from 'gsap';

const schemaHandler = () => {
    const schema = document.getElementById('schema');

    if (!schema) return;

    const ext = schema.querySelector('#ext');
    const int = schema.querySelector('#int');
    const indic = schema.querySelector('#indic');
    const dot = schema.querySelector('#dot');
    const circle = schema.querySelector('#circle');
    const bg = schema.querySelectorAll('.center-bg');
    const bgLogo = schema.querySelectorAll('.logo-bg');
    const texts = schema.querySelectorAll('.btn-text');
    const btns = schema.querySelectorAll('.schema-btn');
    let desc, bbox;
    const centerRotation = TweenMax.to(int, 50, {rotation: '-=360', transformOrigin: '50% 50%', repeat: -1, ease: Linear.easeNone, paused: true});
    const schemaLeft = schema.getBoundingClientRect().x;


    const animSchema = () => {
        TweenMax.to(indic, 0.3, {opacity: 1});
        TweenMax.to(dot, 0.3, {opacity: 1, delay: 0.2});
        TweenMax.to(bg, 0.3, {fill: '#44BAD1', delay: 0.6});
        TweenMax.to(circle, 0.3, {stroke: '#44BAD1', strokeWidth: 2, strokeDasharray: '1, 0', delay: 0.6});
        TweenMax.to([bgLogo, texts], 0.3, {fill: '#fff', delay: 0.6});
        TweenMax.to(ext, 2, {rotation: "+=120", transformOrigin: "50% 50%", onComplete: animSchema, delay: 5});
        TweenMax.to(indic, 0.3, {opacity: 0, delay: 5});
        TweenMax.to(dot, 0.3, {opacity: 0, delay: 4.6});
        TweenMax.to(bg, 0.3, {fill: '#fff', delay: 4.2});
        TweenMax.to([bgLogo, texts], 0.3, {fill: '#18162B', delay: 4.2});
        TweenMax.to(circle, 0.3, {stroke: '#18162B', strokeWidth: 1, strokeDasharray: '2, 2', delay: 4.2});
    }

    centerRotation.play();
    TweenMax.set(ext, {rotation: 60, transformOrigin: '50% 50%'});
    animSchema();

    forEach(btns, btn => {
        btn.addEventListener('mouseenter', () => {
            centerRotation.pause();
            desc = document.getElementById(btn.id + '-desc');
            if( !desc ) return;
            bbox = btn.getBoundingClientRect();
            desc.style.top = (bbox.y + bbox.height + 3) + 'px';
            desc.style.left = (bbox.x - schemaLeft - 20) + 'px';
            desc.classList.add('on');
        });

        btn.addEventListener('mouseleave', () => {
            centerRotation.resume();
            desc = document.getElementById(btn.id + '-desc');
            if( !desc ) return;
            desc.classList.remove('on');
        });
    });
};

export default schemaHandler;
