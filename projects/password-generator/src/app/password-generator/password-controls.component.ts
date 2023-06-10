import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'password-controls',
  template: `<button id="generate" (click)="onClickGenerate()">Générer</button>
    <button id="copy" (click)="onClickCopy()" *ngIf="password">
      Copier le mot de passe
    </button>
    <strong id="copy-message" *ngIf="hasBeenCopied"
      >Le mot de passe a été copié</strong
    >`,
  styles: [],
})
export class PasswordControlsComponent {
  @Input()
  password?: string;

  hasBeenCopied: boolean = false;

  @Output('generate')
  onGenerateEvent = new EventEmitter();

  onClickGenerate() {
    this.onGenerateEvent.emit();
  }

  onClickCopy() {
    if (!this.password) {
      return;
    }

    navigator.clipboard.writeText(this.password);
    this.hasBeenCopied = true;
    return;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['password']) {
      return;
    }
    this.hasBeenCopied = false;
  }
}
