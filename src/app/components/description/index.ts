import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: 'template.html',
  styleUrls: ['./styles.less']
})

export class DescriptionComponent {
  public show = true;
  @Output() play = new EventEmitter();

  constructor() { }

  public start() {
    this.show = false;
    this.play.emit();
  }

}
