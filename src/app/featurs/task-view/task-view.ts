import { Component, computed, Inject, signal } from '@angular/core';
import { TaskInterface } from '../../shared/task-interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from '../../../services/task-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  standalone: false,
  templateUrl: './task-view.html',
  styleUrl: './task-view.css',
})
export class TaskView {
  taskDetails: TaskInterface | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  rawDate: any;
  message: string | null = null;
  messageType: string = 'success'; // default

  constructor(
    public dialogRef: MatDialogRef<TaskView>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private taskService: TaskModel,
    private snacBar: MatSnackBar,
    private route: Router
  ){}

  ngOnInit(): void {
    if(this.data.taskId){
      this.viewById(this.data.taskId);
    }else{
      this.error = 'no Task found for given Id';
      this.isLoading = false;
    }
  }

//task by id
viewById(id: number): void {
  this.isLoading = true;

  const task = this.taskService.getTaskById(id); 

  if (!task) {
    this.error = "Task not found";
    this.isLoading = false;
    return;
  }

  this.taskDetails = task;
  this.rawDate = signal(task.createdAt);
  
  this.isLoading = false;
}


//delete task
deletetask(task: any){
  console.log("delete win",task.id);
  this.taskService.deleteTask(task.id);
  this.dialogRef.close();
  this.showMessage('Task deleted successfully!', 'success');
}

//edit task 
editTask(task: any){
  console.log("edit task",task);
  this.route.navigate(['/tasks/edit', task.id]);
  this.dialogRef.close();
}

goBack(){
  this.dialogRef.close();
}

formattedDate = computed(() => {
  const date = new Date(this.rawDate());

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
});

//pop up msg
showMessage(msg: string, type: 'success' | 'warning' | 'error') {
  this.message = msg;
  this.messageType = type;

  setTimeout(() => {
    this.message = null;
  }, 3000); 
}
}
 