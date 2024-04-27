import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MoviesService } from 'src/core/services/movies.service';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.css'],
})
export class TableFooterComponent implements OnChanges, OnDestroy {
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

  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private moviesService: MoviesService) {
    this.fetchCount();
  }
  ngOnChanges() {
    this.subscribeToMoviesCount();
    this.calculateTotalPages();
    this.updatePages();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToMoviesCount() {
    this.moviesService.moviesCount$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: number) => {
        this.totalItems = res;
        this.calculateTotalPages();
        this.updatePages();
      });
  }

  private fetchCount() {
    this.moviesService
      .getCount()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res: number) => {
          this.totalItems = res;
          this.calculateTotalPages();
          this.updatePages();
        },
        (error: any) => {
          console.error('Failed to fetch movie count:', error);
        }
      );
  }
  private calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.perPage);
  }

  private updatePages() {
    this.pages = this.getPages(this.currentPage, this.totalPages);
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
    this.calculateTotalPages();
    this.updatePages();
    this.perPageChange.emit(perPage);
  }
}
