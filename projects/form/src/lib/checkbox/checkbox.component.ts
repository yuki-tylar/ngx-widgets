
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';


@Component({
  selector: 'ng2-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() id: string | number | null = null;
  @Input() label: string | null = null;
  @Input() checked: boolean = false;
  @Input() color: ColorPreset | string = '';

  @Output() changeState = new EventEmitter<ChangeStateEvent>();

  public _id: string;
  public _label: string;
  public _checked: boolean;
  public _color: string;

  private host: HTMLElement;
  private input: HTMLInputElement | null = null;

  constructor(
    _el: ElementRef,
  ) {
    this._id = createRandom();
    this._label = 'Please check me!';
    this._checked = false;
    this._color = '';

    this.host = _el.nativeElement;
  }

  ngOnInit(): void {
    if(this.id){ this._id = this.id.toString(); }
    if(this.label){ this._label = this.label; }
    if(this.checked === true){ this._checked = this.checked; }

    var c = this._color;
    switch(this.color){
      case 'blue' :  c = '#3D5AFE'; break;
      case 'green':  c = '#43A047'; break;
      case 'orange': c = '#EF6C00'; break;
      case 'black':  c = '#212121'; break;
      case '':       c = '#212121'; break;
      default:       c = this.color; break;
    }
    this._color = c;

    this.input = this.host.querySelector('input');
    if(this._checked){ this.check(false); }
    else{                this.uncheck(false); }
  }

  check(emit: boolean = true){
    this._checked = true;
    if(this.input){ this.input.checked = true; }
    if(emit){ this.changeState.emit({id: this._id, checked: true}); }
  }
  uncheck(emit: boolean = true){
    this._checked = false;
    if(this.input){ this.input.checked = false; }
    if(emit){ this.changeState.emit({id: this._id, checked: false}); }
  }

  onChange(e: Event){
    var target = e.target as HTMLInputElement;
    var isChecked = target.checked;
    if(isChecked){ this.check(); }
    else{ this.uncheck(); }
  }
}

function createRandom (){
  var strSet = 'abcdefghijklmnopqrstuvwxyz1234567890'; 
  var result = '';
  for(var i=0; i<8; i++){ result += strSet[Math.floor( Math.random() * strSet.length )]; }
  return result;
}

type ColorPreset = 'blue' | 'green' | 'orange' | 'black'
type ChangeStateEvent = {
  checked: boolean;
  id: string;
}