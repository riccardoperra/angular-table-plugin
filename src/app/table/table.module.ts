import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSelection } from './selection';
import { TableLoading } from './loading';

@NgModule({
  imports: [CommonModule],
  declarations: [TableSelection, TableLoading],
  exports: [TableSelection, TableLoading],
})
export class TableModule {}
