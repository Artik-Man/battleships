import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattlefieldComponent } from './components/battlefield';
import { DescriptionComponent } from './components/description';
import { GameGeneratorService } from './services/gameGenerator';
import { GameService } from './services/gameState';
import { Bot } from './services/bot';


@NgModule({
  declarations: [
    AppComponent,
    BattlefieldComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameGeneratorService,
    GameService,
    Bot
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
