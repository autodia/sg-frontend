/**
 * @module Samplesheet
 */

import { Type } from 'class-transformer';
import { User } from './user';
import { Project } from './project';
import { Sample } from './sample';

export class Samplesheet {
    id: number

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

    reads1: number

    reads2: number

    adapterRead1: string

    adapterRead2: string

    @Type(() => Sample)
    samples: Sample[] = []
}

export enum EnumSequencer {
    NextSeqBeyonce = 10,
    NextSeqVictoria = 20,
    HiSeq = 30,
    NovaSeq = 40
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
    GenerateFASTQ = 10
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
    NextSeqFASTQOnly = 10,
    NovaSeqFASTQOnly = 20
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
