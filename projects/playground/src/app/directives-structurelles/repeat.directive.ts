import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[repeat]',
})
export class RepeatDirective {
  @Input('repeat')
  times: number = 0;

  constructor(
    private templateRef: TemplateRef<any>,
    private containerRef: ViewContainerRef
  ) {}

  ngOnChanges() {
    this.containerRef.clear();

    if (this.times <= 0) {
      return;
    }

    for (let i = 0; i < this.times; i++) {
      this.containerRef.createEmbeddedView(this.templateRef, {
        $implicit: i + 1,
      });
    }
  }
}
