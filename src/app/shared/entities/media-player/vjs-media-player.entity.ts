import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import '@videojs/plugin-concat';
import 'videojs-playlist';
import { MediaPlayer } from './media-player.abstract.entity';

export class VjsMediaPlayer extends MediaPlayer {
    protected player!: VideoJsPlayer;
    protected options!: VideoJsPlayerOptions;

    constructor() {
        super();
    }

    private get _defaultOptions(): VideoJsPlayerOptions {
        return {
            controls: true,
            autoplay: true,
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

    public init(target: HTMLVideoElement | HTMLAudioElement, options?: VideoJsPlayerOptions): void {
        try {
            if (!this.player) {
                const playerOptions = Object.assign(this._defaultOptions, options);
                this.player = videojs(target, playerOptions, () => {
                    console.log('onPlayerReady', this);
                });
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public onPlay(playCallback: () => void) {
        this.player.on('play', playCallback);
    }

    public onPause(pauseCallback: () => void) {
        this.player.on('pause', pauseCallback);
    }

    public onEnded(endedCallback: () => void) {
        this.player.on('ended', endedCallback);
    }

    //#region actions
    public load(source: videojs.Tech.SourceObject[]): void {
        try {
            if (this.player) {
                console.log('loading src');

                if (source.length == 1) {
                    this.player.src(source[0].src);
                    return;
                }

                (this.player as any).playlist(source);
                (this.player as any).playlist.autoadvance(0);

                // const manifests = source.map(source => ({ url: source.src, mimeType: source.type }));
                // (this.player as any).concat({
                //     manifests,
                //     targetVerticalResolution: 720,
                //     callback: (err: any, result: any) => {
                //         if (err) {
                //             throw err;
                //         }
                //         console.log(result);
                //         this.player.src({
                //             src: `data:application/vnd.videojs.vhs+json,${JSON.stringify(
                //                 result.manifestObject
                //             )}`,
                //             type: "application/vnd.videojs.vhs+json",
                //         });
                //     },
                // });
            }
        } catch (error) {
            console.log('Entered load.func [catch]');
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

    public dispose(): void {
        try {
            if (this.player) {
                this.player.dispose();
            }
        } catch (error) {
            this.handleError(error);
        }
    }
    //#endregion
}
