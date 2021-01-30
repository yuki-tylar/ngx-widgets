import { IOption, Option, FormValidationName } from './types';
import { IFormItemController, FormItemController } from './form-item-controller';

export interface ISelectController extends IFormItemController{
  isSelected: boolean;
  options: IOption[];

  index: number /** index of selected option | first index of selected options for multiple selection */
  value: string; /** label of selected option | first label of selected options for multiple selection */
}

export class SelectController extends FormItemController implements ISelectController{

  protected _options: Option[] = [];
  
  get options(){ return this._options; }    /** get all options */

  /** get index of first option which is selected */
  get index(){
    let idx = -1;
    for(var i=0; i<this._options.length; i++){ if(this._options[i].isSelected){ idx = i; break; } }
    return idx;
  }

  /** get value of first option which is selected */
  get value(){ return this.isSelected? this._options[this.index].label : ''; }

  get isSelected(){ return (this.index < 0)? false : true; }


  constructor(){ super(); }

  setOption(option: IOption){ this._options = [new Option(option)]; }
  setOptions(options: IOption[]){ 
    this._options = [];
    options.forEach(o=>{ this._options.push(new Option(o)); })
  }

  protected getOption(o: number | IOption): Option{
    let theOption: Option;
    if(typeof o == 'number'){ theOption = this._options[o]; }
    else{
      let theIndex = 0;
      for(let i=0; i<this._options.length; i++){
        if(this._options[i].id == o.id){ theIndex = i; break; }
      }
      theOption = this._options[theIndex]
    }
    return theOption;
  }

   select(o: number | IOption): boolean{
     let theOption = this.getOption(o);
     if(!theOption){ return false; }
     else if(theOption.isSelected){
       this.touch();
       return false;
     }
     else{
       this.deselect();
       theOption.select();
       this.dirty();
       this.touch();
       this.validate();
       return true;
     }
  }

  deselect(o?: number | IOption): boolean{
    if(o === undefined){ this._options.forEach(o=>{ o.deselect(); })}
    else{
      const theOption = this.getOption(o);
      theOption.deselect();
    }
    
    this.dirty();
    this.touch();
    this.validate();

    return true;
  }

  validate(){
    const required = this.validators.get('required');
    if(required){ required.isValid = (this.index >=0 )? true : false; }
  }
}