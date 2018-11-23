// Dependencies:
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js
// https://cdnjs.cloudflare.com/ajax/libs/plyr/3.3.21/plyr.min.js

// Mythium Archive: https://archive.org/details/mythium/

$(window).on('load', function() { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website.
    checkTouchScreen();
})

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                // 'restart',
                'progress'
                // 'current-time',
                // 'duration',
                // 'mute',
                // 'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'http://cloudmen.ru/player/music/',
            extension = '',
            tracks = [{
                "track": 1,
                "image": "https://sr0.picsave.pp.ua/index.php?do=gallery&type=show_pic&id=2754",
                "name": "MEDUZA",
                "autor": "Джиган",
                "duration": "2:46",
                "file": "b7aababaf51467fa65bdbb5ef625bda2"
            },{
                "track": 2,
                "image": "https://avatars.yandex.net/get-music-content/119639/9019e3ab.a.5323619-1/m1000x1000",
                "name": "Запах женщины моей",
                "autor": "Тоже Джиган",
                "duration": "3:09",
                "file": "07b8ea72d86e71b530effe1bfc15b489"
            },{
                "track": 3,
                "image": "https://sun9-5.userapi.com/EOIqFcD8xHrIzdrH9YNM8bEUgviABAINprJJzQ/s9wGPyvKfSs.jpg?ava=1",
                "name": "Руку мою держи",
                "autor": "ДИМОН Билан",
                "duration": "3:40",
                "file": "e282dee05f41e73948fff2d9b93dea13"
            },{
                "track": 4,
                "image": "http://piljarakami.com/wp-content/uploads/zelencuk/trupka-rozeva.jpg",
                "name": "Проверка",
                "autor": "Джиган",
                "duration": "2:48",
                "file": "9c39e8f876b7bfe54270f1f2fc8e1acf"
            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <a class="dowload" href="' + mediaPath + value.file + '" download></a> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            musicInfoImg = $('#musicImg'),
            musicTitle = $('#musicTitle'),
            musicAutor = $('#musicAutor'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
                $('#music-play i').removeClass('music-play-icon__play');
                $('#music-play i').addClass('music-play-icon__pause');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
                $('#music-play i').removeClass('music-play-icon__pause');
                $('#music-play i').addClass('music-play-icon__play');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),

            btnPlay = $('#music-play').on('click', function () {
                if (playing) {
                    audio.pause();
                    $('#music-play i').removeClass('music-play-icon__pause');
                    $('#music-play i').addClass('music-play-icon__play');
                } else {
                    audio.play();
                    $('#music-play i').removeClass('music-play-icon__play');
                    $('#music-play i').addClass('music-play-icon__pause');
                }
            }),

            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                musicTitle.text(tracks[id].name);
                musicAutor.text(tracks[id].autor);
                musicImg.src = tracks[id].image;
                npTitle.text(tracks[id].name);
                index = id;
                // audio.src = mediaPath + tracks[id].file + extension;
                audio.src = mediaPath + tracks[id].file;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        // extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});