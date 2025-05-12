
import { Task, TaskStatus, PriorityLevel } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Create a new task
export const createTask = (
  title: string,
  description: string,
  priority: PriorityLevel = 'medium',
  dueDate: string | null = null,
  status: TaskStatus = 'todo'
): Task => {
  return {
    id: generateId(),
    title,
    description,
    priority,
    status,
    dueDate,
    createdAt: new Date().toISOString(),
  };
};

// Get tasks from local storage or return default tasks
export const getInitialTasks = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  
  // Default tasks if nothing in localStorage
  return [
    createTask(
      'Complete project proposal',
      'Write and submit the proposal for the new client project.',
      'high',
      '2025-05-20',
      'todo'
    ),
    createTask(
      'Design meeting',
      'Discuss the new design system with the team.',
      'medium',
      '2025-05-15',
      'todo'
    ),
    createTask(
      'Update documentation',
      'Update the API documentation with the new endpoints.',
      'low',
      '2025-05-25',
      'inProgress'
    ),
    createTask(
      'Code review',
      'Review pull request #42 for the dashboard feature.',
      'medium',
      '2025-05-14',
      'inProgress'
    ),
    createTask(
      'Weekly report',
      'Complete the weekly progress report for stakeholders.',
      'high',
      '2025-05-12',
      'done'
    ),
  ];
};

// Save tasks to local storage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Get formatted date
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get color for priority
export const getPriorityColor = (priority: PriorityLevel): string => {
  switch (priority) {
    case 'low':
      return 'bg-priority-low';
    case 'medium':
      return 'bg-priority-medium';
    case 'high':
      return 'bg-priority-high';
    default:
      return 'bg-priority-medium';
  }
};

// Group tasks by status
export const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
  return {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'inProgress'),
    done: tasks.filter(task => task.status === 'done'),
  };
};
