import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TodoTaskService} from "../todo-task.service";
import {TaskModel} from "../interface/task.model";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-tasks-management',
  templateUrl: './tasks-management.component.html',
  styleUrls: ['./tasks-management.component.less']
})
export class TasksManagementComponent implements OnInit, OnDestroy {
  taskRecords: Array<TaskModel> = [];
  searchForm: FormGroup = this.fb.group({
    search: ['']
  })

  constructor(private fb: FormBuilder,
              private todoTaskService: TodoTaskService) {
  }

  ngOnInit(): void {
    this.fetchTodoList();
    this.todoTaskService.reloadListSign.subscribe(() => {
      this.fetchTodoList();
    })
    this.searchForm.controls['search'].valueChanges.pipe(
      debounceTime(500), distinctUntilChanged(),
    ).subscribe(value =>{
      this.taskRecords = this.todoTaskService.loadListTaskFromLocalStore(value);
    })
  }


  fetchTodoList() {
    this.taskRecords = this.todoTaskService.loadListTaskFromLocalStore();
  }

  get hasSelected(): boolean {
    return this.taskRecords.length && this.taskRecords.some(e => e.checked) || false
  }

  ngOnDestroy() {
    this.todoTaskService.reloadListSign.unsubscribe();
  }

  removeMulti() {
    const listSelected = this.taskRecords.filter(e => e.checked)
    this.todoTaskService.removeListTask(listSelected.map(e => e.id));
  }
}
