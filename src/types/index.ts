
export type PriorityLevel = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: PriorityLevel;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
}

export type ColumnType = {
  id: TaskStatus;
  title: string;
  tasks: Task[];
};
