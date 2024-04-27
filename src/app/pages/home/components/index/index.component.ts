import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Movie } from 'src/core/models/Movies';
import { MoviesService } from 'src/core/services/movies.service';
import { TableHeader } from 'src/core/types/general';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  // Component properties
  moviesData: Movie[] = [];
  movieTitle: string = '';
  showToast: boolean = false;
  toastType: string = '';
  toastMessage: string = '';
  isDataLoading: boolean = false;
  tableHeaders: TableHeader[] = [
    { key: 'Poster', label: 'Poster', img: true },
    { key: 'Title', label: 'Title', sortable: true },
    { key: 'Year', label: 'Year', sortable: true },
  ];

  // Pagination
  page: number = 1;
  perPage: number = 5;
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private moviesService: MoviesService) {}

  // Lifecycle Hooks
  ngOnInit() {
    this.getMovies();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Component methods
  getMovies(page: number = this.page, perPage: number = this.perPage): void {
    this.isDataLoading = true;
    this.moviesService
      .getAll(page, perPage)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: any) => {
          this.moviesData = response;
        },
        error: (err) => {
          this.handleError(err);
        },
        complete: () => {
          this.isDataLoading = false;
          this.showToastMessage('success', 'Data fetched successfully');
        },
      });
  }

  search(): void {
    this.moviesService
      .getAll(this.page, this.perPage, this.movieTitle)
      .subscribe({
        next: (response: any) => {
          this.movieTitle.length > 0 &&
            this.moviesService.moviesCount$.next(response.length);
          this.moviesData = response;
        },
        error: (err) => {
          this.handleError(err);
        },
        complete: () => {
          console.log('finalize');
        },
      });
  }

  clear(): void {
    this.movieTitle = '';
    this.getMovies();
    this.moviesService.getCount().subscribe();
  }

  onGoTo(page: number): void {
    this.page = page;
    this.getMovies(page, this.perPage);
  }

  public onNext(page: number): void {
    this.getMovies(page, this.perPage);
  }

  public onPrevious(page: number): void {
    this.getMovies(page, this.perPage);
  }

  public onPerPageChange(perPage: number): void {
    this.perPage = perPage;
    this.getMovies(this.page, perPage);
  }
  private handleError(error: any): void {
    this.showToastMessage('error', 'An error occurred while fetching data');
  }
  private showToastMessage(type: string, message: string): void {
    this.toastType = type;
    this.toastMessage = message;
    this.toggleToast();
  }
  toggleToast() {
    this.showToast = !this.showToast;
  }
}
