import React from 'react';
import { Calendar } from 'lucide-react';

const priorityConfig = {
  LOW: { color: 'text-info', bg: 'rgba(56, 189, 248, 0.1)' },
  MEDIUM: { color: 'text-warning', bg: 'rgba(245, 158, 11, 0.1)' },
  HIGH: { color: 'text-danger', bg: 'rgba(239, 68, 68, 0.1)' },
  CRITICAL: { color: 'text-danger', bg: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)' },
};

const statusConfig = {
  TODO: { label: 'To Do', color: 'text-secondary', bg: 'rgba(148, 163, 184, 0.1)' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-primary', bg: 'rgba(99, 102, 241, 0.1)' },
  UNDER_REVIEW: { label: 'Review', color: 'text-warning', bg: 'rgba(245, 158, 11, 0.1)' },
  DONE: { label: 'Done', color: 'text-success', bg: 'rgba(34, 197, 94, 0.1)' },
};

const TaskCard = ({ task }) => {
  const formattedDate = new Date(task.duedate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  const pConfig = priorityConfig[task.priority] || priorityConfig.LOW;
  const sConfig = statusConfig[task.status] || statusConfig.TODO;

  return (
    <div className="card card-interactive flex flex-col justify-between h-full bg-primary group " style={{marginBottom: '1rem'}}>
      <div>
        <div className="flex justify-between items-start mb-4 ">
          <span 
            className={`badge ${pConfig.color}`} 
            style={{ backgroundColor: pConfig.bg, border: pConfig.border }}
          >
            {task.priority}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-white group-hover:text-primary transition-colors">
            {task?.title}
        </h3>
        <p className="text-secondary text-sm mb-6 line-clamp-3 leading-relaxed">
            {task?.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2 text-secondary">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
        <span 
            className={`badge ${sConfig.color}`}
            style={{ backgroundColor: sConfig.bg }}
        >
            {sConfig?.label}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
