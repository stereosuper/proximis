import { query } from '@stereorepo/sac';

const headerHandler = () => {
    const { body } = document;
    const [burger] = query({ selector: '#burger' });
    const [close] = query({ selector: '#close-menu' });

    const [langSwitcherButton] = query({
        selector: '.js-lang-switcher-button'
    });
    const [langSwitcherList] = query({
        selector: '.js-lang-list'
    });

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
                if (langSwitcherList) {
                    langSwitcherList.classList.toggle('activated');
                }
            },
            false
        );
    }
};

export default headerHandler;
