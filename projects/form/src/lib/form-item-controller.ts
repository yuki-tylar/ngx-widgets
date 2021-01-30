import { FormValidationName } from './types';

export interface IFormItemController{
  id: string;
  isTouched: boolean;
  isDirty: boolean;

  isValid: boolean;
  isInvalid: boolean;
  isValidationOn: boolean

  errors: FormValidationName[];
  errorMessage: string;
}

export class FormItemController implements IFormItemController{
  private _id: string = '';
  private _isTouched: boolean = false;
  private _isDirty: boolean = false;
  private _validators: Map<FormValidationName, {isValid: boolean, message: string, value?: number}> = new Map();

  get id(){ return this._id; }
  get isTouched(){ return this._isTouched; }
  get isDirty(){ return this._isDirty; }
  
  get isValidationOn(){return (this._validators.size > 0); }

  get validators(){ return this._validators; }

  get isValid(){
    let isValid = true;
    this._validators.forEach(v=>{ if(!v.isValid){ isValid = false; } });
    return isValid;
  }
  get isInvalid(){ return !this.isValid; }

  get errors(){
    const errors: FormValidationName[] = [];
    this._validators.forEach((v,k)=>{ if(!v.isValid){ errors.push(k); } })
    return errors;
  }
  get errorMessage(){
    let message: string = '';
    const errors = this.errors;
    if(errors.length > 0){
      const error = this._validators.get(errors[0]);
      if(error){ message = error.message; }
    }
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

  setValidatorRequired(o: {required?: string | boolean, message?: string}): boolean{
    if(o.required === undefined || o.required === false || o.required === 'false'){ return false; }
    
    if(!o.message || o.message.length == 0){ o.message = 'Required!'; }
    this.validators.set('required', {isValid: false, message: o.message});
    return true;
  }

  setValidatorMin(o: {min?: string | number, message?: string}): boolean{
    const val = Number(o.min);
    if(isNaN(val) || val <= 0){ return false; }

    if(!o.message || o.message.length == 0){ o.message = 'Please select more than {}'; }
    const message = o.message.replace('{}', val.toString());

    this.validators.set('min', {isValid: false, message: message, value: val});
    return true;
  }

  setValidatorMax(o: {max?: string | number, message?: string}): boolean{
    const val = Number(o.max);
    if(isNaN(val) || val <= 0){ return false; }

    if(!o.message || o.message.length == 0){ o.message = 'Please select less than {}'; }
    const message = o.message.replace('{}', val.toString());

    this.validators.set('max', {isValid: false, message: message, value: val});
    return true;
  }
}
