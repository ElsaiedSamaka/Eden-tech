import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ViewsModule } from './views/views.module';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailedComponent } from './components/detailed/detailed.component';

@NgModule({
  imports: [
    CommonModule,
    ViewsModule,
    SharedModule,
    HomeRoutingModule 
  ],
  declarations: [IndexComponent,NotFoundComponent,DetailedComponent],
})
export class HomeModule { }
