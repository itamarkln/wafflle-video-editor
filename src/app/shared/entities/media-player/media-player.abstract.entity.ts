import { VideoJsPlayer } from "video.js";
import { IMediaPlayerActions } from "./interfaces/media-player-actions.interface";

export abstract class MediaPlayer implements IMediaPlayerActions {
    protected player: VideoJsPlayer; // add | for more player types
    protected options: object;

    abstract init(options?: object): void;
    abstract play(): void;
    abstract pause(): void;
    abstract load(sources: { src: string; type: string }[]): void;
    abstract dispose(): void;

    constructor(options: object = {}) {
        this.options = options;
    }

    protected handleError(error: any): void {
        console.error('MediaPlayer error:', error);
    }
}
