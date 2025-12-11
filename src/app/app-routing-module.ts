import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskList } from './featurs/task-list/task-list';
import { TaskForm } from './featurs/task-form/task-form';

const routes: Routes = [
  { path: 'task-list', component: TaskList },
  { path: 'task-form', component: TaskForm }, 
  { path: 'tasks/edit/:id', component: TaskForm },
  { path: '', redirectTo: '/task-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
