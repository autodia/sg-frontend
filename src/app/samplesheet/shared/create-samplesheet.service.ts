import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface SamplesheetInput {
  project: string,
  fullname: string
  sequencer: string,
  run: string,
  flowcell: string,
  iemfileversion: string,
  sequancer: string,
  date: string,
  workflow: string,
  application: string,
  assay: string,
  description: string,
  chemistry: string,
  reads: string,
  umi: string,
  adapter1: string,
  adapter2: string
}

@Injectable({
  providedIn: 'root',
})
export class CreateSamplesheetService extends Mutation {
  document = gql`
    mutation createSamplesheet($samplesheetInput: SamplesheetInput!) {
      createSamplesheet(samplesheetInput: $samplesheetInput) {
        _id,
        name
      }
    }`
    ;
}