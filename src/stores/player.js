import { Howl } from 'howler';
import { defineStore } from 'pinia';
import formatTime from '../includes/helper';

export default defineStore('player', {
    state: () => ({
        current_song: {},
        sound: {},
        duration: '00:00',
        seek: '00:00',
        playerProgress: '0%'
    }),
    actions: {
        async playSong(song) {
            if (this.sound instanceof Howl) {
                this.sound.unload();
            }
            this.current_song = song;

            this.sound = new Howl({
                src: [song.url],
                html5: true
            });

            this.sound.play();

            this.sound.on('play', () => {
                requestAnimationFrame(this.progress);
            });
        },
        async toggleAudio() {
            if (!this.sound.playing) {
                return;
            }

            if (this.sound.playing()) {
                this.sound.pause()
            } else {
                this.sound.play()
            }
        },
        progress() {
            this.seek = formatTime(this.sound.seek());
            this.duration = formatTime(this.sound.duration());

            this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`;

            if (this.sound.playing()) {
                requestAnimationFrame(this.progress);
            }
        },
        updateSeek(event) {
            if (!this.sound.playing) {
                return;
            }

            const { x, width } = event.currentTarget.getBoundingClientRect();

            const clickX = event.clientX - x;
            const persentage = clickX / width;
            const second = this.sound.duration() * persentage;

            this.sound.seek(second);
            this.sound.once('seek', this.progress);
        }
    },
    getters: {
        playing: (state) => {
            if (state.sound.playing) {
                return state.sound.playing()
            }

            return false;
        }
    }
});