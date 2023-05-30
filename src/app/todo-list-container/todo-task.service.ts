import {Injectable} from '@angular/core';
import {TaskModel} from "./interface/task.model";
import * as moment from "moment";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {
  reloadListSign = new Subject();
  private readonly TODO_KEY_LOCAL = 'TODO_KEY_LOCAL';

  constructor() {
  }

  saveToLocalStore(item: TaskModel, actionType: string) {
    let currentTodoList = this.loadListTaskFromLocalStore();
    if (currentTodoList) {
      if (actionType === 'update') {
        currentTodoList = currentTodoList.filter(e => e.id !== item.id);
        currentTodoList.push(item);
        this.saveTodoList(currentTodoList);
      } else {
        item.id = Math.random();
        currentTodoList.push(item);
        this.saveTodoList(currentTodoList);
      }
    } else {
      item.id = Math.random();
      this.saveTodoList([item]);
    }
  }

  loadListTaskFromLocalStore(title?: string): Array<TaskModel> {
    const stringList = localStorage.getItem(this.TODO_KEY_LOCAL);
    if (stringList) {
      if (title) {
        const toLocaleLowerCaseTitle = title.toLocaleLowerCase();
        return (JSON.parse(stringList) as Array<TaskModel>).filter(e => e.title.toLocaleLowerCase().includes(toLocaleLowerCaseTitle) || toLocaleLowerCaseTitle.toLocaleLowerCase().includes(e.title));
      } else {
        return JSON.parse(stringList);
      }
    }
    return [];
  }

  private saveTodoList(arr: Array<TaskModel>) {
    arr.sort(function (a, b) {
      return moment(a.dueDate, 'YYYY-MM-DD').isAfter(moment(b.dueDate, 'YYYY-MM-DD')) ? 1 : 0
    })
    const stringList = JSON.stringify(arr);
    localStorage.setItem(this.TODO_KEY_LOCAL, stringList);
    this.reloadListSign.next(Math.random());
  }

  removeTask(item: TaskModel) {
    let currentTodoList = this.loadListTaskFromLocalStore();
    currentTodoList = currentTodoList.filter(e => e.id !== item.id);
    this.saveTodoList(currentTodoList);
  }

  removeListTask(ids: Array<number>) {
    let currentTodoList = this.loadListTaskFromLocalStore();
    currentTodoList = currentTodoList.filter(e => !ids.includes(e.id));
    this.saveTodoList(currentTodoList);
  }
}
