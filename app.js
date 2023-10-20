const titreSpans = document.querySelectorAll('h1 span');
const titreSpans2 = document.querySelectorAll('h2 span');
const btns = document.querySelectorAll('.btn-first');
const logo = document.querySelector('.logo');
const medias = document.querySelectorAll('.bulle');
const l1 = document.querySelector('.l1');
const l2 = document.querySelector('.l2');

window.addEventListener('load', () => {

    const TL = gsap.timeline({paused: true});

    TL
    .staggerFrom(titreSpans, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3)
    .staggerFrom(titreSpans2, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.3)
    .staggerFrom(btns, 1, {opacity: 0, ease: "power2.out"}, 0.3, '-=1')
    .from(l1, 1, {width: 0, ease: "power2.out"}, '-=2')
    .from(l2, 1, {width: 0, ease: "power2.out"}, '-=2')
    .from(logo, 0.4, {transform: "scale(0)", ease: "power2.out"}, '-=2')
    .staggerFrom(medias, 1, {right: -200, ease: "power2.out"}, 0.3, '-=1');

    
    

    TL.play();
})

const audio = document.getElementById('myAudio');
const playPauseButton = document.getElementById('play-pause-button');

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'PAUSE';
        playPauseButton.classList.remove('play');
        playPauseButton.classList.add('pause');
    } else {
        audio.pause();
        playPauseButton.textContent = 'PLAY';
        playPauseButton.classList.remove('pause');
        playPauseButton.classList.add('play');
    }
});




var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

(function ($) {

    $.fn.youtube_background = function() {
        var YOUTUBE = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

        var $this = $(this);

        function onVideoPlayerReady(event) {
            event.target.playVideo();

            $(event.target.a).css({
                "top" : "50%",
                "left" : "50%",
                "transform": "translateX(-50%) translateY(-50%)",
                "position": "absolute"
            });

            var $root = $(event.target.a).parent();

            function onResize() {
                var h = $root.outerHeight() + 100; // since showinfo is deprecated and ignored after September 25, 2018. we add +100
                var w = $root.outerWidth() + 100;
                var res = 1.77777778;

                if (res > w/h) {
                    $root.find('iframe').width(h*res).height(h);
                } else {
                    $root.find('iframe').width(w).height(w/res);
                }
            }
            $(window).on('resize', onResize);
            onResize();
        }

        function onVideoStateChange(event) {
            event.target.playVideo();
        }

        var ytp = null;
        var yt_event_triggered = false;

        window.onYouTubeIframeAPIReady = function () {
            yt_event_triggered = true;

             //element loop
            for (var i = 0; i < $this.length; i++) {
                var $elem = $($this[i]);

                if ($elem.parent().hasClass('youtube-background')) {
                    continue;
                }

                $elem.wrap('<div class="youtube-background" />');
                var $root = $elem.parent();

                $root.css({
                    "height" : "100%",
                    "width" : "100%",
                    "z-index": "0",
                    "position": "absolute",
                    "overflow": "hidden"
                });

                $root.parent().parent().css({
                    "position": "relative"
                });

                var ytid = $elem.data('youtube');

                var pts = ytid.match(YOUTUBE);
                if (pts && pts.length) {
                    ytid = pts[1];
                }

                ytp = new YT.Player($elem[0], {
                    height: '1080',
                    width: '1920',
                    videoId: ytid,
                    playerVars: {
                        'controls': 0,
                        'autoplay': 1,
                        'mute': 1,
                        'origin': window.location.origin,
                        'loop': 1,
                        'rel': 0,
                        'showinfo': 0,
                        'modestbranding': 1
                    },
                    events: {
                        'onReady': onVideoPlayerReady,
                        'onStateChange': onVideoStateChange
                    }
                });
            }
        };

        if (window.hasOwnProperty('YT') && window.YT.loaded && !yt_event_triggered) {
            window.onYouTubeIframeAPIReady();
        }

 		return $this;
 	};
})(jQuery);
