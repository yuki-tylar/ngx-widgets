import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { DirectiveModule } from '@takayuki-h/ngx-directive';

@NgModule({
  declarations: [CheckboxComponent, SelectboxComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DirectiveModule,
  ],
  exports: [CheckboxComponent, SelectboxComponent]
})
export class FormModule { }
