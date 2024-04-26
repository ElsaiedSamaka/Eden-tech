import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';

const API_KEY = '4680a5e8';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies$ = new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) {}

  getAll(_page: number = 1, _per_page: number = 5): Observable<any[]> {
    return this.apiService.get(`/movies/?_page=${_page}&_limit=${_per_page}&apiKey=${API_KEY}`).pipe(
      tap((res) => {
        this.movies$.next(res);
      }),
      catchError((err) => {
        // handle error and return a more specific error message
        const errorMessage = err?.error?.message ?? 'An error occurred.';
        return throwError(errorMessage);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/movies/${id}/?i=${id}&apiKey=${API_KEY}`);
  }
  search(term: any): Observable<any[]> {
    // TODO: make sure the backend is ready for this
    return this.apiService.get(`/api/products?name=${term}`).pipe(
      tap((res: any) => {
        console.log('MoviesSerivce [search]: res', res);
        const movies = res.movies;
        this.movies$.next(movies);
      })
    );
  }
}
