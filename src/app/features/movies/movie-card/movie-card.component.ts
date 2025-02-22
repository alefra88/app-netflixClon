import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../models/movie.interface';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  ImageError = false;
  getImageUrl():string{
    const baseUrl = 'https://image.tmdb.org/t/p/w500'
    return this.ImageError ? 'placeholder.svg' : `${baseUrl}/${this.movie().poster_path}`
  };

  setImageError(value: boolean):void{
    this.ImageError = value;

  };
}
