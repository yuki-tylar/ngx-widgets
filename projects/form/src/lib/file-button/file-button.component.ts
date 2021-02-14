import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ChangeFilesEvent } from '../types';

@Component({
  selector: 'ngx-file-button',
  templateUrl: './file-button.component.html',
  styleUrls: ['./file-button.component.scss']
})
export class FileButtonComponent implements OnInit {

  @Input() label: string = 'upload file';

  @Input() multiple?: string | boolean = true;
  @Input() accept: string[] | string = ''; /** all | all-danger | {regular expression for file type} */

  @Output() change = new EventEmitter <ChangeFilesEvent>();

  get isMultiple(){ return (this.multiple === false || this.multiple === 'false') ? false : true; }

  get acceptType(): string[]{
    let accept = [];
    if(typeof this.accept == 'string'){
      if(this.accept.match(',')){ accept = this.accept.split(','); }
      else{ accept = [this.accept]; }
    }
    else{ accept = this.accept; }
    accept.forEach((a,i)=>{ 
      accept[i] = a.trim().toLowerCase();
      if(a == ''){ accept[i] = 'all'; }
    });
    return accept;
  }

  
  private host: HTMLElement;
  private files: File[] = [];
  private filesNotAccepted: File[] = []

  constructor( _el: ElementRef) { this.host = _el.nativeElement; }

  ngOnInit(): void {
  }

  onClick(){
    const input = this.host.querySelector('input') as HTMLInputElement;
    input.click();
  }

  onChange(e: Event){
    e.preventDefault();
    e.stopPropagation();
    const data = (e.target as HTMLInputElement).files;
    const files = [];
    const filesNotAccepted = [];

    if(data){
      const types = this.acceptType;

      for(let i=0; i<data.length; i++){
        const f = data[i] as File;
        const isAccepted = this.validateFile(f, types);

        if(isAccepted){ files.push(f); }
        else{ filesNotAccepted.push(f); }    
      }

      this.files = files;
      this.filesNotAccepted = filesNotAccepted;  
      this.emit();

      (e.target as HTMLInputElement).value = '';
    }
  }

  validateFile(f: File, acceptTypes: string[]): boolean{
    let result: boolean = false;

    for(let a of acceptTypes){
      if(a == 'all-danger'){ result = true; }
      else if(a == 'all' && (f.type && f.type !== '')){ result = true; }
      else if(f.type.match(a)){ result = true; }

      if(result){ break; }
    }
    
    return result;
  }

  emit(){    
    const result = new ChangeFilesEvent(this.files, this.filesNotAccepted, this.isMultiple);
    this.change.emit(result);
  }
}
