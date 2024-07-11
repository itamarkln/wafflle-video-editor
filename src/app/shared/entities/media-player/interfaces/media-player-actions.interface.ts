import { Playlist } from "./playlist.interface";

export interface IMediaPlayerActions {
    init(options?: object, readyCallback?: () => void): void;
    load(playlist: Playlist): void;
    play(): void;
    pause(): void;
    dispose(): void;
}