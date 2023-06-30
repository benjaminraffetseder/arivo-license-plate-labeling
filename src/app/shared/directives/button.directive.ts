import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[arivoButton]',
})
export class ButtonDirective {
  twClasses = [
    'px-2',
    'py-1',
    'rounded-md',
    'bg-blue-500',
    'text-white',
    'text-sm',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'hover:bg-blue-600',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-600',
    'focus:ring-opacity-50',
    'transition-colors',
    'duration-300',
  ];

  @Input()
  @HostBinding('class')
  classes = this.twClasses.join(' ');
}
