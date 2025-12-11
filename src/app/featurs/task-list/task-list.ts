import { Component } from '@angular/core';
import { TaskInterface } from '../../shared/task-interface';
import { TaskModel } from '../../../services/task-model';
import { MatDialog } from '@angular/material/dialog';
import { TaskView } from '../task-view/task-view';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {

  taskList: TaskInterface[] = [];
  searchQuery: string = '';
  sortBy: string = 'title';
  filteredTaskList: TaskInterface[] = [];
  constructor(private taskService: TaskModel, private dialog: MatDialog) { }

  ngOnInit(): void {
    let data = this.taskService.getAllTask();
    this.filteredTaskList = data();
  }

  //open view window
  viewTask(id: number) {
    console.log("number", id);
    this.dialog.open(TaskView, {
      width: '600px',
      data: { taskId: id }
    });
  }

  //to get buttoon color
  getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'done':
        return 'status-done';
      case 'in progress':
        return 'status-inprogress';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  }

  onSearch() {
    console.log('query', this.searchQuery, this.taskList,)
    return this.filteredTaskList = this.filteredTaskList
      .filter((task) => task.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (this.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else if (this.sortBy === 'status') {
          return a.status.localeCompare(b.status);
        }
        return 0;
      });
  }
}
