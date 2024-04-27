import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MoviesService } from 'src/core/services/movies.service';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.css'],
})
export class TableFooterComponent implements OnInit, OnChanges {
  @Input() tableData: any[] = [];
  @Input() currentPage: number = 1;
  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  @Output() perPageChange: EventEmitter<number> = new EventEmitter<number>();
  totalPages: number = 0;
  totalItems: number = 0;
  pages: number[] = [];
  perPage: number = 5;

  constructor(private moviesService: MoviesService) {
    this.getCount();
  }
  ngOnChanges() {
    this.subscribeToMoviesCount();
    const totalPages = Math.ceil(this.totalItems / this.perPage);
    this.totalPages = totalPages;
    this.pages = this.getPages(this.currentPage, this.totalPages);
  }
  ngOnInit() {}
  subscribeToMoviesCount() {
    this.moviesService.moviesCount$.subscribe((res) => {
      this.totalItems = res;
      const totalPages = Math.ceil(this.totalItems / this.perPage);
      this.totalPages = totalPages;
      this.pages = this.getPages(this.currentPage, this.totalPages);
    });
  }
  getCount() {
    this.moviesService.getCount().subscribe();
  }
  public onGoTo(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.goTo.emit(page);
  }
  public onNext(): void {
    if (this.currentPage >= this.totalPages) return;
    this.next.emit();
  }
  public onPrevious(): void {
    if (this.currentPage <= 1) return;
    this.previous.emit();
  }
  getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return Array.from(Array(total).keys()).map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }
    return [1, 2, 3, 4, 5, -1, total];
  }

  public onPerPageChange(perPage: number): void {
    this.perPage = perPage;
    this.perPageChange.emit(perPage);
  }
}
