export interface TaskModel {
  title: string;
  dueDate: string;
  description: string;
  priority: string;
  id: number,
  checked: boolean
}

export type TaskModelUpdate = Omit<TaskModel, 'id'>;
export type TaskModelOption = Partial<TaskModel>
