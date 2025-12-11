import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../../services/task-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskInterface } from '../../shared/task-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {

  // @Input() taskToEdit: any;
  taskToEdit: any;
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  editIdIn: number = 0;
  message: string | null = null;
  messageType: string = 'success'; // default

  statusOptions = ['Open', 'Inprogress', 'Done'];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskModel,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log("task form log")
  }


  ngOnInit() {
    // this.isEditMode = !!this.taskToEdit;
    this.initFrom();

    this.route.paramMap.subscribe(params => {
      const editId = params.get('id');
      console.log("id from", editId)

      if (editId) {
        this.isEditMode = true;
        this.editIdIn = +editId;
        this.loadTaskData(this.editIdIn);
      } else {
        this.getCreatedDate();
      }

    });
  }

  initFrom(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      status: ['Open', [Validators.required]],
      createdAt: [null]
    });
  }
  /** Helper to quickly access form controls for validation checks in HTML. */
  get formControls() {
    return this.taskForm.controls;
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const fromData = this.taskForm.getRawValue();

    if (this.isEditMode) {
      this.taskService.editTask(fromData);
      console.log("task updated sucessfully");
      this.showMessage('Task updated successfully!', 'success');
    } else {
      this.taskService.addTask(fromData);
      console.log("Task added sucessfully");
      this.showMessage('Task created successfully!', 'success');
    }
  }

  getCreatedDate(): void {
    const now = new Date().toISOString();
    this.taskForm.controls['createdAt'].setValue(now);
    this.taskForm.controls['createdAt'].disable();
  }

  loadTaskData(id: number): void {
    const taskData = this.taskService.getTaskById(id);

    if (!taskData) {
      console.error('Task not found');
      return;
    }

    this.taskToEdit = taskData;
    this.taskForm.patchValue(taskData);
  }

  onCancel() {
    this.router.navigate(['task-list']);
  }

  showMessage(msg: string, type: 'success' | 'warning' | 'error') {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
