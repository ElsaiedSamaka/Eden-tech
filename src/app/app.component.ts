import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  constructor(
    private loadingService: LoadingService,
  ) {
    this.loading$ = this.loadingService.loading$;
  }
  ngOnInit() {
  }
}
