import { Injectable } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieResolverService {
  constructor(
    private moviesService: MoviesService,
    private router: Router,
  ) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id') || '';
    return this.moviesService.getById(id).pipe(
      catchError((err) => {
        console.log(err);
        this.router.navigateByUrl('/not-found');
        return of(null);
      }),
    );
  }
}
