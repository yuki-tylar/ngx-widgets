import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { DirectiveModule } from '@takayuki-h/ngx-directive';
import { IconModule } from '@takayuki-h/ngx-icons';
import { TextfieldComponent } from './textfield/textfield.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { CheckbuttonComponent } from './checkbutton/checkbutton.component';
import { CheckbuttonGroupComponent } from './checkbutton-group/checkbutton-group.component';

@NgModule({
  declarations: [
    CheckboxComponent, 
    SelectboxComponent, 
    TextfieldComponent, 
    CheckboxGroupComponent, 
    CheckbuttonComponent, CheckbuttonGroupComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DirectiveModule,
    IconModule,
  ],
  exports: [
    CheckboxComponent,
    SelectboxComponent,
    TextfieldComponent,
    CheckboxGroupComponent,
    CheckbuttonComponent,
    CheckbuttonGroupComponent
  ]
})
export class FormModule { }
