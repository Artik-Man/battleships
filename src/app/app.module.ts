import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattlefieldComponent } from './components/battlefield';
import GameGeneratorService from './services/gameGenerator';
import GameStateService from './services/gameState';


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
    GameStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
