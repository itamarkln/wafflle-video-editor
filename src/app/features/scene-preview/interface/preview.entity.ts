import { IScene } from "@shared/entities/scene/scene.interface";

export interface IPreview {
    id: string;
    scenes: IScene[];
}