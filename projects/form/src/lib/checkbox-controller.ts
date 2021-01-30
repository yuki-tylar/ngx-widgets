import { FormValidationName } from './types';
import { IFormItemController, FormItemController } from './form-item-controller';

export interface ICheckboxController extends IFormItemController{
  value: boolean;
}

export class CheckboxController extends FormItemController implements ICheckboxController{
  private _isChecked: boolean = false;

  get value(){ return this._isChecked; }

  constructor(){ super(); }

  check(makeDirty: boolean = true){ this.toggle(true, makeDirty); }
  uncheck(makeDirty: boolean = true){ this.toggle(false, makeDirty); }

  toggle(isChecked: boolean | null = null, makeDirty: boolean = true){
    if(isChecked === null){ isChecked = !isChecked; }
    this._isChecked = isChecked;

    this.validate();
    
    if(makeDirty){
      this.dirty();
      this.touch();
    }
  }

  validate(){
    const required = this.validators.get('required');
    if(required){ required.isValid = this._isChecked; }
  }
}
