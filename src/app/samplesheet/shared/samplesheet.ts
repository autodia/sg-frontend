/**
 * @module Samplesheet
 */

import { Type } from 'class-transformer';
import { Project } from 'src/app/project/shared/project';
import { User } from 'src/app/common/model/user';
import { Sample } from 'src/app/common/model/sample';

export class Samplesheet {
    _id: string

    @Type(() => Date)
    created: Date

    // HVOR ANGIVER MAN DETTTE, i create?
    name: string

    @Type(() => User)
    author: User

    // må dette være null når man opretter samplesheet?
    @Type(() => Project)
    project: Project

    sequencer: EnumSequencer

    assay: String

    run: number

    // CHECK TYPE
    flowcell: string

    IEMFileVersion: EnumIEMFileVersion

    @Type(() => Date)
    date: Date

    workflow: EnumWorkflow

    application: EnumApplication

    description: string

    chemistry: string = "Default"

    reads: string = "151"

    umi: string = '0'

    adapterRead1: string

    adapterRead2: string

    @Type(() => Sample)
    samples: Sample[] = []

    public constructor(init?:Partial<Samplesheet>) {
        Object.assign(this, init);
    }
}

export enum EnumSequencer {
    'HiSeq D00140' = 10,
    'MiSeq M01115 - Zlatan' = 20,
    'MiSeq M03392 - Messi' = 30,
    'MiSeq M04671 - Ronaldo' = 40,
    'NextSeq NB501792 - Beyonce' = 50,
    'NextSeq NS500314 - Victoria' = 60,
    'NovaSeq A00281 - RH'= 70,
    'NovaSeq A00559 - KC' = 80
}

export namespace EnumSequencer {
    export function values() {
        let result = []
        let keys = Object.keys(EnumSequencer)
            .filter(f => !isNaN(Number(f)) && Number(f))
            .map(k => parseInt(k))

        keys.forEach(key => {
            result.push({ key: key, value: EnumSequencer[key] })
        });

        return result
    }
}

export enum EnumIEMFileVersion {
    "Default" = 4
}

export namespace EnumIEMFileVersion {

    export function values() {
        let result = []
        let keys = Object.keys(EnumIEMFileVersion)
            .filter(f => !isNaN(Number(f)) && Number(f))
            .map(k => parseInt(k))

        keys.forEach(key => {
            result.push({ key: key, value: EnumIEMFileVersion[key] })
        });

        return result
    }
}

export enum EnumWorkflow {
    'GenerateFASTQ' = 10
}

export namespace EnumWorkflow {

    export function values() {
        let result = []
        let keys = Object.keys(EnumWorkflow)
            .filter(f => !isNaN(Number(f)) && Number(f))
            .map(k => parseInt(k))

        keys.forEach(key => {
            result.push({ key: key, value: EnumWorkflow[key] })
        });

        return result
    }
}

export enum EnumApplication {
    'NextSeq FASTQ Only' = 10,
    'NovaSeq FASTQ Only' = 20
}

export namespace EnumApplication {

    export function values() {
        let result = []
        let keys = Object.keys(EnumApplication)
            .filter(f => !isNaN(Number(f)) && Number(f))
            .map(k => parseInt(k))

        keys.forEach(key => {
            result.push({ key: key, value: EnumApplication[key] })
        });

        return result
    }
}
