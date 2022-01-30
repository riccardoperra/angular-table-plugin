import { forwardRef, InjectionToken } from '@angular/core';
import { TableLoading } from './table-loading.directive';

export const TABLE_LOADING = new InjectionToken<TableLoading<any>>(
  'table loading'
);

export const TABLE_LOADING_PROVIDER = {
  provide: TABLE_LOADING,
  useExisting: forwardRef(() => TableLoading),
};
