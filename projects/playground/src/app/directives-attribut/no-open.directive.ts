import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'a[no-open]',
})
export class NoOpenDirective {
  @HostListener('click')
  onClickLink() {
    // event.preventDefault();
    return false;
  }
}
