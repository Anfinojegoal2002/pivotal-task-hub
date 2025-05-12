
import React from 'react';
import Header from '../components/Header';
import TaskBoard from '../components/TaskBoard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-6">
        <TaskBoard />
      </main>
    </div>
  );
};

export default Index;
