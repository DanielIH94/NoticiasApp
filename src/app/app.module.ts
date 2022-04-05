import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NoteCreatorComponent } from './components/note-creator/note-creator.component';
import { MatButtonModule } from '@angular/material/button';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatListModule } from '@angular/material/list';
import { SideNavItemComponent } from './components/side-nav-item/side-nav-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { NoteComponent } from './components/note/note.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommentComponent } from './components/comment/comment.component';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { ResponseComponent } from './components/response/response.component';
import { MatChipsModule } from '@angular/material/chips';

import localEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
registerLocaleData(localEs, 'es')

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ErrorComponent } from './components/error/error.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NoteCreatorComponent,
    SideNavComponent,
    SideNavItemComponent,
    NoteComponent,
    CommentComponent,
    ResponseComponent,
    HomeComponent,
    LoginComponent,
    RegisterDialogComponent,
    FileUploadComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,
    HttpClientModule,
    ApolloModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:8080/graphql'
          })
        }
      },
      deps: [HttpLink]
    },
    {
      provide: LOCALE_ID, useValue: 'es'
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
