import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/core/services/movies.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  moviesData: any[] = [];
  movieTitle: string = '';
  showToast: boolean = false;
  toastType: string = '';
  toastMessage: string = '';
  tableHeaders: any[] = [
    { key: 'Poster', label: 'Poster' ,img: true},
    { key: 'Title', label: 'Title', sortable: true },
    { key: 'Year', label: 'Year', sortable: true },
  ];
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.moviesService.getAll().subscribe({
      next: (response: any) => {
        this.moviesData = response;
      },
      error: (err) => {
        this.toastType = 'error';
        this.toastMessage = err;
        this.toggleToast();
      },
      complete: () => {
        console.log('finalize');
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

  toggleToast() {
    this.showToast = !this.showToast;
  }
}
