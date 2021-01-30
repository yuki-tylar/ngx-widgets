import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationPlayer, AnimationFactory, animate, keyframes, style } from '@angular/animations';
import { ColorPreset, ChangeCheckboxEvent } from '../types';
import { CheckboxController } from '../checkbox-controller';

@Component({
  selector: 'ngx-checkbutton',
  templateUrl: './checkbutton.component.html',
  styleUrls: ['./checkbutton.component.scss']
})
export class CheckbuttonComponent implements OnInit {

  @Input() id?: string | number;

  @Input() label?: string;
  @Input() checked?: boolean | string;

  @Input() color: ColorPreset = 'default';
  @Input() darkmode: 'disable' | 'auto' | 'enable' = 'disable';

  @Input() required?: string | boolean;
  @Input() requiredError?: string;

  @Output() changeValue = new EventEmitter<ChangeCheckboxEvent>();
  @Output() getController = new EventEmitter<any>();

  public _label: string = 'Please check me!';
  public _controller: CheckboxController = new CheckboxController();
  private player?: AnimationPlayer;
  private host: HTMLElement;

  constructor(
    private builder: AnimationBuilder,
    el: ElementRef
  ) {
    this.host = el.nativeElement;
  }

  get darkClass(){ return (this.darkmode == 'enable')? 'dark' : (this.darkmode=="auto")? 'dark-auto' : ''; }
  get withValidatorClass(){ return this._controller.isValidationOn? 'with-validator' : ""; }
  get colorLabelClass(){ 
    const c: string[] = [this.color];
    if(this._controller.value){ c.push('active'); }
    return c;
  }

  ngOnChanges(e: SimpleChanges){
    if(e.checked && e.checked.currentValue !== e.checked.previousValue){
      if(this.checked === undefined || this.checked === false || this.checked === 'false'){ this._controller.uncheck(false); }
      else{ this._controller.check(false); }
    }
  }

  ngOnInit(): void {
    this._controller.setId(this.id);
    if(this.label){ this._label = this.label; }

    if(this.checked === undefined || this.checked === false || this.checked === 'false'){ this._controller.uncheck(false); }
    else{ this._controller.check(false); }

    this._controller.setValidatorRequired({required: this.required, message: this.requiredError})    
    this._controller.validate();

  }


  onChange(e: MouseEvent){
    const target = this.host.querySelector('.checkbutton') as HTMLElement;
    const isChecked = this._controller.value;
    this.setupAnimation(e.x, e.y, target.getBoundingClientRect(), (isChecked? 'close' : 'open'));

    if(!isChecked){ this._controller.check(); }
    else{ this._controller.uncheck(); }
    if(this.player){ this.player.play()}

    this.changeValue.emit({id: this._controller.id, value: this._controller.value});
  }

  emitController(){ this.getController.emit(this._controller); }

  setupAnimation(x: number, y: number, rectTarget: DOMRect, state: string){
    if(this.player){ this.player.destroy(); }
    const [x0, y0, w0, h0] = [rectTarget.x, rectTarget.y, rectTarget.width, rectTarget.height];
    const [xr, yr] = [Math.round(100 * (x - x0) / w0), Math.round(100 * (y - y0) / h0)];

    const kf =keyframes((state == 'open')? ([
      style({transform: `translate(${xr}%, ${yr}%) scale(0.1, 0)`, offset: 0}),
      style({transform: `translate(${xr}%, 0) scale(0.1, 1)`, offset: 0.5}),
      style({transform: `translate(0) scale(1)`, offset: 1}),
    ]) : [
      style({transform: `translate(0) scale(1)`, offset: 0}),
      style({transform: `translate(0, ${yr}%) scale(1, 0.1)`, offset: 0.5}),
      style({transform: `translate(${xr}%, ${yr}%) scale(0, 0.1)`, offset: 1}),
    ])

    const animation = animate('450ms ease', kf);
    const factory = this.builder.build(animation);
    this.player = factory.create(this.host.querySelector('.checkbutton-bg.ripple'));
  }
}