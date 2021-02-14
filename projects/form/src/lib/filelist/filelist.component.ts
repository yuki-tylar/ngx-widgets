import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChangeFilesEvent } from '../types';

@Component({
  selector: 'ngx-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.scss']
})
export class FilelistComponent implements OnInit {

  @Input() data!: ChangeFilesEvent;

  @Output() change = new EventEmitter<ChangeFilesEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  removeFile(i: number){
    this.data.files.splice(i,1);
    this.emit();
  }

  removeFileNotAccepted(i: number){
    this.data.filesNotAccepted.splice(i,1);
    this.emit();
  }

  emit(){
    this.change.emit(this.data);
  }
}
