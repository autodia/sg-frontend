/**
 * @module Samplesheet
 */

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { Component, OnInit } from '@angular/core';
import { Samplesheet, EnumSequencer, EnumIEMFileVersion, EnumWorkflow, EnumApplication } from 'src/app/common/model/samplesheet';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/common/helpers/date-helper';
import { AuthService } from 'src/app/common/services/auth.service';
import { EnumAssay } from 'src/app/common/model/assay';
import { Sample } from 'src/app/common/model/sample';

@Component({
  selector: 'app-samplesheet',
  templateUrl: './samplesheet.component.html',
  styleUrls: ['./samplesheet.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class SamplesheetComponent implements OnInit {
  createSamples = false

  numberOfSamples = 1

  samplesheet = new Samplesheet()

  sequencerValues = EnumSequencer.values()
  IEMfileVersionValues = EnumIEMFileVersion.values()
  workflowValues = EnumWorkflow.values()
  applicationValues = EnumApplication.values()
  assayValues = EnumAssay.values()


  constructor(private authService: AuthService) { }

  ngOnInit() { }

  /**
   * Called when samplesheet general info has been filled in
   */
  next(formData: FormData) {
    this.samplesheet.author = this.authService.User
    this.samplesheet.created = new Date()

    // CHECK this.samplesheet.name IS UNIQUE

    // remove or samples depending on value numberOfSamples chosen
    this.samplesheet.samples = this.samplesheet.samples.slice(0, +this.numberOfSamples) // convert to integer as  we allow +NUM notation
    let numSamples = this.samplesheet.samples.length
    for (let index = 0; index < this.numberOfSamples - numSamples; index++) {
      this.samplesheet.samples.push(new Sample())
    }

    // changes view
    this.createSamples = true

    console.log("FormData: ", formData)
  }

  onBack(event) {
    console.log(event)
    this.createSamples = false
  }

  submit(formData: FormData) {
    // post new samplesheet here
    console.log("Form: ", formData)
    console.log("Samplesheet: ", this.samplesheet)
  }
}
