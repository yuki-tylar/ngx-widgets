import { Option, FormValidationName } from './types';

export interface ISelectController{
  id: string;
  value: string; /** selected value */
  index: number /** index of selected options */

  isValid: boolean;
  isInvalid: boolean;
  isSelected: boolean;
  isTouched: boolean;
  isDirty: boolean;

  errors: FormValidationName[];
  errorMessage: string;

  options: Option[]; 
}

export class SelectController implements ISelectController{
  private _id: string = '';

  private _options: Option[] = [];
  private _index: number = -1;

  private _validators: Map<FormValidationName, {isValid: boolean, message: string}> = new Map();
  private _isTouched: boolean = false;
  private _isDirty: boolean = false;

  get id(){ return this._id; }
  get options(){ return this._options; }

  get value(){ return this.isSelected? this._options[this.index].label : ''; }
  get index(){ return this._index; }

  get isSelected(){ return (this._index < 0)? false : true; }
  get isTouched(){ return this._isTouched; }
  get isDirty(){ return this._isDirty; }

  get isValid(){
    var isValid = true;
    this._validators.forEach(v=>{ if(!v.isValid){ isValid = false; } });
    return isValid;
  }
  get isInvalid(){ return this.isValid; }
  get errors(){
    var errors: FormValidationName[] = [];
    this._validators.forEach((v,k)=>{ if(v.isValid){ errors.push(k); } })
    return errors;
  }
  get errorMessage(){
    var message: string = '';
    var required = this._validators.get('required');
    if(required && !required.isValid){ message = required.message; }
    return message;
  }

  constructor(){}

  setId(id: string | number){ this._id = (typeof id == 'number')? id.toString() : id; }  
  setOptions(options: Option[]){ this._options = options; }
  setValidator(name: FormValidationName, val: string | boolean, defaultMessage: string){
    var message: string;
    if(typeof val == 'string'){ message = (val == 'true' || val == '')? defaultMessage : val;}
    else{ message = defaultMessage; }
    var isValid: boolean = false;
    
    if(name == 'required' && this._index >= 0){ isValid = true; }

    this._validators.set(name, {isValid: isValid, message: message})
  }

  select(o: number | Option): boolean{
    var index: number = -1;
    if(typeof o == 'number'){ index = o; }
    else{
      for(var i=0; i<this._options.length; i++){
        if(this._options[i].id == o.id){
          index = i;
          break;
        }
      }
    }
    if(index < 0){ return false; }

    this._index = index;  
    this.dirty();
    this.touch();  

    var required = this._validators.get('required');
    if(required){ required.isValid = true; }

    return true;
  }

  deselect(): boolean{
    this._index = -1;
    this.dirty();
    this.touch();

    var required = this._validators.get('required');
    if(required){ required.isValid = false; }
    
    return true;
  }

  touch(){ this._isTouched = true; }
  dirty(){ this._isDirty = true; }
  clean(){ this._isTouched = false; this._isDirty = false; }

}