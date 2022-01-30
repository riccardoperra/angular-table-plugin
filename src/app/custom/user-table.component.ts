import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  InjectionToken,
  Optional,
} from '@angular/core';
import { TableLoading, TABLE_LOADING } from '../table/loading';
import { TablePluginManager } from '../table/plugin/table-plugin-manager.service';
import { CUSTOM_TABLE, TableDirective } from '../table/table.directive';
import { TableSelection, TABLE_SELECTION } from '../table/selection';
import { User } from './user';
import { DestroyService } from '../destroy.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  providers: [
    TablePluginManager,
    DestroyService,
    {
      provide: CUSTOM_TABLE,
      useExisting: forwardRef(() => UserTableComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent extends TableDirective<User> {
  constructor(
    @Inject(TABLE_SELECTION)
    @Optional()
    readonly selectionPlugin: TableSelection<User> | null,
    @Inject(TABLE_LOADING)
    @Optional()
    readonly loadingPlugin: TableLoading<User>
  ) {
    super();
  }
}
