import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieRespose } from '../models/movie.interface';
import { enviroment } from '../../../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  

  movies = signal<Movie[]>([]);
  trendingMovie = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);
  private readonly _apiKey = enviroment.apiKey;
  private readonly _apiUrl = enviroment.apiUrl;
  private readonly _http = inject(HttpClient);

  //variables de paginación
  currentPage = signal<number>(1);
  hasMorePages = signal<boolean>(true);
  isLoading = signal<boolean>(false);

  GetMovieById(movieId: string):Observable<MovieRespose>{
    return this._http.get<MovieRespose>(`${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`)
    
  }

  GetMovies(): Observable<Movie[]> {
    return this._http.get<MovieRespose>(`${this._apiUrl}/movie/popular?api_key=${this._apiKey}`)
      .pipe(
        map(response => {
          const currentMovies = this.movies();
          //logica para paginación
          const newMovies = [...currentMovies, ...response.results];
          this.movies.set(newMovies);
          this.hasMorePages.set(response.page<response.total_pages);
          this.currentPage.update((currentPage)=>currentPage+1);
          this.isLoading.set(false);
          return newMovies;
        })
      );
  }
}
