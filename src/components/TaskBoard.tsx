
import React, { useState, useEffect } from 'react';
import { Task, ColumnType, TaskStatus } from '../types';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import { Button } from '@/components/ui/button';
import { getInitialTasks, saveTasks } from '../utils/taskUtils';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const initialTasks = getInitialTasks();
    setTasks(initialTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const handleAddTask = () => {
    setCurrentTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (task.id && tasks.some((t) => t.id === task.id)) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      toast.success('Task updated successfully');
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, task]);
      toast.success('Task created successfully');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success('Task deleted successfully');
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (taskId: string, columnId: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, status: columnId };
          return updatedTask;
        }
        return task;
      })
    );
    toast.success('Task moved successfully');
  };

  const columns: ColumnType[] = [
    { id: 'todo', title: 'To Do', tasks: tasks.filter((task) => task.status === 'todo') },
    { id: 'inProgress', title: 'In Progress', tasks: tasks.filter((task) => task.status === 'inProgress') },
    { id: 'done', title: 'Done', tasks: tasks.filter((task) => task.status === 'done') },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
        <Button onClick={handleAddTask} className="flex items-center">
          <Plus className="h-4 w-4 mr-1" /> Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
            onTaskEdit={handleEditTask}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={currentTask}
      />
    </div>
  );
};

export default TaskBoard;
