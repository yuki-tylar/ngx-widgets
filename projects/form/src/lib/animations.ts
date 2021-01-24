import { state, trigger, animate, transition, style } from '@angular/animations';

export const slideinAnimation = trigger('slidein', [
  state('slideoutHorizontal', style({display: 'none'})),
  state('slideoutVertical', style({display: 'none'})),
  state('slidein', style({display: 'block'})),
  transition('slideoutHorizontal=>slidein', [
    style({display: 'block', opacity: 0, transform: 'translateX(-5em)'}),
    animate('200ms ease', style({opacity: 1, transform: 'translate(0)'})),
  ]),
  transition('slideoutVertical=>slidein', [
    style({display: 'block', opacity: 0, transform: 'translateY(-2em)'}),
    animate('200ms ease', style({opacity: 1, transform: 'translate(0)'})),
  ]),
  transition('slidein=>slideoutHorizontal', animate('200ms ease', style({ opacity: 0, transform: 'translateX(-5em)'}))),
  transition('slidein=>slideoutVertical', animate('200ms ease', style({ opacity: 0, transform: 'translateY(-2em)'}))),
]);
