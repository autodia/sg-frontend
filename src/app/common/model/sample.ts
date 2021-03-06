/**
 * @module Samplesheet
 */

 export class Sample {
     _id: string

     samplesheet: number // REQUIRED

     // CHECK TYPE
     lane: string

     // CHECK TYPE
     number: string // REQUIRED

     // CHECK TYPE
     type: string // REQUIRED

     // CHECK TYPE
     library: string // REQUIRED

     // CHECK TYPE
     index1: string // REQUIRED

     // CHECK TYPE
     index2: string

     description: string

    public constructor(init?:Partial<Sample>) {
        Object.assign(this, init);
    }
 }
