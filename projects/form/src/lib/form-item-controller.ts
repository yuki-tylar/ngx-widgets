import { FormValidationName } from './types';

export interface IFormItemController{
  id: string;
  isValid: boolean;
  isInvalid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  isValidationOn: boolean

  errors: FormValidationName[];
  errorMessage: string;
}

export class FormItemController implements IFormItemController{
  private _id: string = '';
  private _isTouched: boolean = false;
  private _isDirty: boolean = false;
  protected _validators: Map<FormValidationName, {isValid: boolean, message: string}> = new Map();

  get id(){ return this._id; }
  get isTouched(){ return this._isTouched; }
  get isDirty(){ return this._isDirty; }
  get isValidationOn(){return (this._validators.size > 0); }

  get isValid(){
    let isValid = true;
    this._validators.forEach(v=>{ if(!v.isValid){ isValid = false; } });
    return isValid;
  }
  get isInvalid(){ return this.isValid; }
  get errors(){
    const errors: FormValidationName[] = [];
    this._validators.forEach((v,k)=>{ if(v.isValid){ errors.push(k); } })
    return errors;
  }
  get errorMessage(){
    let message: string = '';
    const required = this._validators.get('required');
    if(required && !required.isValid){ message = required.message; }
    return message;
  }

  constructor(){}

  setId(id?: string | number){
    if(!id){  
      const strSet = 'abcdefghijklmnopqrstuvwxyz1234567890'; 
      id = '';
      for(let i=0; i<8; i++){ id += strSet[Math.floor( Math.random() * strSet.length )]; }
    }
    this._id = (typeof id == 'number')? id.toString() : id; 
  }

  touch(){ this._isTouched = true; }
  dirty(){ this._isDirty = true; }
  clean(){ this._isTouched = false; this._isDirty = false; }
}
