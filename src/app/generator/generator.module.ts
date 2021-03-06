import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatGridListModule, MatListModule, MatSelectModule } from '@angular/material';

import { ClipboardModule } from 'ngx-clipboard';

import { SceneService } from './scene/scene.service';

import { GeneratorComponent } from './generator.component';
import { SceneComponent } from './scene/scene.component';
import { AddSceneComponent } from './add-scene/add-scene.component';
import { LinkComponent } from './link/link.component';
import { FlagComponent } from './flag/flag.component';
import { ImportExportGameComponent } from './import-export-game/import-export-game.component';
import { ExportGameDialogComponent } from './export-game-dialog/export-game-dialog.component';
import { ImportGameDialogComponent } from './import-game-dialog/import-game-dialog.component';
import { AddEditLinkDialogComponent } from './add-edit-link-dialog/add-edit-link-dialog.component';
import { AddEditSceneDialogComponent } from './add-edit-scene-dialog/add-edit-scene-dialog.component';
import { AddFlagDialogComponent } from './add-flag-dialog/add-flag-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    ClipboardModule
  ],
  declarations: [
    GeneratorComponent,
    SceneComponent,
    AddSceneComponent,
    ImportExportGameComponent,
    ExportGameDialogComponent,
    ImportGameDialogComponent,
    AddEditLinkDialogComponent,
    AddEditSceneDialogComponent,
    LinkComponent,
    FlagComponent,
    AddFlagDialogComponent
  ],
  entryComponents: [
    ExportGameDialogComponent,
    ImportGameDialogComponent,
    AddEditSceneDialogComponent,
    AddEditLinkDialogComponent,
    AddFlagDialogComponent
  ],
  providers: [
    SceneService
  ],
  exports: [
    GeneratorComponent
  ]
})
export class GeneratorModule { }
