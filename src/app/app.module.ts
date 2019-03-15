import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattlefieldComponent } from './components/battlefield';
import GameGeneratorService from './services/gameGenerator';
import GameStateService from './services/gameState';
import Bot from './services/bot';


@NgModule({
  declarations: [
    AppComponent,
    BattlefieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameGeneratorService,
    GameStateService,
    Bot
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
