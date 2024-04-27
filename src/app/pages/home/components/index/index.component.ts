import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/core/services/movies.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  // Component properties
  moviesData: any[] = [];
  movieTitle: string = '';
  showToast: boolean = false;
  toastType: string = '';
  toastMessage: string = '';
  isDataLoading: boolean = false;
  tableHeaders: any[] = [
    { key: 'Poster', label: 'Poster', img: true },
    { key: 'Title', label: 'Title', sortable: true },
    { key: 'Year', label: 'Year', sortable: true },
  ];
  // Pagination
  page: number = 1;
  perPage: number = 5;
  constructor(private moviesService: MoviesService) {}
  // Lifecycle Hooks
  ngOnInit() {
    this.getMovies();
  }
  // Component methods
  getMovies(page:number=this.page, perPage:number=this.perPage): void {
    this.isDataLoading = true;
    this.moviesService.getAll(page, perPage).subscribe({
      next: (response: any) => {
        this.moviesData = response;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = err;
        this.toggleToast();
      },
      complete: () => {
        this.isDataLoading = false;
        this.toastType = 'success';
        this.toastMessage = 'data fetched successfly';
        this.toggleToast();
      },
    });
  }

  search(): void {
    this.moviesService.getAll(this.page,this.perPage,this.movieTitle).subscribe({
      next: (response: any) => {
        this.movieTitle.length > 0 && this.moviesService.moviesCount$.next(response.length);
        this.moviesData = response;
      },
      error: (err) => {
        console.error('error', err);
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

  toggleToast() {
    this.showToast = !this.showToast;
  }
}
