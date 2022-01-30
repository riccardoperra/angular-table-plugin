import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTableComponent } from './custom/user-table.component';
import { TableModule } from './table/table.module';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, TableModule],
  declarations: [AppComponent, HelloComponent, UserTableComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
