import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface SampleInput {
  samplesheet: string,
  lane: string,
  number: string,
  type: string,
  library: string,
  index1: string,
  index2: string,
  description: string
}

@Injectable({
  providedIn: 'root',
})
export class CreateSamplesService extends Mutation {
  document = gql`
    mutation createSamples($samplesInput: SamplesInput!) {
      createSamples(samplesInput: $samplesInput) {
        _id
      }
    }`
    ;
}