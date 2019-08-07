import { forEach } from '@stereorepo/sac';
import { TimelineMax, TweenMax } from 'gsap';

const schemaHandler = () => {
    const schema = document.getElementById('schema');

    if (!schema) return;

    const ext = schema.querySelector('#ext');
    const btns = schema.querySelectorAll('.schema-btn');
    let desc, bbox;
    const tl = new TimelineMax();

    TweenMax.set(ext, {rotation: 60, transformOrigin: '50% 50%'});

    //tl.to(ext, 2, {rotation: '+=120', transformOrigin: '50% 50%', repeat: -1, repeatDelay: 5});

    forEach(btns, btn => {
        desc = document.getElementById(btn.id + '-desc');
        bbox = btn.getBBox();

        if( desc ){
            desc.style.top = (bbox.y + bbox.height + 3) + 'px';
            desc.style.left = (bbox.x - 20) + 'px';
        }

        btn.addEventListener('mouseenter', () => {
            desc = document.getElementById(btn.id + '-desc');
            if( !desc ) return;
            desc.classList.add('on');
        });

        btn.addEventListener('mouseleave', () => {
            desc = document.getElementById(btn.id + '-desc');
            if( !desc ) return;
            desc.classList.remove('on');
        });
    });
};

export default schemaHandler;
