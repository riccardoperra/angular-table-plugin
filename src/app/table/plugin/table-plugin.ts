import { InjectionToken } from '@angular/core';
import { TablePluginManager } from './table-plugin-manager.service';
import { TableDirective } from '../table.directive';

export class TablePlugin<T> implements TablePlugin<T> {
  get table(): TableDirective<T> {
    return this.pluginManager.table;
  }

  get items(): T[] {
    return this.table.items;
  }

  constructor(protected readonly pluginManager: TablePluginManager<T>) {}
}
