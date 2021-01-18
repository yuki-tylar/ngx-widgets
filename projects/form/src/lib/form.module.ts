import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { FocusDirective } from './focus.directive';


@NgModule({
  declarations: [CheckboxComponent, SelectboxComponent, FocusDirective],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [CheckboxComponent, SelectboxComponent]
})
export class FormModule { }
