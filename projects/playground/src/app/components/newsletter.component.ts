import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'newsletter',
  template: `
    <h3>{{ title }}</h3>
    <input #email type="email" placeholder="{{ placeholder }}" />
    <ng-content select="p"></ng-content>
    <button (click)="onConfirmNewsletter(email.value)">{{ buttonText }}</button>
    <ng-content select="h2"></ng-content>
    <ng-content></ng-content>
  `,
})
export class NewsLetterComponent {
  @Input()
  title = 'Inscription Newsletter';
  @Input('button-text')
  buttonText = "Je m'inscris";
  @Input()
  placeholder = 'Adresse email';

  @Output('confirm')
  onConfirmEvent = new EventEmitter<string>();

  onConfirmNewsletter(email: string) {
    console.log("Depuis l'intérieur du composant, click sur le bouton");
    this.onConfirmEvent.emit(email);
  }
}
