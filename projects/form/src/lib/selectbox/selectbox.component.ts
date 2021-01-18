import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { FormService } from '../form.service';
import { state, trigger, animate, transition, style } from '@angular/animations';


const animation = trigger('slidein', [
  state('slideoutHorizontal', style({display: 'none'})),
  state('slideoutVertical', style({display: 'none'})),
  state('slidein', style({display: 'block'})),
  transition('slideoutHorizontal=>slidein', [
    style({display: 'block', opacity: 0, transform: 'translateX(-5em)'}),
    animate('200ms ease', style({opacity: 1, transform: 'translate(0)'})),
  ]),
  transition('slideoutVertical=>slidein', [
    style({display: 'block', opacity: 0, transform: 'translateY(-2em)'}),
    animate('200ms ease', style({opacity: 1, transform: 'translate(0)'})),
  ]),
  transition('slidein=>slideoutHorizontal', animate('200ms ease', style({ opacity: 0, transform: 'translateX(-5em)'}))),
  transition('slidein=>slideoutVertical', animate('200ms ease', style({ opacity: 0, transform: 'translateY(-2em)'}))),
]);

@Component({
  selector: 'ng2-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss'],
  animations: [animation]
})
export class SelectboxComponent implements OnInit {

  @Input() id: string | number | null = null;
  @Input() options: Option[] = [];
  @Input() selected: number | null = null;
  @Input() color: ColorPreset | string = '';

  @Output() change = new EventEmitter<ChangeStateEvent>();

  public _id: string;
  public _options: Option[] = []
  public _selected: boolean = false;
  public _idxOptionSelected: number = 0;
  public _idxOptionFocused: number = 0;
  public _color: string = '';
  public _expanded: boolean = false;
  public _stateSelection: string = 'slideoutVertical';

  private host: HTMLElement;
  private isMobile: boolean;
  constructor(
    private _f: FormService,
    private _changeDetector: ChangeDetectorRef,
    _el: ElementRef,
  ) {
    this._id = _f.createId(); 
    this.host = _el.nativeElement;
    this.isMobile = (window.innerWidth < 768)? true : false;
  }

  ngOnInit(): void {
    if(this.id){ this._id = this.id.toString(); }
    if(this.options){ this._options = this.options; }
    this._color = this._f.setColor(this.color);

    if(this.selected !== null){
      this._selected = true;
      this._idxOptionSelected = this.selected;
    }
    this.changeStateSelection();
  }

  @HostListener('window:click', ['$event']) windowClick(e: Event){
    var target = e.target as HTMLElement;
    if(!this.host.contains(target)){ this.toggleExpand('hide'); }
  }

  @HostListener('window: resize') windowResize(){
    var isMobile = (window.innerWidth < 768)? true : false;
    if(this.isMobile != isMobile){ this.isMobile = isMobile; }

    this.changeStateSelection();
  }
  
  isOptionFocused(i: number){ return (this._idxOptionFocused === i); }

  toggleExpand(state: 'hide' | 'show' | null = null, immediately: boolean = false){
    if(state == 'hide'){      this._expanded = false; }
    else if(state == 'show'){ this._expanded = true; }
    else{                     this._expanded = !this._expanded; }

    this.changeStateSelection(immediately);

    if(this._expanded){
      this._idxOptionFocused = -1;
      setTimeout(()=>{
        this._idxOptionFocused = this._idxOptionSelected;
        this._changeDetector.markForCheck();
      });  
    }
  }

  changeStateSelection(closeImmediately: boolean = false){
    var s = '';
    if(this._expanded){ s = 'slidein';}
    else if(this.isMobile){ s = 'slideoutVertical';  }
    else{                   s = 'slideoutHorizontal'; }
  
    var time = (closeImmediately)? 0 : 250;
    setTimeout(()=>{
      this._stateSelection = s;
      this._changeDetector.markForCheck();
    }, time)
  }

  focusNextOption(e: KeyboardEvent){
    switch(e.key){
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this._idxOptionFocused = this._idxOptionFocused + this.options.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault();
        this._idxOptionFocused ++;
        break;
    }
    this._idxOptionFocused = this._idxOptionFocused % this.options.length;
  }

  select(idx: number, emit: boolean = true){
    var isCloseImmediately = (this._idxOptionFocused == idx)? true : false;
    this._selected = true;
    this._idxOptionSelected = idx;
    this._idxOptionFocused = idx;
    this.toggleExpand('hide', isCloseImmediately);

    if(emit){ this.change.emit({id: this._id, selected: this._options[idx]}); }
  }
}

type ColorPreset = 'blue' | 'green' | 'orange' | 'black'
type Option = {id: string | number, label: string};

type ChangeStateEvent = {
  selected: Option;
  id: string;
}