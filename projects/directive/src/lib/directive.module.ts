import { NgModule } from '@angular/core';
import { FocusDirective } from './focus.directive';
import { ClickOutsideDirective } from './click-outside.directive';



@NgModule({
  declarations: [FocusDirective, ClickOutsideDirective],
  imports: [
  ],
  exports: [FocusDirective, ClickOutsideDirective]
})
export class DirectiveModule { }
