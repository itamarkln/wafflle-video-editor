export class TimerEngine {
    private startTime: number;
    private elapsed: number;
    private running: boolean;
    private tickCallback: (elapsed: number) => void;

    constructor() {
        this.startTime = 0;
        this.elapsed = 0;
        this.running = false;
        this.tickCallback = () => { };
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.startTime = performance.now() - this.elapsed;
            this.tick();
        }
    }

    pause() {
        if (this.running) {
            this.running = false;
            this.elapsed = performance.now() - this.startTime;
        }
    }

    reset() {
        this.running = false;
        this.elapsed = 0;
    }

    onTick(callback: (elapsed: number) => void) {
        this.tickCallback = callback;
    }

    private tick() {
        if (this.running) {
            this.elapsed = performance.now() - this.startTime;
            this.tickCallback(this.elapsed);
            requestAnimationFrame(() => this.tick());
        }
    }
}