import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AccessControlModule } from './access-control/access-control.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HomepageComponent } from './homepage/homepage.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { ReviewApplicantsComponent } from './review-applicants/review-applicants.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { HistoryComponent } from './history/history.component';
import { IndividualInventoryRecordFormComponent } from './individual-inventory-record-form/individual-inventory-record-form.component';
import { ViewRecordComponent } from './view-record/view-record.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    HomepageComponent,
    CreateRecordComponent,
    ReviewApplicantsComponent,
    ApplicationStatusComponent,
    HistoryComponent,
    IndividualInventoryRecordFormComponent,
    ViewRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    AccessControlModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
