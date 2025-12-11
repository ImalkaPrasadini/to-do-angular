import { computed, Injectable, signal } from '@angular/core';
import { TaskInterface } from '../app/shared/task-interface';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskModel {
    private tasks: TaskInterface[] = [
    {
      id: 1,
      title: 'Fix login bug',
      description: 'Users are unable to log in when entering correct credentials',
      status: 'Done',
      createdAt: new Date('2024-03-15T14:05:00')
    },
    {
      id: 2,
      title: 'Implement search',
      description: 'Add search functionality to the app',
      status: 'In Progress',
      createdAt: new Date('2024-03-16T10:15:00')
    },
    {
      id: 3,
      title: 'Update documentation',
      description: 'Update app documentation to reflect the new changes',
      status: 'Pending',
      createdAt: new Date('2024-03-17T09:00:00')
    },
    {
      id: 4,
      title: 'Update data',
      description: 'Update app documentation to reflect the new changes',
      status: 'Pending',
      createdAt: new Date('2024-03-17T09:00:00')
    },
    {
      id: 5,
      title: 'Add data',
      description: 'Update app documentation to reflect the new changes',
      status: 'Pending',
      createdAt: new Date('2024-03-17T09:00:00')
    },
    {
      id: 6,
      title: 'New Add data',
      description: 'Update app documentation to reflect the new changes',
      status: 'Pending',
      createdAt: new Date('2024-03-17T09:00:00')
    }
  ];

  tasksSignal = signal<TaskInterface[]>(this.tasks);

    //managing state and sharing data between components
  // private tasksSubject = new BehaviorSubject<TaskInterface[]>(this.tasks);

  // getAllTask(){
  //   return this.tasksSubject.asObservable();
  // }

  //get all data
  getAllTask(){
    return this.tasksSignal;
  }

  //data by id

  // getTaskById(id: number): Observable<any>{
  //   return this.tasksSubject.pipe(
  //     map(tasks => tasks.find(task => task.id === id)));
  // }

  getTaskById(id: number) {
    return this.tasksSignal().find(t => t.id === id);
  }

  //add new

  // addTask(task: TaskInterface){
  //   this.tasks.push(task);
  //   this.tasksSubject.next(this.tasks);
  // }

  addTask(task: TaskInterface){
    this.tasksSignal.update(tasks => [...tasks, task]);
  }

  //update

  // editTask(updateTask: TaskInterface){
  //   const index = this.tasks.findIndex(t => t.id === updateTask.id);
  //   if(index > -1){
  //     this.tasks[index] = updateTask;
  //     this.tasksSubject.next(this.tasks);
  //   }
  // }


  // editTask(updateTask: TaskInterface){
  //   this.tasksSignal.update(tasks => [...tasks, updateTask]);

  // }


  editTask(updatedTask: TaskInterface) {
  this.tasksSignal.update(tasks =>
    tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
}

  //delete
  // deleteTask(id: number){
  //   this.tasks = this.tasks.filter(t => t.id !== id);
  //   this.tasksSubject.next(this.tasks);
  // }



  deleteTask(id: number){
    this.tasksSignal.update(tasks => tasks.filter( t => t.id !== id));
  }

}
