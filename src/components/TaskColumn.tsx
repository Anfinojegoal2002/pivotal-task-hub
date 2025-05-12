
import React from 'react';
import { ColumnType, Task } from '../types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  column: ColumnType;
  onTaskEdit: (task: Task) => void;
  onDrop: (taskId: string, columnId: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, onTaskEdit, onDrop, onDragStart }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData('taskId');
    onDrop(taskId, column.id);
  };

  return (
    <div 
      className="bg-gray-50 rounded-lg p-4 w-full min-w-[300px] max-w-sm"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700">{column.title}</h2>
        <span className="text-xs font-medium bg-gray-200 text-gray-600 rounded-full px-2 py-1">
          {column.tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onTaskEdit} 
            onDragStart={onDragStart} 
          />
        ))}
        
        {column.tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm border border-dashed border-gray-200 rounded-md">
            Drag tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
