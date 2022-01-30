import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { DestroyService } from '../../destroy.service';
import { TablePlugin } from '../plugin/table-plugin';
import { TablePluginManager } from '../plugin/table-plugin-manager.service';
import { TABLE_LOADING_PROVIDER } from './table-loading.providers';

@Directive({
  selector: '[tableLoading]',
  providers: [TABLE_LOADING_PROVIDER],
})
export class TableLoading<T> extends TablePlugin<T> {
  private readonly loadingSubject$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject$.asObservable();

  @Input()
  set tableLoading(loading: boolean | null) {
    this.setLoading(loading ?? false);
  }

  @Output()
  loadingChange = this.loading$.pipe(distinctUntilChanged());

  constructor(
    @Inject(DestroyService) private readonly destroy$: Observable<void>,
    protected readonly pluginManager: TablePluginManager<T>
  ) {
    super(pluginManager);
  }

  setLoading(loading: boolean) {
    this.loadingSubject$.next(loading);
  }
}
