import { FormItemController, IFormItemController } from "./form-item-controller";

export interface ITextfieldController extends IFormItemController{
  value: string;
}

export class TextfieldController extends FormItemController implements ITextfieldController{

  private _value: string = '';

  get value(){ return this._value; }

  constructor(){ super(); }

  clearValue(){ this._value = ''; }
  setValue(s?: string){ this._value = (s && s.length>0)? s : ''; }

  validate(){
    const required = this.validators.get('required');
    if(required){ required.isValid = this.value? true : false; }

    const email = this.validators.get('email');
    if(email){
      const regEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      email.isValid = this.value.toLowerCase().match(regEmail)? true : false;
    }

    const min = this.validators.get('min');
    if(min){ min.isValid = (min.value && this.value.length >= min.value)? true : false; }

    const max = this.validators.get('max');
    if(max){ max.isValid = (max.value && this.value.length <= max.value)? true : false; }
  }
}
