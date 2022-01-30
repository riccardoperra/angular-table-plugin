import { forwardRef, InjectionToken } from '@angular/core';
import { TableSelection } from './table-selection.directive';

export const TABLE_SELECTION = new InjectionToken<TableSelection<any>>(
  'table selection'
);

export const TABLE_SELECTION_PROVIDER = {
  provide: TABLE_SELECTION,
  useExisting: forwardRef(() => TableSelection),
};
