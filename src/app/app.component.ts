import {
  Component, inject, OnInit,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {Store} from '@ngrx/store';
import {AuthActions} from './services/store/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'bleedcode-cms';

  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.initializeAuth());
  }
}
