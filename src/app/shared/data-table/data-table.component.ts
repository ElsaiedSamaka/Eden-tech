import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  currentPage: number = 1;
  @Input() tableHeaders: any[] = [];
  @Input() tableData: any[] = [];
  @Input() loading: boolean = false;
  @Output() handleGoTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() handleNext: EventEmitter<number> = new EventEmitter<number>();
  @Output() handlePrevious: EventEmitter<number> = new EventEmitter<number>();
  @Output() handlePerPageChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit() { }
  

  public onGoTo(page: number): void {
    this.handleGoTo.emit(page);
  }
  public onNext(page: number): void {
     this.currentPage ++;
    this.handleNext.emit(this.currentPage);
  }
  public onPrevious(page: number): void {
     this.currentPage --;
    this.handlePrevious.emit(this.currentPage);
  }
  public onPerPageChange(page: number): void {
    this.handlePerPageChange.emit(page);
  }
}
