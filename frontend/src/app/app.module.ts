import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { ErrorComponent } from './components/error/error.component';
import {PlayerListComponent} from "./components/playerlist/playerlist.component";
import { HttpClientModule } from '@angular/common/http';
import { GamecontrolComponent } from "./components/gamecontrol/gamecontrol.component";
import { HttpService } from "./http.service";
import { ExampleService } from './services/example-service';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './components/playground/playground.component';
import { InfoComponent } from './components/info/info.component';
import { DesktopEstimationComponent } from './components/desktop-estimation/desktop-estimation.component';
import { MobileEstimationComponent } from './components/mobile-estimation/mobile-estimation.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        OnboardingComponent,
        ErrorComponent,
        PlayerListComponent,
        GamecontrolComponent,
        PlaygroundComponent,
        InfoComponent,
        DesktopEstimationComponent,
        MobileEstimationComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        HttpService,
        ExampleService
    ],
    exports: [CommonModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
