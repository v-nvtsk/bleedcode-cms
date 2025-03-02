import {
  ComponentFixture, TestBed,
} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {
  ActivatedRoute,
  provideRouter,
} from '@angular/router';
import {
  MockStore, provideMockStore,
} from '@ngrx/store/testing';
import {Store} from '@ngrx/store';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  const initialState = {auth: {
    isInitialized: false,
    isAuthenticated: false,
    hasError: false,
    errorMessage: '',
    user: null,
  }};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideMockStore({initialState}),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {snapshot: '/'},
        },
      ],

    })
      .compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(Store) as MockStore;
    spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
