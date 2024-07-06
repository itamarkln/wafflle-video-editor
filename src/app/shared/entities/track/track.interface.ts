import { IScene } from "../scene/scene.interface";

export interface ITrack {
    id: string;
    title: string;
    scenes: IScene[];
}