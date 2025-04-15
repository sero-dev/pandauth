import { Component, input } from '@angular/core';
import { FaIcon } from './fa-icon-type';

@Component({
  selector: 'common-fa-icon',
  imports: [],
  template: `
    <i [class]="['fa-solid', icon(), size(), fixedWith(), flip(), rotate(), animate()]"></i>
  `,
})
export class FaIconComponent {
  public readonly icon = input.required({
    transform: (value: FaIcon) => `fa-${value}`,
  });

  public readonly size = input('', {
    transform: blankIfUndefinedOr<FaIconSize>('fa-'),
  });

  public readonly fixedWith = input('', {
    transform: (value: boolean) => (value ? 'fa-fw' : ''),
  });

  public readonly flip = input('', {
    transform: blankIfUndefinedOr<FaIconFlip>('fa-flip-'),
  });

  public readonly rotate = input('', {
    transform: blankIfUndefinedOr<FaIconRotate>('fa-rotate-'),
  });

  public readonly animate = input('', {
    transform: blankIfUndefinedOr<FaIconAnimate>('fa-'),
  });
}

function blankIfUndefinedOr<T>(prefix: string) {
  return (value: T | undefined) => (value ? prefix + value : '');
}

export type FaIconAnimate = 'beat' | 'fade' | 'beat-fade' | 'bounce' | 'flip' | 'shake' | 'spin' | 'spin-pulse';
export type FaIconRotate = '90' | '180' | '270';
export type FaIconFlip = 'horizontal' | 'vertical' | 'both';
export type FaIconSize =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'lg'
  | 'xl'
  | '2xl'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x';
