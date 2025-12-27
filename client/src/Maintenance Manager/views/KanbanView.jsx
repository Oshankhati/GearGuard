import React from 'react';
import {
  FiFileText, FiClock, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import Column from '../components/Column';
import Card from '../components/Card';

const KanbanView = ({ columns, handleDrop, handleDragStart }) => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'New Requests', value: columns.new.length, icon: FiFileText, gradient: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50' },
          { title: 'In Progress', value: columns.progress.length, icon: FiClock, gradient: 'from-yellow-600 to-yellow-700', bgColor: 'bg-yellow-50' },
          { title: 'Repaired', value: columns.repaired.length, icon: FiCheckCircle, gradient: 'from-green-600 to-green-700', bgColor: 'bg-green-50' },
          { title: 'Overdue', value: columns.overdue.length, icon: FiAlertCircle, gradient: 'from-red-600 to-red-700', bgColor: 'bg-red-50' }
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.bgColor} rounded-2xl border-2 border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-4">
        <div className="flex items-center space-x-3">
          <FiAlertCircle className="text-violet-600 text-xl flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Drag & Drop:</span> Move request cards between columns to update their status. 
            <span className="font-semibold ml-2">New</span> → <span className="font-semibold">In Progress</span> → <span className="font-semibold">Repaired</span>
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Column title="New" type="new" onDrop={handleDrop}>
          {columns.new.map(item => (
            <Card key={item.id} item={item} onDragStart={handleDragStart} type="new" />
          ))}
        </Column>

        <Column title="In Progress" type="progress" onDrop={handleDrop}>
          {columns.progress.map(item => (
            <Card key={item.id} item={item} onDragStart={handleDragStart} type="progress" />
          ))}
        </Column>

        <Column title="Repaired" type="repaired" onDrop={handleDrop}>
          {columns.repaired.map(item => (
            <Card key={item.id} item={item} onDragStart={handleDragStart} type="repaired" />
          ))}
        </Column>

        <Column title="Overdue" type="overdue" onDrop={handleDrop}>
          {columns.overdue.map(item => (
            <Card key={item.id} item={item} onDragStart={handleDragStart} type="overdue" />
          ))}
        </Column>
      </div>
    </div>
  );
};

export default KanbanView;
