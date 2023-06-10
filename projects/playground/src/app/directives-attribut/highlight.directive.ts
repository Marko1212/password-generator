import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: 'p[highlight]',
  exportAs: 'hl',
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor')
  color = 'transparent';

  @Output('color-change')
  colorChangeEvent = new EventEmitter<string>();

  @Input('background-color')
  backgroundColor = 'yellow';

  @Input('base-color')
  baseColor = 'transparent';

  ngOnInit() {
    this.color = this.baseColor;
  }

  /*   constructor(elementRef: ElementRef<HTMLElement>) {
    this.backgroundColor =
      elementRef.nativeElement.getAttribute('background-color') || 'yellow';
  } */

  /*  constructor(private elementRef: ElementRef<HTMLElement>) { */
  /*     elementRef.nativeElement.addEventListener('mouseenter', ($event) => {
      this.onMouseEnter($event.clientX);
    }); */
  /*  } */

  @HostListener('mouseenter')
  onMouseEnter() {
    this.color = this.backgroundColor;
    this.colorChangeEvent.emit(this.color);
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.color = this.baseColor;
    this.colorChangeEvent.emit(this.color);
  }
}
