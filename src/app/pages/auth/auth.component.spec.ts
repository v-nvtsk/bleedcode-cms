import {
  ComponentFixture, TestBed,
} from '@angular/core/testing';
import {AuthComponent} from './auth.component';
import {
  MockStore, provideMockStore,
} from '@ngrx/store/testing';
import {
  provideRouter, Router,
} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthActions} from '@/app/services/store/auth';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: MockStore;
  let router: Router;
  const initialState = {auth: {
    isInitialized: false,
    isAuthenticated: false,
    hasError: false,
    errorMessage: '',
    user: null,
  }};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent], // Импортируем standalone-компонент
      providers: [
        provideMockStore({initialState}),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {queryParams: {returnUrl: '/dashboard'}}},
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router);
    // Шпионим за dispatch и navigate
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with observables from store', () => {
    expect(component.isAuthenticated$).toBeDefined();
    expect(component.isInitialized$).toBeDefined();
    expect(component.errorMessage$).toBeDefined();
  });
  it('should dispatch login action on form submit with valid data', () => {
    // Устанавливаем значения формы
    component.form.setValue({
      username: 'testuser',
      password: 'testpass',
    });
    expect(component.form.valid).toBeTrue();
    // Вызываем handleSubmit
    component.handleSubmit();
    // Проверяем, что dispatch вызван с правильным действием
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({
        username: 'testuser',
        password: 'testpass',
      }),
    );
  });
  it('should not dispatch login action if form is invalid', () => {
    // Устанавливаем невалидные значения
    component.form.setValue({
      username: '',
      password: '',
    });
    expect(component.form.valid).toBeFalse();
    // Вызываем handleSubmit
    component.handleSubmit();
    // Проверяем, что dispatch не вызван
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
