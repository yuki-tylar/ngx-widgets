import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<Event>();

  private host: HTMLElement;
  constructor(_el: ElementRef) { this.host = _el.nativeElement; }

  @HostListener('window:click', ['$event']) windowClick(e: Event){
    const target = e.target as HTMLElement;
    if(!this.host.contains(target)){ this.clickOutside.emit(e); }
  }
}
