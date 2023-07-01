import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelUpCRRoutingModule } from './level-up-cr-routing.module';
import { LevelUpCrIndexComponent } from './level-up-cr-index/level-up-cr-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LevelUpCrIndexComponent
  ],
  imports: [
    CommonModule,
    LevelUpCRRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class LevelUpCRModule { }
