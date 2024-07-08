import { VideoJsPlayer } from "video.js";
import { IMediaPlayerActions } from "./interfaces/media-player-actions.interface";

export abstract class MediaPlayer implements IMediaPlayerActions {
    protected player!: VideoJsPlayer; // add | for more player types
    protected options!: object;

    abstract init(options?: object): void;
    abstract load(source: string): void;
    abstract play(): void;
    abstract pause(): void;
    abstract dispose(): void;

    protected handleError(error: any): void {
        console.error('MediaPlayer error:', error);
    }
}
