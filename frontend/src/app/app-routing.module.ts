import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { ErrorComponent } from './components/error/error.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { InfoComponent } from './components/info/info.component';
import {KickplayerComponent} from "./components/kickplayer/kickplayer.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'onboarding'
  },
  {
    path: 'onboarding',
    component: OnboardingComponent
  },
  {
    path: 'onboarding/:gamekey',
    component: OnboardingComponent
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
    children: [
      {
        path: 'info',
        component: InfoComponent
      }, {
        path: 'kickplayer',
        component: KickplayerComponent
      }
    ]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
