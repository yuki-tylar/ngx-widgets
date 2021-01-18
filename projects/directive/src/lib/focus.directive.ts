import { Directive, ElementRef, Input, Inject } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective {

  @Input() focus: boolean = false;

  constructor( @Inject(ElementRef) private el: ElementRef) {}

  protected ngOnChanges(){
    if(this.focus){ this.el.nativeElement.focus(); }
  }
}
