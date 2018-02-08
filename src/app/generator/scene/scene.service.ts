import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GameFactory } from '../../shared/factories/game-factory';
import { SceneFactory } from '../../shared/factories/scene-factory';
import { LinkFactory } from '../../shared/factories/link-factory';

import { GameModel } from '../../shared/models/game-model';
import { SceneModel } from '../../shared/models/scene-model';
import { LinkModel } from '../../shared/models/link-model';

@Injectable()
export class SceneService {
  private gf: GameFactory;
  private sf: SceneFactory;
  private lf: LinkFactory;

  private initialSceneId: number;
  private scenes: SceneModel[];

  constructor() {
    this.gf = new GameFactory();
    this.sf = new SceneFactory();
    this.lf = new LinkFactory();

    this.initialSceneId = -1;
    this.scenes = new Array<SceneModel>();
  }

  getInitialSceneId(): number {
    return this.initialSceneId;
  }

  setInitialSceneId(newInitialSceneId: number): void {
    this.initialSceneId = newInitialSceneId;
  }

  getScenes(): SceneModel[] {
    return this.scenes;
  }

  getNumberOfScenes(): number {
    return this.scenes.length;
  }

  addScene(
    header: string,
    description: string,
    imageData: string,
    links: LinkModel[]
  ): void {
    this.addNewScene(
      header,
      description,
      imageData,
      links);

    // Initialize the Initial Scene ID if one isn't set yet.
    if (this.initialSceneId < 0) {
      this.initialSceneId = Math.min(...this.scenes.map(s => s.id));
    }
  }

  editScene(
    sceneId: number,
    header: string,
    description: string,
    imageData: string,
    links: LinkModel[]
  ): void {
    const sceneToEdit = this.scenes.filter(scene => scene.id === sceneId)[0];

    if (sceneToEdit) {
      sceneToEdit.header = header;
      sceneToEdit.description = description;
      sceneToEdit.imageData = imageData;
      sceneToEdit.links = links;
    }
  }

  deleteScene(sceneId: number): void {
    const sceneToDelete = this.scenes.filter(scene => scene.id === sceneId)[0];

    if (sceneToDelete) {
      // Remove any Links that previously linked to this scene.
      const scenesToUpdate = this.scenes.filter(scene => {
        return scene.links.some(link => {
          return link.toSceneId === sceneToDelete.id;
        });
      });

      for (const sceneToUpdate of scenesToUpdate) {
        sceneToUpdate.links = sceneToUpdate.links.filter(link => {
          return link.toSceneId !== sceneToDelete.id;
        });
      }

      const sceneToDeleteIndex = this.scenes.indexOf(sceneToDelete);

      this.scenes.splice(sceneToDeleteIndex, 1);
    }
  }

  exportGame(): string {
    const game = this.gf.createGame(
      this.initialSceneId,
      this.scenes);
    const gameJsonString = JSON.stringify(game);

    return this.b64EncodeWithUnicode(gameJsonString);
  }

  importGame(
    gameImportString: string
  ): void {
    const gameString = this.b64DecodeWithUnicode(gameImportString);

    const game = JSON.parse(gameString) as GameModel;

    this.initialSceneId = game.initialSceneId;
    this.scenes = game.scenes;
  }

  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings/30106551
  private b64EncodeWithUnicode(str): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }

  private b64DecodeWithUnicode(str): string {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  private addNewScene(
    header: string,
    description: string,
    imageData: string,
    links: LinkModel[]
  ): void {
    // Find next Scene ID.
    let currentMax = 0;

    if (this.scenes.length > 0) {
      currentMax = Math.max(...(this.scenes.map(scene => scene.id)));
    }

    this.scenes.push(
      this.sf.createScene(
        currentMax + 1,
        header,
        description,
        imageData,
        links
      )
    );
  }
}
