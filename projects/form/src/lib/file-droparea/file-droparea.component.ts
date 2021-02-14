import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { animate, trigger, style, transition } from '@angular/animations';
import { ChangeFilesEvent } from '../types';

const fade = trigger('fade',[
  transition(':enter', [
    style({display: 'block', opacity: 0}),
    animate('200ms ease', style({opacity: 0.5}))
  ]),
  transition(':leave', [
    animate('200ms ease', style({opacity: 0}))
  ])
]);

@Component({
  selector: 'ngx-file-droparea',
  templateUrl: './file-droparea.component.html',
  styleUrls: ['./file-droparea.component.scss'],
  animations: [fade]
})
export class FileDropareaComponent implements OnInit {

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

  public isDragOn: boolean = false;
  private files: File[] = [];
  private filesNotAccepted: File[] = []


  constructor( ) { }

  ngOnInit(): void {
  }

  @HostListener('window:dragover', ['$event']) WindowDrag(e: DragEvent){
    const [w0, h0] = [window.innerWidth, window.innerHeight];
    if(e.x < 40 || w0 - 40 < e.x || e.y < 40 || h0 - 40 < e.y){ this.isDragOn = false; }
    else{ this.isDragOn = true; }
    e.stopPropagation();
    e.preventDefault();
  }

  hide(){ 
    if(this.isDragOn){ this.isDragOn = false; }
  }

  onDrop(e: DragEvent){
    this.isDragOn = false;
    e.preventDefault();
    e.stopPropagation();

    const files = [];
    const filesNotAccepted = [];
    if(e.dataTransfer){
      const types = this.acceptType;

      for(let i=0; i<e.dataTransfer.files.length; i++){
        const f = e.dataTransfer.files[i] as File;
        const isAccepted = this.validateFile(f, types);

        if(isAccepted){ files.push(f); }
        else{ filesNotAccepted.push(f); }    
      }

      this.files = files;
      this.filesNotAccepted = filesNotAccepted;  
      this.emit();
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

