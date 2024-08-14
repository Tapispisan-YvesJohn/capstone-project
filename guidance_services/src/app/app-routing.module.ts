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
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-rbac', component: AdminRbacComponent, canActivate:[AuthGuard]  },
  { path: 'homepage', component: HomepageComponent, canActivate:[AuthGuard]  },
  { path: 'create-record', component: CreateRecordComponent, canActivate:[AuthGuard]  },
  { path: 'review-applicants', component: ReviewApplicantsComponent, canActivate:[AuthGuard]  },
  { path: 'application-status', component: ApplicationStatusComponent, canActivate:[AuthGuard]  },
  { path: 'history', component: HistoryComponent, canActivate:[AuthGuard]  },
  { path: 'view-record/:id', component: ViewRecordComponent, canActivate:[AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
