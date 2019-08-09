import { Linear, TweenMax } from 'gsap';
import { Collant } from '@stereorepo/collant';
import { superWindow } from '@stereorepo/sac';

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

    let collant = undefined;

    const animSchema = () => {
        TweenMax.to(indic, 0.3, { opacity: 1 });
        TweenMax.to(dot, 0.3, { opacity: 1, delay: 0.2 });
        TweenMax.to(bg, 0.3, { fill: '#44BAD1', delay: 0.6 });
        TweenMax.to(circle, 0.3, {
            stroke: '#44BAD1',
            strokeWidth: 2,
            strokeDasharray: '1, 0',
            delay: 0.6
        });
        TweenMax.to([bgLogo, texts], 0.3, { fill: '#fff', delay: 0.6 });
        TweenMax.to(bg, 0.3, { fill: '#fff', delay: 4.2 });
        TweenMax.to([bgLogo, texts], 0.3, { fill: '#18162B', delay: 4.2 });
        TweenMax.to(circle, 0.3, {
            stroke: '#18162B',
            strokeWidth: 1,
            strokeDasharray: '2, 2',
            delay: 4.2
        });
        TweenMax.to(dot, 0.3, { opacity: 0, delay: 4.6 });
        TweenMax.to(indic, 0.3, { opacity: 0, delay: 5 });
        TweenMax.to(ext, 2, {
            rotation: '+=120',
            transformOrigin: '50% 50%',
            onComplete: animSchema,
            delay: 5
        });
    };

    const stickSchema = () => {
        if (superWindow.windowWidth < 1100) return;

        collant = new Collant({
            selector: '.schema-container',
            box: '.schema-wrapper',
            offsetTop: '0px'
        });

        collant.stickIt();
    };

    TweenMax.to(int, 50, {
        rotation: '-=360',
        transformOrigin: '50% 50%',
        repeat: -1,
        ease: Linear.easeNone,
        paused: true
    });
    TweenMax.set(ext, { rotation: 60, transformOrigin: '50% 50%' });

    animSchema();

    stickSchema();

    superWindow.addResizeEndFunction(() => {
        if (collant) {
            collant.ripIt();
            collant = undefined;
        }

        stickSchema();
    });
};

export default schemaHandler;
