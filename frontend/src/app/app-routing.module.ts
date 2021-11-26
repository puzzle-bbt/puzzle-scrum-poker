import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'onboarding' },
    { path: 'onboarding', component: OnboardingComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: 'error' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}