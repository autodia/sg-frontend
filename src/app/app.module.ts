import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppErrorHandler } from './common/errors/app-error-handler';
import { AuthService } from './common/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NoAccessComponent } from './common/component/no-access/no-access.component';
import { NotFoundComponent } from './common/component/not-found/not-found.component';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './common/component/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



import {
  MatButtonModule,
} from '@angular/material';

import { SamplesheetModule } from './samplesheet/samplesheet.module';
import { ProjectModule } from './project/project.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { GraphQLModule } from './graphql.module';


@NgModule({
  declarations: [
    AppComponent,
    NoAccessComponent,
    NotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SamplesheetModule,
    ProjectModule,
    // LoginModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    GraphQLModule
  ],
  providers: [
    AuthService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
