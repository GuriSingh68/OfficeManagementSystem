import React from 'react';
import { EventDetails } from '@/app/interface/eventsInterface';
import { TaskInterface } from './TaskList';

interface TaskDetailsComponentProps {
  task: TaskInterface;
  onClose: () => void;
}

const TaskDetailsComponent: React.FC<TaskDetailsComponentProps> = ({ task, onClose }) => {
  return (
    <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{task.taskName}</h1>
      <p className="text-gray-700 mb-4">{task.description}</p>
      <p className="text-gray-700 mb-4">{task.assigned}</p>
      <p className="text-gray-700 mb-4">{task.assignee}</p>
      <p className="text-gray-700 mb-4">{task.start_date}</p>
      <p className="text-gray-700 mb-4">{task.end_date}</p>
      <p className="text-gray-700 mb-4">{task.priority}</p>
      <p className="text-gray-700 mb-4">{task.project}</p>
      <p className="text-gray-700 mb-4">{task.taskName}</p>
      
      <div className="mt-6">
        <button
          onClick={onClose}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsComponent;
