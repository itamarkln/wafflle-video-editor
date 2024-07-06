import { ISceneSource } from "./scene-source.interface";

export interface IScene {
    id: string;
    title: string;
    sources: ISceneSource[];
}