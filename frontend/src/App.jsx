import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import ProtectedRoute from './components/ProtectedRoute';
import CreateTaskModal from './components/CreateTaskModal';
import Layout from './components/Layout';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <CreateTaskModal 
        isOpen={true} 
        onClose={() => navigate('/')} 
        onTaskCreated={() => navigate('/')} 
      />
    </Layout>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <Teams />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <CreateTaskPage />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/projects"
        element={<Navigate to="/teams" replace />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
