import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy, Component,
  inject,
} from '@angular/core';
import {
  MatChip, MatChipSet,
} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {Store} from '@ngrx/store';
import {
  TasksActions, TasksSelectors,
} from '@/app/services/store/tasks';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, MatChipSet, MatChip, MatExpansionModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  private store = inject(Store);

  private router = inject(Router);

  tasks$ = this.store.select(TasksSelectors.selectTasks);

  categories$ = this.store.select(TasksSelectors.getAllCategories);

  constructor() {
    this.store.dispatch(TasksActions.loadTasks());
    this.store.dispatch(TasksActions.getAllCategories());
  }

  editTask(id: number) {
    this.router.navigate([`/task/${id}`]);
  }

  deleteTask(id: number) {
    this.store.dispatch(TasksActions.deleteTask({id}));
  }

  addNewTask() {
    this.router.navigate([`/task/new`]);
  }
}
