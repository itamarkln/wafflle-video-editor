import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'videojs-concat';
import { MediaPlayer } from './media-player.abstract.entity';

export class VjsMediaPlayer extends MediaPlayer {
    private _targetElement: HTMLVideoElement | HTMLAudioElement;
    protected player: VideoJsPlayer;
    protected options: VideoJsPlayerOptions;

    constructor(targetElement: HTMLVideoElement | HTMLAudioElement) {
        super();
        this._targetElement = targetElement;
    }

    private get _defaultOptions(): VideoJsPlayerOptions {
        return {
            controls: true,
            autoplay: true,
            type: 'video/mp4',
            controlBar: {
                playToggle: true,
                volumePanel: {
                    inline: false
                },
                currentTimeDisplay: true,
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                progressControl: true,
                fullscreenToggle: true
            }
        };
    }

    public init(options?: VideoJsPlayerOptions): void {
        try {
            if (!this.player) {
                const playerOptions = Object.assign(this._defaultOptions, options);
                this.player = videojs(this._targetElement, playerOptions, () => {
                    console.log('onPlayerReady', this);
                });
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public play(): void {
        try {
            if (this.player) {
                this.player.play();
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public pause(): void {
        try {
            if (this.player) {
                this.player.pause();
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public load(source: { src: string; type: string }[]): void {
        try {
            (this.player as any).concat(source);
        } catch (error) {
            this.handleError(error);
        }
    }

    public dispose(): void {
        try {
            if (this.player) {
                this.player.dispose();
            }
        } catch (error) {
            this.handleError(error);
        }
    }
}
