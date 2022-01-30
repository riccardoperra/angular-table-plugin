import {
  Directive,
  EventEmitter,
  forwardRef,
  InjectionToken,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const CUSTOM_TABLE = new InjectionToken<TableDirective<unknown>>(
  'custom table'
);

@Directive({
  selector: '[customTable]',
  providers: [
    { provide: CUSTOM_TABLE, useExisting: forwardRef(() => TableDirective) },
  ],
})
export abstract class TableDirective<T> {
  private readonly items$ = new BehaviorSubject<T[]>([]);

  get items(): T[] {
    return this.items$.getValue();
  }

  @Input()
  set items(items: T[] | null) {
    this.items$.next(items || []);
  }

  @Output()
  itemsChange = this.items$.asObservable();
}
