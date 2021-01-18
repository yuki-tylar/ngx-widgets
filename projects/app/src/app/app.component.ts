import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  onChange(e: any){
    console.log(e);
  }

  onChangeSelect(e: any){
    console.log(e.selected)
  }
}
