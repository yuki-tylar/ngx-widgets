import { Component, OnInit } from '@angular/core';
import { ChangeSelectEvent , ChangeCheckboxEvent} from 'form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  public colorset = ['blue', 'green', 'orange', 'red', 'black', '#cccccc'];
  public color: string = 'green';

  public statesetCheckbox = ['check', 'uncheck'];
  public checked = false;

  public optionsSelect = [{id: 1, label: 'test1'},{id: 2, label: 'test2'}, {id: 1, label: 'test3'},  ]
  public selected: number | null = null;

  ngOnInit(){
  }

  setColor(s: string){
    this.color = s;
  }

  setStateCheckbox(s: string){
    this.checked = (s == 'check')? true : false;
  }

  select(i: number){
    this.selected = i;
  }

  onChange(e: ChangeCheckboxEvent){
    this.checked = e.checked;
  }

  onChangeSelect(e: ChangeSelectEvent){
    this.selected = e.index;
  }

  private selectController: any;
  subscribeValidate(e: any){
    this.selectController = e;
  }
}
