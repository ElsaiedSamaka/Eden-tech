import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SortIconComponent } from './sort-icon/sort-icon.component';
import { ToastComponent } from './toast/toast.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TableFooterComponent } from './data-table/table-footer/table-footer.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    InputComponent,
    SortIconComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    DataTableComponent,
    TableFooterComponent,
  ],
  exports: [
    InputComponent,
    SortIconComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    DataTableComponent,
    TableFooterComponent,
  ],
})
export class SharedModule {}
