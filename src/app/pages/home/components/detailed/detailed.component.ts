import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  movieDetails: any = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMovie();
   }
  
  getMovie() {
    this.route.data.subscribe((data:any) => {
     this.movieDetails = data.movie
    });
  }
}
