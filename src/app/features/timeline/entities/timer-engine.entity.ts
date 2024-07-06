export class TimerEngine {
    private startTime: number;
    private elapsed: number;
    private running: boolean;
    private totalDuration: number;
    private tickCallback: (elapsed: number) => void;
    private lastUpdateTime: number;
    private updateInterval: number;

    constructor() {
        this.startTime = 0;
        this.elapsed = 0;
        this.running = false;
        this.totalDuration = Infinity; // Default to a very large number
        this.tickCallback = () => { };
        this.lastUpdateTime = 0;
        this.updateInterval = 100; // Update every 100ms
    }

    start(totalDuration: number) {
        this.totalDuration = totalDuration * 1000; // Convert seconds to milliseconds
        if (!this.running) {
            this.running = true;
            this.startTime = performance.now() - this.elapsed;
            this.lastUpdateTime = this.startTime;
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
        this.totalDuration = Infinity;
        this.tickCallback(this.elapsed);
    }

    onTick(callback: (elapsed: number) => void) {
        this.tickCallback = callback;
    }


    private tick() {
        if (this.running) {
            const currentTime = performance.now();
            this.elapsed = currentTime - this.startTime;

            if (currentTime - this.lastUpdateTime >= this.updateInterval) {
                this.tickCallback(this.elapsed);
                this.lastUpdateTime = currentTime;
            }

            if (this.elapsed >= this.totalDuration) {
                this.pause();
                this.elapsed = this.totalDuration;
                this.tickCallback(this.elapsed); // Ensure the final state is updated
            } else {
                requestAnimationFrame(this.tick.bind(this));
            }
        }
    }
}