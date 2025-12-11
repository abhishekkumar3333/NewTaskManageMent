import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-dark">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto w-full" style={{ marginLeft: '280px' }}>
        <div className="max-w-6xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
