
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormService, ColorPreset } from '../form.service';

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

  @Output() change = new EventEmitter<ChangeStateEvent>();

  public _id: string;
  public _label: string = 'Please check me!';
  public _checked: boolean = false;
  public _color: string = '';

  private host: HTMLElement;
  private input: HTMLInputElement | null = null;

  constructor(
    _el: ElementRef,
    private _f: FormService,
  ) {
    this._id = _f.createId();
    this.host = _el.nativeElement;
  }

  ngOnInit(): void {
    if(this.id){ this._id = this.id.toString(); }
    if(this.label){ this._label = this.label; }
    if(this.checked === true){ this._checked = this.checked; }
    this._color = this._f.setColor(this.color);

    this.input = this.host.querySelector('input');
    if(this._checked){ this.check(false); }
    else{                this.uncheck(false); }
  }

  check(emit: boolean = true){
    this._checked = true;
    if(this.input){ this.input.checked = true; }
    if(emit){ this.change.emit({id: this._id, checked: true}); }
  }
  uncheck(emit: boolean = true){
    this._checked = false;
    if(this.input){ this.input.checked = false; }
    if(emit){ this.change.emit({id: this._id, checked: false}); }
  }

  onChange(e: Event){
    var target = e.target as HTMLInputElement;
    var isChecked = target.checked;
    if(isChecked){ this.check(); }
    else{ this.uncheck(); }
  }
}

type ChangeStateEvent = {
  checked: boolean;
  id: string;
}