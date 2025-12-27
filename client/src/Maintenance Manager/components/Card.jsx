import React from 'react';

const Card = ({ item, onDragStart, type }) => {
  const getCardClass = () => {
    switch (type) {
      case 'progress':
        return 'p-4 border-2 bg-yellow-100 hover:bg-yellow-200 border-yellow-400 rounded-xl shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200';
      case 'repaired':
        return 'p-4 border-2 bg-green-100 hover:bg-green-200 border-green-400 rounded-xl shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200';
      case 'overdue':
        return 'p-4 border-2 bg-red-100 hover:bg-red-200 border-red-400 rounded-xl shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200';
      default:
        return 'p-4 border-2 bg-white hover:bg-gray-50 border-gray-300 rounded-xl shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, item, type)}
      className={getCardClass()}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
        {item.priority && (
          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getPriorityColor(item.priority)}`}>
            {item.priority}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-600 mb-2">{item.equipment}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{item.location}</span>
        <span>{item.assignedTo || 'Unassigned'}</span>
      </div>
    </div>
  );
};

export default Card;
