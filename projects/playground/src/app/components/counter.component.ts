import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    Valeur :
    <strong>{{ count }}</strong>
    <button (click)="onClickIncrementCounter()">+ incrémenter</button>
    <button (click)="onClickDecrementCounter()">- décrémenter</button>
  `,
})
export class CounterComponent {
  @Input('initial-value')
  count = 0;
  @Input()
  step = 1;

  onClickIncrementCounter() {
    this.count += this.step;
  }

  onClickDecrementCounter() {
    this.count -= this.step;
  }
}
