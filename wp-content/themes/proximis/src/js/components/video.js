import { TweenMax } from 'gsap';
import { forEach } from '@stereorepo/sac';

const videoHandler = () => {
    const tag = document.createElement('script');
    const firstScriptTag = document.getElementsByTagName('script')[0];
    const videos = document.querySelectorAll('.js-video');

    if (!videos.length) return;

    const players = [];

    window.onYouTubeIframeAPIReady = () => {
        const onPlayerReady = ({ id, videoElement }) => {
            const cover = videoElement.querySelector('.cover');

            cover.addEventListener(
                'click',
                () => {
                    TweenMax.to(cover, 0.3, {
                        opacity: 0,
                        onComplete: () => {
                            TweenMax.set(cover, { display: 'none' });
                        }
                    });

                    players[id].playVideo();
                    videoElement.classList.add('playing');
                },
                false
            );
        };

        forEach(videos, videoElement => {
            const id = videoElement.getAttribute('data-id');
            players[id] = new window.YT.Player(
                videoElement.querySelector('.iframe'),
                {
                    videoId: id,
                    events: {
                        onReady: onPlayerReady({ videoElement, id })
                    }
                }
            );
        });
    };

    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

export default videoHandler;
