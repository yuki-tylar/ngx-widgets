import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  createId(): string{
    var strSet = 'abcdefghijklmnopqrstuvwxyz1234567890'; 
    var result = '';
    for(var i=0; i<8; i++){ result += strSet[Math.floor( Math.random() * strSet.length )]; }
    return result;
  }
}