import '@videojs/plugin-concat';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'videojs-playlist';
import { MediaPlayer } from './media-player.abstract.entity';
import { Playlist, PlaylistItem } from './interfaces/playlist.interface';

export class VjsMediaPlayer extends MediaPlayer {
    protected player!: VideoJsPlayer;
    protected options!: VideoJsPlayerOptions;
    protected playlistMetadata!: Playlist;

    constructor() {
        super();
    }

    private get _defaultOptions(): VideoJsPlayerOptions {
        return {
            controls: true,
            autoplay: false,
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

    private get _playlist() {
        return (this.player as any).playlist;
    }

    public get currentTime(): number {
        return this.player?.currentTime() || 0;
    }

    //#region events
    public onPlayed(playCallback: () => void) {
        this.player.on('play', playCallback);
    }

    public onPaused(pauseCallback: () => void) {
        this.player.on('pause', pauseCallback);
    }

    public onEnded(endedCallback: () => void) {
        this.player.on('ended', endedCallback);
    }

    public onTimeUpdated(timeupdateCallback: (currentTime: number) => void) {
        this.player.on('timeupdate', () => timeupdateCallback(this._calculateCurrentTime()));
    }
    //#endregion

    //#region actions
    public init(target: HTMLVideoElement | HTMLAudioElement, options?: VideoJsPlayerOptions, readyCallback?: () => void): void {
        try {
            if (!this.player) {
                const playerOptions = Object.assign(this._defaultOptions, options);
                this.player = videojs(target, playerOptions, () => {
                    console.log('onPlayerReady', this);
                    readyCallback && readyCallback();
                });
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public load(playlist: Playlist): void {
        try {
            if (this.player) {
                console.log('loading src');

                if (playlist.length == 1) {
                    this.player.src(playlist[0].sources);
                } else {
                    this.playlistMetadata = playlist;
                    (this.player as any).playlist(playlist);
                    (this.player as any).playlist.autoadvance(0);
                }
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

    public seek(time: number): void {
        try {
            if (this.player) {
                if (this.player.currentTime() !== time) {
                    this.seekToTime(time);
                }
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public reset(): void {
        try {
            if (this.player) {
                if (this.playlistMetadata === undefined) {
                    this.setCurrentTime(0);
                    this.player.pause();
                } else {
                    this._setPlaylistCurrentItem(0);
                    this.setCurrentTime(0);
                    this.player.one('loadeddata', () => {
                        this.player.pause(); // Pause immediately after setting the current item
                    });
                }
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public setCurrentTime(currentTime: number): void {
        try {
            if (this.player) {
                this.player.currentTime(currentTime);
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

    //#region playlist plugin
    /**
     * player will start playing after setting currentItem
     * @param index The index of the current item in the playlist
     */
    private _setPlaylistCurrentItem(index: number) {
        (this.player as any).playlist.currentItem(index);
    }

    private _getPlaylistCurrentItem(): number {
        return (this.player as any).playlist.currentItem();
    }

    private _getPlaylistCurrentItemDuration(index: number) {
        return this.playlistMetadata[index].duration || 0;
    }
    //#endregion

    //#region helpers
    private seekToTime(time: number) {
        // meaning only one media source is loaded
        if (this.playlistMetadata === undefined) {
            this.player.currentTime(time);
            this.player.pause();
        } else {
            let accumulatedDuration = 0;
            for (let i = 0; i < this.playlistMetadata.length; i++) {
                const seekToNextItem = time < accumulatedDuration + this._getPlaylistCurrentItemDuration(i);
                if (seekToNextItem) {
                    this._setPlaylistCurrentItem(i);
                    this.setCurrentTime(time - accumulatedDuration);
                    this.player.one('loadeddata', () => {
                        this.player.pause(); // Pause immediately after setting the current item
                    });
                    break;
                }
                accumulatedDuration += this._getPlaylistCurrentItemDuration(i);
            }
        }
    }

    private _calculateTotalDuration(): number {
        return this.playlistMetadata.reduce((acc: number, item: PlaylistItem, i: number) => {
            return acc + this._getPlaylistCurrentItemDuration(i);
        }, 0);
    }

    private _calculateCurrentTime(): number {
        // meaning only one media source is loaded
        if (this.playlistMetadata === undefined) {
            return this.player.currentTime();
        } else {
            const currentIndex = this._getPlaylistCurrentItem();
            const previousDurations = this.playlistMetadata.slice(0, currentIndex).reduce((acc: number, item: PlaylistItem) => {
                return acc + (item.duration || 0);
            }, 0);
            return previousDurations + this.player.currentTime();
        }
    }
    //#endregion
}
