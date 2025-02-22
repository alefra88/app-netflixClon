import { Component, computed, effect, HostListener, inject, OnInit } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Movie } from './models/movie.interface';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';


@Component({
  selector: 'app-movies',
  imports: [
    MovieCardComponent,
    RouterLink
  ],
  templateUrl: './movies.component.html'
})
export class MoviesComponent {

  isLoading = computed(()=>
    this.movieService.isLoading()
  )
  hasMorePages = computed(()=> this.movieService.hasMorePages());

  private movieService = inject(MoviesService);
     
  movies = toSignal(this.movieService.GetMovies());
  

  @HostListener('window:scroll')
  onScroll():void{
    if(this.isLoading() || !this.hasMorePages()){return;}
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThrehold = document.documentElement.scrollHeight;
    if(scrollPosition>=scrollThrehold){
      this.movieService.GetMovies();
    }
  }
}
