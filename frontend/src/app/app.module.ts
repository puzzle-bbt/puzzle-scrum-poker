import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {OnboardingComponent} from './components/onboarding/onboarding.component';
import {ErrorComponent} from './components/error/error.component';
import {PlayerListComponent} from './components/playerlist/playerlist.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {PlaygroundComponent} from './components/playground/playground.component';
import {InfoComponent} from './components/info/info.component';
import {DesktopEstimationComponent} from './components/desktop-estimation/desktop-estimation.component';
import {MobileEstimationComponent} from './components/mobile-estimation/mobile-estimation.component';
import {KickplayerComponent} from './components/kickplayer/kickplayer.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    OnboardingComponent,
    ErrorComponent,
    PlayerListComponent,
    PlaygroundComponent,
    InfoComponent,
    DesktopEstimationComponent,
    MobileEstimationComponent,
    KickplayerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  exports: [CommonModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
