import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, HostListener, ElementRef, SimpleChanges } from '@angular/core';
import { FormService } from '../form.service';
import { SelectController } from '../select-controller';
import { Option, ColorPreset } from '../types';
import { slideinAnimation } from "../animations";

@Component({
  selector: 'ngx-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss'],
  animations: [slideinAnimation]
})
export class SelectboxComponent implements OnInit {

  @Input() id?: string | number;
  @Input() options: Option[] = [];
  @Input() selected?: number | Option;
  @Input() color: ColorPreset = 'default';
  @Input() darkmode: 'disable' | 'auto' | 'enable' = 'disable';

  @Input() required: string | boolean = '';

  @Output() change = new EventEmitter<ChangeSelectEvent>();
  @Output() getController = new EventEmitter<SelectController>();

  public _idxOptionFocused: number = 0;
  public _expanded: boolean = false;
  public _stateSelection: string = 'slideoutVertical';
  public _controller: SelectController = new SelectController();

  private host: HTMLElement;
  private isMobile: boolean;

  get darkClass(){ return (this.darkmode == 'enable')? 'dark' : (this.darkmode=="auto")? 'dark-auto' : ''; }
  get withValidatorClass(){ return this._controller.isValidationOn? 'with-validator' : ""; }
  get colorClass(){ return this.color == 'default'? '' : this.color; }

  constructor(
    private _f: FormService,
    private _changeDetector: ChangeDetectorRef,
    _el: ElementRef,
  ) {
    this.host = _el.nativeElement;
    this.isMobile = (window.innerWidth < 768)? true : false;
  }

  ngOnChanges(e: SimpleChanges){
    // if(e.color && e.color.currentValue != e.color.previousValue){}
    if(e.selected && e.selected.currentValue != e.selected.previousValue){
      if(typeof this.selected == 'number' || this.selected){ this._controller.select(this.selected); }
      else{ this._controller.deselect(); }
    }
  }

  ngOnInit(): void {
    this.changeStateSelection();

    this._controller.setId(this.id);
    this._controller.setOptions(this.options);

    if(this.selected){ this._controller.select(this.selected);}
    if(this.required !== false && this.required !== 'false'){ this._controller.setValidator('required', this.required, 'Required!'); }
  
    this.emitController();
  }

  @HostListener('window: resize') windowResize(){
    const isMobile = (window.innerWidth < 768)? true : false;
    if(this.isMobile != isMobile){ this.isMobile = isMobile; }

    this.changeStateSelection();
  }
  
  isOptionFocused(i: number){ return (this._idxOptionFocused === i); }

  onClickOutside(e: Event){
    const target = e.target as HTMLElement;
    if(!this.host.contains(target) && this._expanded){ 
      this.toggleExpand('hide', true);
      this._controller.touch();
    }
  }

  toggleExpand(state: 'hide' | 'show' | null = null, immediately: boolean = false){
    this._expanded = (state == 'hide')? false : (state == 'show')? true : !this._expanded;
    if(this._expanded){ this._controller.touch(); }
    else{ this._controller.dirty(); }

    this.changeStateSelection(immediately);

    if(this._expanded){
      this._idxOptionFocused = -1;
      setTimeout(()=>{
        this._idxOptionFocused = (this._controller.index < 0)? 0 : this._controller.index;
        this._changeDetector.markForCheck();
      });  
    }
  }

  changeStateSelection(closeImmediately: boolean = false){
    let s = '';
    if(this._expanded){ s = 'slidein';}
    else if(this.isMobile){ s = 'slideoutVertical';  }
    else{                   s = 'slideoutHorizontal'; }
  
    const time = (closeImmediately)? 0 : 250;
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
    const isCloseImmediately = (this._idxOptionFocused == idx)? true : false;
    this._controller.select(idx);
    this._idxOptionFocused = idx;

    this.toggleExpand('hide', isCloseImmediately);
    if(emit){ this.change.emit({id: this._controller.id, index: this._controller.index}) }
  }

  emitController(){ this.getController.emit(this._controller); }
}


export type ChangeSelectEvent = {
  id: string;
  index: number;
}

