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
import { WebsocketService } from "./websocket.service";
import { HttpService } from "./http.service";
import { ExampleService } from './services/example-service';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { MobileEstinationComponent } from './components/mobile-estination/mobile-estination.component';
import { DesktopEstinationComponent } from './components/desktop-estination/desktop-estination.component';
import { PlaygroundComponent } from './components/playground/playground.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        OnboardingComponent,
        ErrorComponent,
        GamecontrolComponent,
        GameComponent,
        MobileEstinationComponent,
        DesktopEstinationComponent,
        PlaygroundComponent,
        GamecontrolComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        WebsocketService,
        HttpService,
        ExampleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
