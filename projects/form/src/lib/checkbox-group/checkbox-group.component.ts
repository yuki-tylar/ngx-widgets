import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IOption, ColorPreset, ChangeSelectMultiEvent, ChangeCheckboxEvent } from '../types';
import { SelectMultiController } from '../select-multi-controller';

@Component({
  selector: 'ngx-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit {

  @Input() id?: string | number;
  @Input() options: IOption[] = [];
  @Input() color: ColorPreset = 'default';
  @Input() darkmode: 'disable' | 'auto' | 'enable' = 'disable';
  @Input() layout: 'block' | 'inline' | 'col2' = 'inline';

  @Input() required?: string | boolean;
  @Input() min?: string | number;
  @Input() max?: string | number;

  @Input() requiredError?: string;
  @Input() minError?: string;
  @Input() maxError?: string;


  @Output() changeValue = new EventEmitter<ChangeSelectMultiEvent>();
  @Output() getController = new EventEmitter<SelectMultiController>();

  public _controller: SelectMultiController = new SelectMultiController();

  constructor() { }

  get layoutClass(){
    let c: string[] = [this.layout];
    if(this._controller && this._controller.isValidationOn){ c.push('with-validator'); }
    return c;
  }

  ngOnChanges(e: SimpleChanges){

  }

  ngOnInit(): void {
    this._controller.setId(this.id);
    this._controller.setOptions(this.options);

    this._controller.setValidatorRequired({required: this.required, message: this.requiredError})    
    this._controller.setValidatorMin({min: this.min, message: this.minError});
    this._controller.setValidatorMax({max: this.max, message: this.maxError});
    this._controller.validate();
    this.emitController();
  }

  onChange(e: ChangeCheckboxEvent, i: number){
    if(e.value){ this._controller.select(i); }
    else{ this._controller.deselect(i); }

    this.changeValue.emit({
      id: this._controller.id,
      indexes: this._controller.indexes,
      selected: this._controller.selected,
    })
  }



  emitController(){ this.getController.emit(this._controller); }
}
