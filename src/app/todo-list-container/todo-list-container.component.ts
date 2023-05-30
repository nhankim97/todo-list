import { Component, OnInit } from '@angular/core';
import {TodoTaskService} from "./todo-task.service";

@Component({
  selector: 'app-todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.less']
})
export class TodoListContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
