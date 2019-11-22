/**
 * @module Authentication
 */

export class Profile {

    id: number;

    username: string;

    display_name: string;

    title: string;

    telephone: string;

    email: string;

    start_dato: Date;

    slut_dato: Date;

    er_akademiker: boolean;
    er_admin: boolean;
    er_bioanalytiker: boolean;
    er_bioinformatiker: boolean;
    er_sekretaer: boolean;
    er_studerende: boolean;

}