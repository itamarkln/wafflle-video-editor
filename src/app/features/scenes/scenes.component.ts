import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, viewChildren } from '@angular/core';
import { IScene } from '@app/shared/entities/scene/scene.interface';
import { Subscription } from 'rxjs';
import { ScenePreviewComponent } from './components/scene-preview/scene-preview.component';

import { SceneComponent } from './components/scene/scene.component';
import { ScenesService } from './services/scenes.service';

@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [DragDropModule, SceneComponent],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.scss'
})
export class ScenesComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];
  public scenes: IScene[];
  public playingScene?: IScene;
  @ViewChild(ScenePreviewComponent) public scenePreview!: ElementRef<ScenePreviewComponent>;


  constructor(private scenesService: ScenesService) {
    this._subscriptions = [];
    this.scenes = [];
    this.playingScene = undefined;
  }

  ngOnInit(): void {
    this._handleSubscriptions();
  }

  private _handleSubscriptions(): void {
    this._subscribeScenes();
  }

  private _subscribeScenes(): void {
    this._subscriptions.push(
      this.scenesService.getScenes().subscribe((scenes: IScene[]) => {
        this.scenes = scenes;
      })
    );
  }

  handleScenePlay(scene: IScene) {
    this.playingScene = scene;
    this.scenePreview.nativeElement.play();
  }

  handleScenePause(scene: IScene) {
    if (this.playingScene === scene) {
      this.playingScene = undefined;
      this.scenePreview.nativeElement.pause();
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
