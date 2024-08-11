import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AdminRbacComponent } from './access-control/admin-rbac/admin-rbac.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { ReviewApplicantsComponent } from './review-applicants/review-applicants.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { HistoryComponent } from './history/history.component';
import { ViewRecordComponent } from './view-record/view-record.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-rbac', component: AdminRbacComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'create-record', component: CreateRecordComponent },
  { path: 'review-applicants', component: ReviewApplicantsComponent },
  { path: 'application-status', component: ApplicationStatusComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'view-record/:id', component: ViewRecordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
