import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'input[force-lower]',
})
export class ForceLowerDirective {
  @Input()
  @HostBinding()
  value: string = '';

  ngOnInit() {
    this.value = this.value.toLowerCase();
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.value = value.toLowerCase();
  }

  /* ngOnChanges(changes: SimpleChanges) {
     if (!changes['cssClasses']) {
      return;
    }

    const cles = Object.keys(this.cssClasses);
    cles.forEach((className) => {
      if (this.cssClasses[className]) {
        this.elementRef.nativeElement.classList.add(className);
        return;
      }
      this.elementRef.nativeElement.classList.remove(className);
    }); 
  }*/
}
