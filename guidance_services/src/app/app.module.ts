import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessControlModule } from './access-control/access-control.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { ReviewApplicantsComponent } from './review-applicants/review-applicants.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    LoginComponent,
    LandingComponent,
    HomepageComponent,
    CreateRecordComponent,
    ReviewApplicantsComponent,
    ApplicationStatusComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    AccessControlModule ,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
