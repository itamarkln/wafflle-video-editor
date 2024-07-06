export interface IMediaPlayerActions {
    init(options?: object): void;
    load(source: { src: string; type: string }[]): void;
    play(): void;
    pause(): void;
    dispose(): void;
}