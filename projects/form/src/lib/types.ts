export type FormValidationName = 'required' | 'email' | 'min' | 'max';
export type ColorPreset = 'blue' | 'green' | 'orange' | 'grey-dark' | 'yellow' | 'default' | 'custom';
export type DarkMode = 'disable' | 'auto' | 'enable';

export type ChangeCheckboxEvent = {
  value: boolean;
  id: string;
}

export type ChangeSelectEvent = {
  id: string;
  index: number;
  selected: IOption;
}

export type ChangeSelectMultiEvent = {
  id: string;
  indexes: number[];
  selected: IOption[];
}


export type IOption = { id: string | number, label: string, isSelected?: boolean, isRequired?: boolean }
export class Option {
  private _id: string = '';
  private _label: string = '';
  private _isSelected: boolean = false;
  private _isRequired: boolean = false;

  get id(){ return this._id; }
  get label(){ return this._label; }
  get isSelected(){ return this._isSelected; }
  get isRequired(){ return this._isRequired; }

  get isValid(){ return this.isSelected? true : this.isRequired? false : true; }
  get isInvalid(){ return !this.isValid; }

  constructor(o: IOption){
    this._id = o.id.toString();
    this._label = o.label;
    this._isRequired = o.isRequired? o.isRequired : false;
    this._isSelected = o.isSelected? o.isSelected : false;
  }

  require(){ this._isRequired = true; }
  notRequire(){ this._isRequired = false; }
  select(){ this._isSelected = true; }
  deselect(){ this._isSelected = false; }
}
