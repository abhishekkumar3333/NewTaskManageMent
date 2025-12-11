import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { parseJwt } from '../utils/jwt';

const CreateTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'TODO',
    duedate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const decoded = parseJwt(user.token);
      const payload = {
        ...formData,
        assignId: decoded.id, // Assign to self
      };

      const response = await api.post('/task/createtask', payload);
      if (response.data.success) {
        onTaskCreated();
        onClose();
        setFormData({
            title: '',
            description: '',
            priority: 'MEDIUM',
            status: 'TODO',
            duedate: '',
        });
      }
    } catch (error) {
      console.error('Failed to create task', error);
      alert(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Task title"
        />
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-secondary">Description</label>
          <textarea
            className="input-field min-h-[100px]"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Task description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Priority</label>
            <select
              className="input-field"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Status</label>
            <select
              className="input-field"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        </div>

        <Input
          label="Due Date"
          type="date"
          name="duedate"
          value={formData.duedate}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Task'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
