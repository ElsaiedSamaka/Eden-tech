import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { EnvironmentService } from './environment.service';
import { Movie } from '../models/Movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly API_KEY = this.env.apiKey;

  movies$ = new BehaviorSubject<Movie[]>([]);
  moviesCount$ = new BehaviorSubject<number>(0);

  constructor(
    private apiService: ApiService,
    private env: EnvironmentService,
  ) {}

  // Fetch movies with optional pagination and search term
  getAll(
    page: number = 1,
    perPage: number = 5,
    term: string = '',
  ): Observable<Movie[]> {
    const url = `/movies/?q=${term}&_page=${page}&_limit=${perPage}&apiKey=${this.API_KEY}`;
    return this.apiService.get(url).pipe(
      tap((res) => {
        this.movies$.next(res);
      }),
      catchError((err) => {
        const errorMessage = this.handleError(err);
        return throwError(errorMessage);
      }),
    );
  }

  // Fetch movie by ID
  getById(id: string): Observable<Movie> {
    const url = `/movies/${id}/?i=${id}&apiKey=${this.API_KEY}`;
    return this.apiService.get(url);
  }

  // Fetch total count of movies
  getCount(): Observable<Movie[]> {
    const url = '/movies';
    return this.apiService.get(url).pipe(
      tap((res: any[]) => {
        this.moviesCount$.next(res.length);
      }),
    );
  }

  // Handle errors and return specific error messages
  private handleError(err: any): string {
    if (err?.error?.status === 404) {
      return 'Movie not found.';
    }
    return 'An error occurred while fetching movies.';
  }
}
