import { Component, OnInit, Input, Output, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'ngx-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {

  @Input() id: string | null = null;
  @Input() label: string | null = null;
  @Input() value: string | null = null;

  @Output() changeValue = new EventEmitter<ChangeTextfieldEvent>();
  
  public _id: string ="";
  public _label: string = 'Text field';
  public _value: string = '';
    
  constructor(
    _f: FormService,
  ) {
    // this._id = _f.createId();
  }

  ngOnChanges(e: SimpleChanges){
    if(e.value && e.value.currentValue != e.value.previousValue){
      this.set(this.value, false);
    }
  }
  ngOnInit(): void {
    this.set(this.value, false);
  }

  set(s: string | null, emit: boolean = true){
    this._value = s? s : '';
    console.log(this._value)
    if(emit){ this.changeValue.emit({value: this._value, id: this._id}); }
  }

  onInput(e: KeyboardEvent){
    if(!e.isComposing){
      console.log(e.key);

    }
  }
}

export type ChangeTextfieldEvent = {
  value: string;
  id: string;
}
