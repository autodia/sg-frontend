import { SingleIndex } from './indexes/single_index';
import { Type } from 'class-transformer';

/**
 * @module Samplesheet
 */

export class Assay {
    _id: string

    // CHECK TYPE
    assay: EnumAssay // REQUIRED

    name_shortcut: string

    // CHECK TYPE
    adapter: string

    // CHECK TYPE
    adapter1: string

    // CHECK TYPE
    adapter2: string

    @Type(() => SingleIndex)
    singleIndex: SingleIndex

    public constructor(init?:Partial<Assay>) {
        Object.assign(this, init);
    }
}

export enum EnumAssay {
    NexteraDNAFlex = 10,
    TruSeqDNASingleIndexes = 20,
    TruSightRapidCapture = 30,
    IDT_ILMNTruSeqDNAUDIndexes = 40
}

export namespace EnumAssay {

    export function values() {
        let result = []
        let keys = Object.keys(EnumAssay)
            .filter(f => !isNaN(Number(f)) && Number(f))
            .map(k => parseInt(k))

        keys.forEach(key => {
            result.push({ key: key, value: EnumAssay[key] })
        });

        return result
    }
}