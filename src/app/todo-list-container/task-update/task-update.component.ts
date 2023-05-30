import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {TodoTaskService} from "../todo-task.service";
import {TaskModel} from "../interface/task.model";

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.less']
})
export class TaskUpdateComponent implements OnInit {
  @Input() detailTask?: TaskModel;
  @Input() actionType?: string
  updateTaskForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    dueDate: [moment().format('YYYY-MM-DD'), this.validateDueDate.bind(this)],
    description: [null],
    priority: ['normal']
  });

  constructor(private fb: FormBuilder,
              private todoTaskService: TodoTaskService,
  ) {
  }

  ngOnInit(): void {
    if (this.actionType == 'update' && this.detailTask) {
      this.updateTaskForm.patchValue(this.detailTask);
    }
  }

  markAsTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      }
      if (control.controls) {
        this.markAsTouched(control);
      }
    });
  }

  isEmpty(value: unknown) {
    return value === void (0) || value === null || value === '';
  }

  get formControl(): { [p: string]: AbstractControl } {
    return this.updateTaskForm.controls;
  }

  save() {
    this.markAsTouched(this.updateTaskForm);
    if (this.updateTaskForm.invalid) {
      return;
    }

    const data: TaskModel = this.actionType === 'update' && this.detailTask ? {...this.updateTaskForm.getRawValue(), id: this.detailTask.id} : this.updateTaskForm.getRawValue();
    this.todoTaskService.saveToLocalStore(data, this.actionType || 'create');
    if (!this.actionType || this.actionType !== 'update') {
      this.updateTaskForm.reset();
      this.updateTaskForm.patchValue({
        dueDate: moment().format('YYYY-MM-DD'),
        priority: 'normal'
      })
    }

  }

  validateDueDate(control: FormControl): any {
    if (!control || this.isEmpty(control.value)) {
      return null;
    }
    const value = moment(control.value, 'YYYY-MM-DD').isBefore(moment(), 'days');
    return value ? {
      beforeNow: true
    } : null
  }

}
