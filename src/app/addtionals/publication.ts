import { PublicationStatus } from './publicationStatus';

export class Publication{
    id: number;
    publicationDate: string;
    title: string;
    author: string;
    description: string;
    tags: string[];
    imageURL: string;
    status: PublicationStatus;

    toUpdate?: boolean = false;
}