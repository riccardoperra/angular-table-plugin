import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  VERSION,
} from '@angular/core';
import { BehaviorSubject, defer, Observable, of, timer } from 'rxjs';
import { delay, startWith, switchMap, tap } from 'rxjs/operators';
import { User } from './custom/user';
import { USERS } from './custom/users';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  selected: PropertyKey[] = [];
  showTable: boolean = true;

  readonly loading$ = new BehaviorSubject<boolean>(true);

  readonly users$: Observable<User[]> = defer(() => {
    return timer(0, 10000).pipe(
      switchMap(() => {
        return defer(() => {
          this.loading$.next(true);
          this.changeDetectorRef.detectChanges();
          return of([...USERS]).pipe(
            delay(1000),
            tap(() => this.loading$.next(false)),
            startWith([])
          );
        });
      })
    );
  });

  onSelectionChange(selected: PropertyKey[]) {
    console.log('selected change');
    this.selected = selected;
    this.changeDetectorRef.markForCheck();
  }

  onLoadingChange(loading: boolean) {
    console.log('loading change');
  }

  constructor(
    private readonly http: HttpClient,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}
}
