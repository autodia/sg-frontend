/**
 * @module Samplesheet
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesheetComponent } from './samplesheet/samplesheet.component';

import {
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { SamplesheetRoutingModule } from './samplesheet-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SamplesheetListComponent } from './samplesheet-list/samplesheet-list.component';
import { SampleListComponent } from './sample-list/sample-list.component';


@NgModule({
  declarations: [SamplesheetComponent, SampleListComponent, SamplesheetListComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SamplesheetRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SamplesheetModule { }
