import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationComponent } from './publication/publication.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PublicationListServiceService } from './publication-list-service.service';

@NgModule({
  declarations: [
    AppComponent,
    PublicationListComponent,
    PublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [PublicationListServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
