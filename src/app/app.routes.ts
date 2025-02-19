import { Routes } from '@angular/router';
import { MoviesComponent } from './features/movies/movies.component';
import { MovieDetailComponent } from './features/movies/movie-detail/movie-detail.component';

export const routes: Routes = [
    {path:'movies',component: MoviesComponent},
    {path:':movieId',component: MovieDetailComponent},

];
