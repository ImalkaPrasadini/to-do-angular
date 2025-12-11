// import { ComponentFixture, TestBed } from '@angular/core/testing';
// // import { TaskList2 } from './task-list2.component';

// import { ActivatedRoute } from '@angular/router';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { TaskModel } from './task-model';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HttpClient } from '@angular/common/http';
// import { TaskInterface } from '../app/shared/task-interface';

// describe('TaskModel (Service)', () => {
//   let service: TaskModel;
//   let httpClient: any;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       // declarations: [TaskList2],
//       imports: [
//         MatDialogModule,
//         // MatFormFieldModule,
//         // MatInputModule,
//         // RouterTestingModule,
//         HttpClientTestingModule
        
//       ],
//       providers: [
//         TaskModel,
//         // Mock ActivatedRoute
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               paramMap: {
//                 get: (key: string) => '1'
//               }
//             }
//           }
//         },

//         // Mock MatDialogRef
//         {
//           provide: MatDialogRef,
//           useValue: { close: () => {} }
//         },

//         // If dialog sends data
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {}
//         }
//       ]
//     }).compileComponents();

//     service = TestBed.inject(TaskModel);
//     httpClient = TestBed.inject(httpClient);
//     // fixture = TestBed.createComponent(TaskList2);
//     // component = fixture.componentInstance;
//     // fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return the task by ID', () =>{
//     const task = service.getTaskById(1);
//     expect(task).toEqual(service.tasksSignal().find(t => t.id ===1));
//   });
  
//   it('should return all tasks', () => {
//     const tasks = service.getAllTask();
//     expect(tasks).toEqual(service.tasksSignal());
//   });

//   // it('should add a new task', () => {
//   //   const newTask: TaskInterface = {
//   //     id: 7,
//   //     title: 'New Task',
//   //     description: 'A new task description',
//   //     status: 'Pending',
//   //     createdAt: new Date()
//   //   };

//   //   service.addTask(newTask);
//   //   const tasks = service.getAllTask();
//   //   expect(tasks.length).toBe(7);
//   //   // expect(tasks[tasks.length - 1]).toEqual(newTask);
//   // });

// });
import { TestBed } from '@angular/core/testing';
import { TaskModel } from './task-model';
import { TaskInterface } from '../app/shared/task-interface';

// describe('TaskModel (Service)', () => {

// to run only this tests
fdescribe('TaskModel (Service)', () => {
  let service: TaskModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskModel]
    });

    service = TestBed.inject(TaskModel);
  });

  // ✅ 1. Service creation
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ✅ 2. Get all tasks
  it('should return all tasks', () => {
    expect(service.tasksSignal().length).toBe(6);
  });

  // ✅ 3. Get task by ID
  it('should return task by ID', () => {
    const task = service.getTaskById(1);
    expect(task?.title).toBe('Fix login bug');
  });

  // ✅ 4. Add task
  it('should add a new task', () => {
    const newTask: TaskInterface = {
      id: 7,
      title: 'New Task',
      description: 'Test task',
      status: 'Pending',
      createdAt: new Date()
    };

    service.addTask(newTask);

    expect(service.tasksSignal().length).toBe(7);
    expect(service.tasksSignal()[6]).toEqual(newTask);
  });

  // ✅ 5. Edit task
  it('should update an existing task', () => {
    const updatedTask: TaskInterface = {
      id: 1,
      title: 'Login bug fixed',
      description: 'Updated',
      status: 'Done',
      createdAt: new Date()
    };

    service.editTask(updatedTask);

    const task = service.getTaskById(1);
    expect(task?.title).toBe('Login bug fixed');
    expect(task?.status).toBe('Done');
  });

  // ✅ 6. Delete task
  it('should delete a task', () => {
    service.deleteTask(1);

    expect(service.getTaskById(1)).toBeUndefined();
    expect(service.tasksSignal().length).toBe(5);
  });

});
