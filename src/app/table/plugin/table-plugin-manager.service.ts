import {
  Inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  OnDestroy,
} from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { DestroyService } from '../../destroy.service';
import { CUSTOM_TABLE, TableDirective } from '../table.directive';
import { TablePlugin } from './table-plugin';

@Injectable()
export class TablePluginManager<T = unknown> implements OnDestroy {
  get table(): TableDirective<T> {
    return this.injector.get<TableDirective<T>>(CUSTOM_TABLE);
  }

  constructor(
    private readonly injector: Injector,
    @Inject(DestroyService) private readonly destroy$: Observable<void>
  ) {}

  get<TPlugin extends TablePlugin<unknown>>(token: TPlugin): TPlugin {
    return this.injector.get(token) as TPlugin;
  }

  has(token: InjectionToken<TablePlugin<unknown>>) {
    return this.injector.get(token, null) !== null;
  }

  ngOnDestroy(): void {
    console.log('TablePluginManager -> Destroy');
  }
}
