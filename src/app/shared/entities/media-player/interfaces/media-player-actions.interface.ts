export interface IMediaPlayerActions {
    init(options?: object): void;
    play(): void;
    pause(): void;
    load(source: { src: string; type: string }[]): void;
    dispose(): void;
}