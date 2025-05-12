
import React from 'react';
import { Task } from '../types';
import { formatDate, getPriorityColor } from '../utils/taskUtils';
import { CalendarIcon, Pencil } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDragStart }) => {
  return (
    <div
      className="bg-white rounded-md shadow-sm p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow animate-card-fade-in cursor-grab"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <button 
          onClick={() => onEdit(task)}
          className="text-gray-400 hover:text-purple-500 transition-colors"
          aria-label="Edit task"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(task.priority)}`}></div>
          <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {formatDate(task.dueDate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
