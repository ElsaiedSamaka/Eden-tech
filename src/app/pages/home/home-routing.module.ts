import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { MovieResolverService } from 'src/core/resolvers/movie-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: ':id',
    component: DetailedComponent,
    resolve: { movie: MovieResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
