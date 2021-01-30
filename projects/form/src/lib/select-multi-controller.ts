import { IOption, Option, FormValidationName } from './types';
import { ISelectController, SelectController } from './select-controller';

export interface ISelectMultiController extends ISelectController {
  indexes: number[];
  values: string[];
  selected: IOption[];
}

export class SelectMultiController extends SelectController implements ISelectMultiController {
  
  get indexes(){
    var result: number[] = [];
    this.options.forEach((o,i)=>{ if(o.isSelected){ result.push(i); }})
    return result;
  }

  get values(){
    var result: string[] = [];
    this.options.forEach((o,i)=>{ if(o.isSelected){ result.push(o.label); }});
    return result;
  }

  get selected(){
    var result: IOption[] = [];
    this.indexes.forEach(i=>{ result.push(this._options[i]); });
    return result;
  }

  constructor(){ super(); }

  toggle(o: number | IOption): boolean{
    const theOption = this.getOption(o);
    let result: boolean;
    if(!theOption){ return false; }
    else if(theOption.isSelected){ result = this.deselect(o); }
    else{ result = this.select(o); }
    return result;
  }


  select(o: number | IOption): boolean{
    const theOption = this.getOption(o);
    if(!theOption){ return false; }

    else if(!theOption.isSelected){
      theOption.select();
      this.touch();
      this.dirty();
      this.validate();
      return true;
    }else{
      this.touch();
      return false;
    }
  }

  selectAll(): boolean{
    this._options.forEach(o=>{ o.select(); });
    this.dirty();
    this.touch();
    this.validate();

    return true;
  }

  deselectAll(): boolean{
    this.deselect();
    return true;
  }

  validate(){
    const required = this.validators.get('required');
    if(required){ required.isValid = (this.index >=0 )? true : false; }

    const min = this.validators.get('min');
    if(min){ min.isValid = (!min.value || this.indexes.length >= min.value)? true : false; }

    const max = this.validators.get('max');
    if(max){ max.isValid = (!max.value|| this.indexes.length <= max.value)? true : false; }
  }
}
