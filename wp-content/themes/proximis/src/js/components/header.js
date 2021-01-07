import { query, forEach } from '@stereorepo/sac';

const headerHandler = () => {
    const { body } = document;
    const [burger] = query({ selector: '#burger' });
    const [close] = query({ selector: '#close-menu' });

    const [langSwitcherButton] = query({ selector: '.js-lang-switcher-button' });
    const [langSwitcherList] = query({ selector: '.js-lang-list' });

    const liWithSubmenu = query({ selector: '.has-submenu' });

    if (burger) {
        burger.addEventListener(
            'click',
            () => {
                body.classList.add('menu-open');
            },
            false
        );
    }

    if (close) {
        close.addEventListener(
            'click',
            () => {
                body.classList.remove('menu-open');
            },
            false
        );
    }

    if (langSwitcherButton) {
        langSwitcherButton.addEventListener(
            'click',
            () => {
                if (langSwitcherList) langSwitcherList.classList.toggle('activated');
            },
            false
        );
    }

    if (liWithSubmenu.length){
        let link;
        forEach(liWithSubmenu, li => {
            link = li.querySelector('.js-main-link');
            
            link.addEventListener('click', e => {
                if (window.$stereorepo.superWindow.windowWidth >= 1100) return;
                
                e.preventDefault();
                e.target.parentNode.classList.toggle('open');
            }, false);
        });
    }
};

export default headerHandler;
