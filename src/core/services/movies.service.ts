import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';

const API_KEY = '4680a5e8';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies$ = new BehaviorSubject<any[]>([]);
  moviesCount$ = new BehaviorSubject<number>(0);
  constructor(private apiService: ApiService) {}

  getAll(_page: number = 1, _per_page: number = 5,term:string=''): Observable<any[]> {
    return this.apiService.get(`/movies/?q=${term}&_page=${_page}&_limit=${_per_page}&apiKey=${API_KEY}`).pipe(
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
  getCount(): Observable<any>{
    return this.apiService.get('/movies').pipe(
      tap((res) => {
        this.moviesCount$.next(res.length);
      })
    )
  }
}
