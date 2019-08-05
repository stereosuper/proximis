import Collant from './Collant';

const stickReference = () => {
    const collantArrows = new Collant({
        selector: '.js-nav-btn',
        box: '.js-ref-first-part',
        offsetTop: '100px'
        // offsetTop: '10vh'
    });

    const collantDownloadButton = new Collant({
        selector: '.js-btn-download',
        box: '.js-ref-content-wrapper',
        offsetTop: '160px'
        // offsetTop: '10vh'
    });

    const collantInfoData = new Collant({
        selector: '.js-infos-datas',
        box: '.js-content-btn-infos',
        offsetTop: '20px'
        // offsetTop: '10vh'
    });

    collantArrows.stickIt();
    collantDownloadButton.stickIt();
    collantInfoData.stickIt();
};

export default stickReference;
