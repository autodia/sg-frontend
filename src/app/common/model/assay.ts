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

    public constructor(init?: Partial<Assay>) {
        Object.assign(this, init);
    }
}


export enum EnumAssay {
    'Easyseq NGS, Reverse Complement PCR' = 10,
    'IDT-ILMN TruSeq DNA UD Indexes' = 20,
    'NEBNext Direct (TruSeq Nano DNA)' = 30,
    'Nextera DNA Flex' = 40,
    'Nextera XT v2' = 50,
    'SureSelect XT HS' = 60,
    'TruSeq Combinatorial Dual Indexes (TruSeq HT)' = 70,
    'TruSeq DNA Single Indexes' = 80,
    'TruSeq DNA LT Single Indexes' = 90,
    'TruSight Oncology 500 Kit Unique Dual Indexes' = 100,
    'TruSight Rapid Capture' = 110
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