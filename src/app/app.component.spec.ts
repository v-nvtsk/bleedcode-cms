import {
  TestBed, ComponentFixture,
} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterOutlet} from '@angular/router';
import {
  provideMockStore, MockStore,
} from '@ngrx/store/testing';
import {provideRouter} from '@angular/router';
import {Component} from '@angular/core';
import * as AuthActions from './services/store/auth/auth.actions';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'main-header',
  standalone: true,
  template: '', // Пустой шаблон, так как нам не нужен рендеринг
})
class MockHeaderComponent {}
@Component({
  selector: 'main-footer',
  standalone: true,
  template: '',
})
class MockFooterComponent {}
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;
  const initialState = {auth: {
    isInitialized: false,
    isAuthenticated: false,
    hasError: false,
    errorMessage: '',
    user: null,
  }};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        MockHeaderComponent,
        MockFooterComponent,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({initialState}), // Мок Store
        provideRouter([]), // Мок маршрутизации для RouterOutlet
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    // Шпионим за dispatch
    spyOn(mockStore, 'dispatch');
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title "bleedcode-cms"', () => {
    expect(component.title).toBe('bleedcode-cms');
  });
  it('should dispatch initializeAuth on ngOnInit', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.initializeAuth());
  });
  it('should render header, main with router-outlet, and footer', () => {
    const header = fixture.nativeElement.querySelector('main-header');
    const main = fixture.nativeElement.querySelector('main');
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    const footer = fixture.nativeElement.querySelector('main-footer');

    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
    expect(footer).toBeTruthy();
  });
});
