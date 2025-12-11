import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const priorityColors = {
  LOW: 'bg-blue-500/10 text-blue-500',
  MEDIUM: 'bg-yellow-500/10 text-yellow-500',
  HIGH: 'bg-orange-500/10 text-orange-500',
  CRITICAL: 'bg-red-500/10 text-red-500',
};

const statusColors = {
  TODO: 'bg-gray-500/20 text-gray-400',
  IN_PROGRESS: 'bg-blue-500/20 text-blue-400',
  UNDER_REVIEW: 'bg-purple-500/20 text-purple-400',
  DONE: 'bg-green-500/20 text-green-400',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formattedDate = new Date(task.duedate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="card hover:border-primary transition-colors cursor-pointer group flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs px-2 py-1 rounded font-medium ${priorityColors[task.priority] || 'bg-gray-700 text-gray-300'}`}>
            {task.priority}
          </span>
          {/* Actions could go here */}
        </div>
        
        <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">{task.title}</h3>
        <p className="text-secondary text-sm mb-4 line-clamp-3">{task.description}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-secondary pt-4 border-t border-border mt-auto" style={{borderColor: 'var(--border-color)'}}>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{formattedDate}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded font-medium ${statusColors[task.status] || 'bg-gray-700'}`}>
            {task.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
