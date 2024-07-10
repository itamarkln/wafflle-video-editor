import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    private _isSidebarOpen: WritableSignal<boolean>;

    constructor() {
        this._isSidebarOpen = signal(false);
    }

    // getters
    public get isSidebarOpen(): boolean {
        return this._isSidebarOpen();
    }

    // setters
    public set isSidebarOpen(value: boolean) {
        this._isSidebarOpen.set(value);
    }
}
