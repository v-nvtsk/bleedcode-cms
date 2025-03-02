import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ActivatedRoute, Router,
} from '@angular/router';
import {Store} from '@ngrx/store';
import {
  Observable, Subscription,
} from 'rxjs';
import {
  ReactiveFormsModule, FormGroup, FormControl,
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';
import {
  TasksActions, TasksSelectors,
} from '../../services/store/tasks';
import {Task} from '@/types';
import {TagsComponent} from '../../components/tags/tags.component';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TextFieldModule,
    // MonacoEditorModule,
    TagsComponent,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  private route = inject(ActivatedRoute);

  private store = inject(Store);

  private cdr = inject(ChangeDetectorRef);

  private taskId: number;

  task$: Observable<Task | null>;

  editedTaskForm: FormGroup;

  private subscription: Subscription = new Subscription();

  task: Task | null = null;

  isNewTask = false;

  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
  };

  constructor() {
    if (this.route.snapshot.paramMap.get('id') === null) {
      this.isNewTask = true;
    }
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task$ = this.store.select(TasksSelectors.selectCurrentTask);
    this.store.dispatch(TasksActions.getTask({id: this.taskId}));
    this.editedTaskForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      examples: new FormControl(''),
      category: new FormControl(''),
      difficulty: new FormControl(''),
      tags: new FormControl(''),
      additional_materials: new FormControl(''),
      code: new FormControl(''),
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.task$.subscribe((task) => {
        if (task) {
          this.task = task; // Сохраняем задачу для использования в шаблоне
          this.editedTaskForm.patchValue({
            title: task.title,
            description: task.description,
            examples: task.examples,
            category: task.category,
            difficulty: task.difficulty,
            tags: task.tags?.join(','),
            additional_materials: task.additional_materials?.join(','),
            code: task.code,
          });
          this.cdr.markForCheck();
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onTagsUpdated(tags: string[]) {
    this.editedTaskForm.get('tags')?.setValue(tags.join(','));
    this.cdr.markForCheck();
  }

  saveChanges() {
    const formValue = this.editedTaskForm.value;
    const updatedTask: Task = {
      id: this.taskId,
      title: formValue.title,
      description: formValue.description,
      examples: formValue.examples,
      category: formValue.category,
      difficulty: formValue.difficulty,
      tags: formValue.tags ? formValue.tags.split(',') : [],
      additional_materials: formValue.additional_materials ? formValue.additional_materials.split(',') : [],
      code: formValue.code,
    };

    if (this.isNewTask) {
      this.store.dispatch(TasksActions.createTask({task: updatedTask}));
    }
    else {
      this.store.dispatch(TasksActions.updateTask({task: updatedTask}));
    }
    this.router.navigate(['/tasks']);
  }

  cancelChanges() {
    this.router.navigate(['/tasks']);
  }
}
