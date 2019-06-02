import { Injectable } from '@angular/core';
import { Publication } from './addtionals/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationListServiceService {

  static nextId = 1;

  private publications: Publication[] = [];

  constructor() {}

  add(p: Publication): Promise<Publication> {
    p.id = PublicationListServiceService.nextId++;
    this.publications.push(p);
    return Promise.resolve(p);
  }

  findAll() {
    return Promise.resolve(this.publications);
  }

  update(p: Publication): Promise<Publication>{
    const index = this.publications.findIndex(pr => pr.id === p.id);
    if (index < 0) {
      return Promise.reject(new Error(`Publication not found Id: ${p.id}`));
    }
    this.publications[index] = p;
    return Promise.resolve(p);
  }

  remove(publicationId: number): Promise<Publication>{
    const index = this.publications.findIndex(pr => pr.id === publicationId);
    if (index < 0) {
      return Promise.reject(new Error(`Publication not found Id: ${publicationId}`));
    }
    const p = this.publications.splice(index, 1);
    return Promise.resolve(p[0]);
  }
}
