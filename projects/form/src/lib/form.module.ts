import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { DirectiveModule } from '@takayuki-h/ngx-directive';
import { IconModule } from '@takayuki-h/ngx-icons';
import { UiModule } from '@takayuki-h/ngx-ui';
import { TextfieldComponent } from './textfield/textfield.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { CheckbuttonComponent } from './checkbutton/checkbutton.component';
import { CheckbuttonGroupComponent } from './checkbutton-group/checkbutton-group.component';
import { FileButtonComponent } from './file-button/file-button.component';
import { FileDropareaComponent } from './file-droparea/file-droparea.component';
import { FilelistComponent } from './filelist/filelist.component';

@NgModule({
  declarations: [
    CheckboxComponent, 
    SelectboxComponent, 
    TextfieldComponent, 
    CheckboxGroupComponent, 
    CheckbuttonComponent, CheckbuttonGroupComponent, FileButtonComponent, FileDropareaComponent, FilelistComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DirectiveModule,
    IconModule,
    UiModule,
  ],
  exports: [
    CheckboxComponent,
    SelectboxComponent,
    TextfieldComponent,
    CheckboxGroupComponent,
    CheckbuttonComponent,
    CheckbuttonGroupComponent,
    FileButtonComponent,
    FileDropareaComponent,
    FilelistComponent
  ]
})
export class FormModule { }
