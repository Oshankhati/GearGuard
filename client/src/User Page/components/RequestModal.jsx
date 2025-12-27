import React from 'react';
import { FiX, FiChevronRight } from 'react-icons/fi';

const RequestModal = ({ showRequestModal, setShowRequestModal }) => {
  if (!showRequestModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Request Equipment</h3>
          <button 
            onClick={() => setShowRequestModal(false)} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Equipment Type <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
              <option>Select equipment type...</option>
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Monitor</option>
              <option>Keyboard & Mouse</option>
              <option>Webcam</option>
              <option>Headset</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Model/Brand
            </label>
            <input
              type="text"
              placeholder="e.g., MacBook Pro 16-inch, Dell XPS..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
              <option>Low - Can wait</option>
              <option>Medium - Needed soon</option>
              <option>High - Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Purpose / Justification <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Explain why you need this equipment..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button 
            onClick={() => setShowRequestModal(false)} 
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={() => setShowRequestModal(false)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all font-semibold"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
