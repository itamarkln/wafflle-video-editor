import { VideoJsPlayer } from "video.js";
import { IMediaPlayerActions } from "./interfaces/media-player-actions.interface";
import { Playlist } from "./interfaces/playlist.interface";

export abstract class MediaPlayer implements IMediaPlayerActions {
    protected player!: VideoJsPlayer; // add | for more player types
    protected options!: object;

    abstract init(target: HTMLVideoElement | HTMLAudioElement, options?: object, readyCallback?: () => void): void;
    abstract load(playlist: Playlist): void;
    abstract play(): void;
    abstract pause(): void;
    abstract dispose(): void;

    protected handleError(error: any): void {
        console.error('MediaPlayer error:', error);
    }
}
