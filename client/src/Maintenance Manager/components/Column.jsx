import React from 'react';

const Column = ({ title, type, children, onDrop }) => {
  const getColumnColor = () => {
    switch (type) {
      case 'new':
        return 'border-blue-200 bg-blue-50/50';
      case 'progress':
        return 'border-yellow-200 bg-yellow-50/50';
      case 'repaired':
        return 'border-green-200 bg-green-50/50';
      case 'overdue':
        return 'border-red-200 bg-red-50/50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div
      className={`rounded-2xl border-2 p-4 flex flex-col shadow-sm ${getColumnColor()}`}
      onDragOver={e => e.preventDefault()}
      onDrop={e => onDrop(e, type)}
    >
      <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
        <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full mr-3"></span>
        {title}
      </h3>
      <div className="space-y-3 min-h-[400px]">
        {children}
      </div>
    </div>
  );
};

export default Column;
