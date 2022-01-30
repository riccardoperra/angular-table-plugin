import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { DestroyService } from '../../destroy.service';
import { TablePlugin } from '../plugin/table-plugin';
import { TablePluginManager } from '../plugin/table-plugin-manager.service';
import { TABLE_SELECTION_PROVIDER } from './table-selection.provider';

@Directive({
  selector: '[tableSelection]',
  providers: [TABLE_SELECTION_PROVIDER],
})
export class TableSelection<T> extends TablePlugin<T> implements OnInit {
  private readonly selection = new Set<PropertyKey>();

  @Input()
  selectionResetOnChange: boolean = true;

  @Input()
  selectionHandler: keyof T = 'id' as keyof T;

  @Output()
  selectionChange = new EventEmitter<PropertyKey[]>();

  @Input('selectedItems')
  set selectedItemsSetter(items: PropertyKey[]) {
    this.selection.clear();
    items.forEach((item) => this.selection.add(item));
  }

  constructor(
    @Inject(DestroyService) private readonly destroy$: Observable<void>,
    protected readonly pluginManager: TablePluginManager<T>,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    super(pluginManager);
  }

  get selected(): PropertyKey[] {
    return Array.from(this.selection);
  }

  get allSelected(): boolean {
    return this.selected.length === this.table.items.length;
  }

  ngOnInit(): void {
    this.table.itemsChange
      .pipe(
        filter(() => this.selectionResetOnChange),
        takeUntil(this.destroy$),
        tap({ finalize: () => console.log('TableSelection -> Destroy') })
      )
      .subscribe({
        next: () => {
          console.log('clearing items');
          this.clear();
          this.changeDetectorRef.markForCheck();
        },
      });
  }

  clear(): void {
    this.selection.clear();
    this.selectionChange.emit(this.selected);
  }

  toggle(id: PropertyKey): void {
    this.selection.has(id) ? this.selection.delete(id) : this.selection.add(id);
    this.selectionChange.emit(this.selected);
  }

  toggleAll(): void {
    if (this.allSelected) {
      this.clear();
    } else {
      this.table.items.forEach((item) =>
        this.selection.add(
          item[this.selectionHandler] as unknown as PropertyKey
        )
      );
      this.selectionChange.emit(this.selected);
    }
  }

  isSelected(id: PropertyKey): boolean {
    return this.selection.has(id);
  }
}
