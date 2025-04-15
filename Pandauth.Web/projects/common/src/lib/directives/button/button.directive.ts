import { ComponentRef, Directive, ElementRef, Renderer2, ViewContainerRef, effect, inject, input } from '@angular/core';
import { FaIcon } from '../../components/fa-icon/fa-icon-type';
import { FaIconComponent } from '../../components/fa-icon/fa-icon.component';

@Directive({
  selector: '[commonButton]',
})
export class ButtonDirective {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private iconRef: ComponentRef<FaIconComponent> | undefined = undefined;

  public readonly color = input<ButtonColor>('blue');
  public readonly variant = input<ButtonVariant>('solid');
  public readonly size = input<ButtonSize>('md');

  public readonly icon = input<FaIcon>();
  public readonly iconPlacement = input<ButtonIconPlacement>('start');
  public readonly isLoading = input<boolean>(false);

  constructor() {
    effect(() => {
      const color = this.color();
      const variant = this.variant();
      const size = this.size();

      const classes = this.getClassList(color, variant, size);

      this.elementRef.nativeElement.className = classes;
    });

    effect(() => {
      const placement = this.iconPlacement();
      const isLoading = this.isLoading();
      const icon = isLoading ? 'circle-notch' : this.icon();

      this.iconRef?.destroy();

      const host = this.elementRef.nativeElement;

      if (icon === undefined) return;

      this.iconRef = this.viewContainerRef.createComponent(FaIconComponent);
      this.iconRef.setInput('icon', icon);

      if (isLoading) {
        this.iconRef.setInput('animate', 'spin');
      }

      if (placement === 'start') {
        this.renderer.insertBefore(host, this.iconRef.location.nativeElement, host.firstChild);
      } else if (placement === 'end') {
        this.renderer.appendChild(host, this.iconRef.location.nativeElement);
      }
    });
  }

  private getClassList(color: ButtonColor, variant: ButtonVariant, size: ButtonSize): string {
    const classes: string[] = [];

    classes.push(this.classes.base);
    classes.push(this.classes.size[size]);
    classes.push(this.classes.color[color][variant]);

    return classes.join(' ');
  }

  private readonly classes: ClassLookup = {
    base: 'inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus:outline-none',
    color: {
      blue: {
        solid: 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700',
        outline:
          'border-neutral-200 text-neutral-500 hover:border-blue-600 hover:text-blue-600 focus:text-blue-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:text-blue-500 dark:focus:border-blue-600',
        ghost:
          'border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-100 focus:text-blue-800 dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400 dark:focus:bg-blue-800/30 dark:focus:text-blue-400',
        soft: 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:bg-blue-200 dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20',
      },
      purple: {
        solid: 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-700',
        outline:
          'border-neutral-200 text-neutral-500 hover:border-indigo-600 hover:text-indigo-600 focus:text-indigo-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-indigo-500 dark:hover:border-indigo-600 dark:focus:text-indigo-500 dark:focus:border-indigo-600',
        ghost:
          'border-transparent text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 focus:bg-indigo-100 focus:text-indigo-800 dark:text-indigo-500 dark:hover:bg-indigo-800/30 dark:hover:text-indigo-400 dark:focus:bg-indigo-800/30 dark:focus:text-indigo-400',
        soft: 'border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200 focus:bg-indigo-200 dark:text-indigo-400 dark:bg-indigo-800/30 dark:hover:bg-indigo-800/20 dark:focus:bg-indigo-800/20',
      },
      red: {
        solid: 'border-transparent bg-red-500 text-white hover:bg-red-600 focus:bg-red-600',
        outline:
          'border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 focus:border-red-400 focus:text-red-400',
        ghost:
          'border-transparent text-red-500 hover:bg-red-100 focus:bg-red-100 hover:text-red-800 dark:hover:bg-red-800/30 dark:hover:text-red-400 dark:focus:bg-red-800/30 dark:focus:text-red-400',
        soft: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:bg-red-200 dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20',
      },
      black: {
        solid:
          'border-transparent bg-neutral-800 text-white hover:bg-neutral-900 focus:bg-neutral-900 dark:bg-white dark:text-neutral-800',
        outline:
          'border-neutral-800 text-neutral-800 hover:border-neutral-500 hover:text-neutral-500 focus:border-neutral-500 focus:text-neutral-500 dark:border-white dark:text-white dark:hover:text-neutral-300 dark:hover:border-neutral-300',
        ghost:
          'border-transparent text-neutral-800 hover:bg-neutral-100 focus:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700',
        soft: 'border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:bg-neutral-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white',
      },
    },
    size: {
      sm: 'py-2 px-3',
      md: 'py-3 px-4',
      lg: 'p-4 sm:p-5',
    },
  };
}

interface ClassLookup {
  base: string;
  color: Record<ButtonColor, Record<ButtonVariant, string>>;
  size: Record<ButtonSize, string>;
}

export type ButtonColor = 'blue' | 'purple' | 'red' | 'black';
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconPlacement = 'start' | 'end';
