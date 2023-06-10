import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'card',
  template: `
    <article>
      <header>{{ title }}</header>
      <ng-content></ng-content>
      <ng-content select="footer"></ng-content>
    </article>
  `,
})
export class CardComponent {
  @Input()
  title = '';
}
