export interface IMediaPlayerActions {
    init(options?: object): void;
    load(source: string): void;
    play(): void;
    pause(): void;
    dispose(): void;
}