import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoListContainerComponent} from './todo-list-container/todo-list-container.component';
import {TaskUpdateComponent} from './todo-list-container/task-update/task-update.component';
import {TasksManagementComponent} from './todo-list-container/tasks-mangement/tasks-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TaskItemComponent } from './todo-list-container/task-item/task-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListContainerComponent,
    TaskUpdateComponent,
    TasksManagementComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
