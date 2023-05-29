import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.less']
})
export class TaskUpdateComponent implements OnInit {
  updateTaskForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    dueDate: [moment().format('YYYY-MM-DD'), this.validateDueDate.bind(this)],
    description: [null],
    priority: ['normal']
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
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
      return
    }
    console.log(this.updateTaskForm.getRawValue());
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
