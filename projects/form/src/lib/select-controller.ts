import { Option, FormValidationName } from './types';
import { IFormItemController, FormItemController } from './form-item-controller';

export interface ISelectController extends IFormItemController{
  index: number /** index of selected options */
  value: string;
  isSelected: boolean;
  options: Option[]; 
}

export class SelectController extends FormItemController implements ISelectController{

  private _options: Option[] = [];
  private _index: number = -1;

  get options(){ return this._options; }
  get value(){ return this.isSelected? this._options[this.index].label : ''; }
  get index(){ return this._index; }

  get isSelected(){ return (this._index < 0)? false : true; }

  constructor(){
    super()
  }

  setOptions(options: Option[]){ this._options = options; }

  setValidator(name: FormValidationName, val: string | boolean, defaultMessage: string){
    let message: string;
    if(typeof val == 'string'){ message = (val == 'true' || val == '')? defaultMessage : val;}
    else{ message = defaultMessage; }
   
    let isValid: boolean = false; 
    if(name == 'required' && this._index >= 0){ isValid = true; }

    this._validators.set(name, {isValid: isValid, message: message})
  }


  select(o: number | Option): boolean{
    let index: number = -1;
    if(typeof o == 'number'){ index = o; }
    else{
      for(let i=0; i<this._options.length; i++){
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

    const required = this._validators.get('required');
    if(required){ required.isValid = true; }

    return true;
  }

  deselect(): boolean{
    this._index = -1;
    this.dirty();
    this.touch();

    const required = this._validators.get('required');
    if(required){ required.isValid = false; }
    
    return true;
  }
}