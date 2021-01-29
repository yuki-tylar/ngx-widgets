import { FormValidationName } from './types';
import { IFormItemController, FormItemController } from './form-item-controller';

export interface ICheckboxController extends IFormItemController{
  value: boolean;
}

export class CheckboxController extends FormItemController implements ICheckboxController{
  private _isChecked: boolean = false;

  get value(){ return this._isChecked; }

  constructor(){ super(); }

  setValidator(name: FormValidationName, val: string | boolean, defaultMessage: string){
    let message: string;
    if(typeof val == 'string'){ message = (val == 'true' || val == '')? defaultMessage : val;}
    else{ message = defaultMessage; }

    const isValid: boolean = (name == 'required' && this._isChecked)? true : false;

    this.validators.set(name, {isValid: isValid, message: message})
  }


  check(makeDirty: boolean = true){ this.toggle(true, makeDirty); }
  uncheck(makeDirty: boolean = true){ this.toggle(false, makeDirty); }

  toggle(isChecked: boolean | null = null, makeDirty: boolean = true){
    if(isChecked === null){ isChecked = !isChecked; }
    this._isChecked = isChecked;

    const required = this.validators.get('required');
    if(required){ required.isValid = isChecked; }
    
    if(makeDirty){
      this.dirty();
      this.touch();
    }
  }
}
