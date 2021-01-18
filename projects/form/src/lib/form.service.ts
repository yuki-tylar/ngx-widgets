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

  setColor(colorname: string): string{
    var c = '';
    switch(colorname){
      case 'blue' :  c = '#3D5AFE'; break;
      case 'green':  c = '#43A047'; break;
      case 'orange': c = '#EF6C00'; break;
      case 'black':  c = '#212121'; break;
      case '':       c = '#212121'; break;
      default:       c = colorname; break;
    }
    return c;
  }
}

export type ColorPreset = 'blue' | 'green' | 'orange' | 'black'
