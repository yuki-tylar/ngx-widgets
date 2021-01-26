
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ColorPreset } from '../types';
import { CheckboxController } from '../checkbox-controller';

@Component({
  selector: 'ngx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() id?: string | number;
  @Input() label?: string;
  @Input() checked?: boolean | string;
  @Input() color: ColorPreset = 'default';
  @Input() darkmode: 'disable' | 'auto' | 'enable' = 'disable';

  @Input() required: string | boolean = '';

  @Output() change = new EventEmitter<ChangeCheckboxEvent>();
  @Output() getController = new EventEmitter<any>();

  public _label: string = 'Please check me!';
  public _controller: CheckboxController = new CheckboxController();

  constructor() {}

  get darkClass(){ return (this.darkmode == 'enable')? 'dark' : (this.darkmode=="auto")? 'dark-auto' : ''; }
  get withValidatorClass(){ return this._controller.isValidationOn? 'with-validator' : ""; }
  get checkedClass(){ return (this._controller.value)? 'checked' : ''; }
  get colorClass(){ 
    const c = [];
    if(this._controller.value){ c.push('active'); }
    if(this.color !== 'default'){ c.push(this.color); }
    return c.join(' ');
  }

  ngOnChanges(e: SimpleChanges){
    if(e.checked && e.checked.currentValue !== e.checked.previousValue){
      if(this.checked === undefined || this.checked === false || this.checked === 'false'){ this._controller.uncheck(false); }
      else{ this._controller.check(false); }
    }
  }

  ngOnInit(): void {
    this._controller.setId(this.id);
    if(this.label){ this._label = this.label; }

    if(this.checked === undefined || this.checked === false || this.checked === 'false'){ this._controller.uncheck(false); }
    else{ this._controller.check(false); }

    if(this.required !== false && this.required !== 'false'){ this._controller.setValidator('required', this.required, 'Required!'); }
  }

  onChange(e: Event){
    const isChecked = (e.target as HTMLInputElement).checked;
    if(isChecked){ this._controller.check(); }
    else{ this._controller.uncheck(); }

    this.change.emit({id: this._controller.id, value: this._controller.value});
  }

  emitController(){ this.getController.emit(this._controller); }
}

export type ChangeCheckboxEvent = {
  value: boolean;
  id: string;
}