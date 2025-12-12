import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/task/getalltask');
      if (response.data.sucess || response.data.success) {
        setTasks(response.data.task);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = (deletedTaskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-secondary">Welcome back! Here's an overview of your tasks.</p>
        </div>
    
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p>loading...........</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-secondary rounded-lg border border-border" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)'}}>
              <p className="text-secondary mb-4">No tasks found.</p>
            </div>
          )}
        </div>
      )}

    </Layout>
  );
};

export default Dashboard;
