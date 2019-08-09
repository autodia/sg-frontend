/**
 * @module Samplesheet
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SamplesheetComponent } from './samplesheet/samplesheet.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SamplesheetListComponent } from './samplesheet-list/samplesheet-list.component';

const routes: Routes = [
  {
    path: 'samplesheet',
    component: SamplesheetComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'samplesheet-list',
    component: SamplesheetListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SamplesheetRoutingModule { }
