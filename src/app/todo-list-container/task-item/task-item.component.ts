import {Component, OnInit, Input} from '@angular/core';
import {TaskModel} from "../interface/task.model";
import {TodoTaskService} from "../todo-task.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less']
})
export class TaskItemComponent implements OnInit {
  @Input() todoInput!: TaskModel;
  completed = false;
  detail: boolean = false;

  constructor(private todoTaskService: TodoTaskService) {
  }

  ngOnInit(): void {
  }


  onChangeSelection(event: any) {
    this.todoInput.checked = !this.todoInput.checked;
  }

  removeTask() {
    this.todoTaskService.removeTask(this.todoInput);
  }
}
