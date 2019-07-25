const headerHandler = () => {
    const body = document.getElementsByTagName('body')[0];
    const burger = document.getElementById('burger');
    const close = document.getElementById('close-menu');

    burger.addEventListener('click', () => {
        body.classList.add('menu-open');
    });

    close.addEventListener('click', () => {
        body.classList.remove('menu-open');
    });
};

export default headerHandler;
