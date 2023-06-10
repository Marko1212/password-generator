import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[set-classes]',
})
export class SetClassesDirective {
  @Input('set-classes')
  cssClasses: { [key: string]: boolean } = {};

  @Input()
  exemple: string = '';

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
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
  }
}
