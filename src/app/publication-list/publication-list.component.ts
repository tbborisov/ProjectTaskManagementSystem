import { Component, OnInit } from '@angular/core';
import { Publication } from '../addtionals/publication';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicationListServiceService } from '../publication-list-service.service';
import { PublicationStatus } from '../addtionals/publicationStatus';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {

  publications: Publication[];

  publicationForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    imageURL: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
}); 

updatePublicationForm = new FormGroup({
  title: new FormControl('', Validators.required),
  author: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required),
  tags: new FormControl('', Validators.required),
  imageURL: new FormControl('', Validators.required),
  status: new FormControl('', Validators.required),
}); 

  constructor(private publicationListService: PublicationListServiceService) { }

  ngOnInit() {
    this.publicationListService.findAll().then( result => {
      this.publications = result});
  }

  onFormSubmit(): void {
    let newPublication = new Publication();
    newPublication.publicationDate = new Date().toLocaleString();
    newPublication.title = this.publicationForm.get('title').value;
    newPublication.author = this.publicationForm.get('author').value;
    newPublication.description = this.publicationForm.get('description').value;
    newPublication.tags = this.publicationForm.get('tags').value;
    newPublication.imageURL = this.publicationForm.get('imageURL').value;
    newPublication.status = this.publicationForm.get('status').value;

    this.publicationForm.reset();

    this.publicationListService.add(newPublication);
    this.publicationListService.findAll().then( result => {
      this.publications = result});
  } 
  
  deleteElemWithIndex(publication: Publication){
    this.publicationListService.remove(publication.id);
    this.publicationListService.findAll().then( result => {
      this.publications = result});
  }

  updateElemWIthIndex(publication: Publication){
    this.publicationListService.update(publication);
    this.publicationListService.findAll().then( result => {
      this.publications = result});
  }

  update(publication: Publication){
    publication.toUpdate = true;
  }

  onUpdateFormSubmit(publication: Publication){
    publication.publicationDate = new Date().toLocaleString();
    publication.title = this.updatePublicationForm.get('title').value;
    publication.author = this.updatePublicationForm.get('author').value;
    publication.description = this.updatePublicationForm.get('description').value;
    publication.tags = this.updatePublicationForm.get('tags').value;
    publication.imageURL = this.updatePublicationForm.get('imageURL').value;
    publication.status = this.updatePublicationForm.get('status').value;

    this.updateElemWIthIndex(publication);

    this.publicationForm.reset();
    publication.toUpdate = false;
  }
}
