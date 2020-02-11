import { Linear, TweenMax } from 'gsap';
import { query } from '@stereorepo/sac';

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

    let collant = null;

    const schema2 = document.getElementById('schema2');

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
        if (window.$stereorepo.superWindow.windowWidth < 1100) return;

        const [schemaContainer] = query({ selector: '.schema-container' });
        const [schemaWrapper] = query({ selector: '#schema-wrapper' });

        collant = window.$stereorepo.superScroll.watch({
            element: schemaContainer,
            options: {
                collant: true,
                target: schemaWrapper,
                position: 'top'
            }
        });
    };

    const scrollHandler = () => {
        if (!schema2) return;

        const container = document.getElementById('schema-wrapper');
        const missionSchema = document.getElementById('mission-schema');

        // if (container.style.position === 'absolute') {
        //     schema2.classList.add('off');
        //     missionSchema.classList.add('on');
        // } else {
        //     schema2.classList.remove('off');
        //     missionSchema.classList.remove('on');
        // }

        const scroll =
            schema2.getBoundingClientRect().top -
            container.getBoundingClientRect().top;

        const pos = container.clientHeight / 3;

        if (scroll > pos) {
            schema2.classList.add('off');
            missionSchema.classList.add('on');
        } else {
            schema2.classList.remove('off');
            missionSchema.classList.remove('on');
        }
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

    window.$stereorepo.superScroll.on('scroll', scrollHandler);

    window.$stereorepo.superWindow.addResizeEndFunction(() => {
        if (collant) collant.forget();
        collant = null;

        stickSchema();
    });
};

export default schemaHandler;
