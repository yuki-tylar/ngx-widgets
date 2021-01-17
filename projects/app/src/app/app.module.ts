import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormModule } from 'form';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
