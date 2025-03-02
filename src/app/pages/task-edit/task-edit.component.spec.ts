import {
  ComponentFixture, TestBed,
} from '@angular/core/testing';
import {TaskEditComponent} from './task-edit.component';
import {provideMockStore} from '@ngrx/store/testing';
import {
  ActivatedRoute, provideRouter,
} from '@angular/router';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {provideNoopAnimations} from '@angular/platform-browser/animations';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;
  const initialState = {
    auth: {
      isInitialized: false,
      isAuthenticated: false,
      hasError: false,
      errorMessage: '',
      user: null,
    },
    tasks: {
      isLoading: false,
      hasError: false,
      errorMessage: '',
      tasks: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditComponent],
      providers: [
        provideMockStore({initialState}),
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: {get: () => '1'}}},
        },
        {
          provide: MonacoEditorModule,
          useValue: MonacoEditorModule,
        },
       
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
