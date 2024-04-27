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
    this.moviesService.search(this.movieTitle).subscribe({
      next: (response: any) => {
        console.log('response [search]', response);
      },
      error: (err) => {
        console.error('error', err);
      },
      complete: () => {
        console.log('finalize');
      },
    });
  }

  onGoTo(page: number): void {
    console.log(`Page changed to ${page}`);
    this.page = page;
    this.getMovies(page, this.perPage);
  }

  public onNext(page: number): void {
    // if (this.currentPage === this.totalPages) return;
    // if (this.currentPage < this.totalPages) {
    //   this.currentPage++;
    //   this.usersToDisplay = this.paginate(this.currentPage, this.perPage);
    // }
    this.getMovies(page, this.perPage);
    console.log('next', page);
  }

  public onPrevious(page: number): void {
    console.log('previous', page);
    this.getMovies(page, this.perPage);
    // if (this.currentPage === 1) return;
    // if (this.currentPage > 1) {
    //   this.currentPage--;
    //   this.usersToDisplay = this.paginate(this.currentPage, this.perPage);
    // }
  }

  public onPerPageChange(perPage: number): void {
    this.perPage = perPage;
    this.getMovies(this.page, perPage);
  }

  toggleToast() {
    this.showToast = !this.showToast;
  }
}
