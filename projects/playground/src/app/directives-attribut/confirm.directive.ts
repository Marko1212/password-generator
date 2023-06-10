import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'a[confirm]',
})
export class ConfirmDirective {
  @Input('confirm-message')
  message = 'Etes-vous sur ?';

  @HostListener('click')
  onClickLink() {
    return window.confirm(this.message);
  }
}
