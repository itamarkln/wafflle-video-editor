import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScenePreviewComponent } from './components/scene-preview/scene-preview.component';
import { IScene } from './components/scene/interfaces/scene.interface';
import { SceneComponent } from './components/scene/scene.component';
import { ScenesService } from './services/scenes.service';

@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [SceneComponent, ScenePreviewComponent],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.scss'
})
export class ScenesComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];
  public scenes: IScene[];

  constructor(private scenesService: ScenesService) {
    this._subscriptions = [];
    this.scenes = [];
  }

  ngOnInit(): void {
    this.handleSubscriptions();
  }

  private handleSubscriptions(): void {
    this.subscribeScenes();
  }

  private subscribeScenes(): void {
    this._subscriptions.push(
      this.scenesService.getScenes().subscribe((scenes: IScene[]) => {
        this.scenes = scenes;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
