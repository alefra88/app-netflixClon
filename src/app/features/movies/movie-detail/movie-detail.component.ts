import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent {
 movieId = input.required<string>();
}
