import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield, FiTool, FiUsers, FiLock, FiUser, FiClipboard, FiAlertCircle } from 'react-icons/fi';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      icon: FiShield,
      gradient: 'from-violet-600 to-indigo-600',
      route: '/admin',
      credentials: { id: 'admin001', password: 'admin123' }
    },
    {
      id: 'manager',
      title: 'Manager',
      icon: FiClipboard,
      gradient: 'from-blue-600 to-cyan-600',
      route: '/manager',
      credentials: { id: 'manager001', password: 'manager123' }
    },
    {
      id: 'technician',
      title: 'Technician',
      icon: FiTool,
      gradient: 'from-green-600 to-emerald-600',
      route: '/technician',
      credentials: { id: 'tech001', password: 'tech123' }
    },
    {
      id: 'user',
      title: 'Employee',
      icon: FiUsers,
      gradient: 'from-orange-600 to-amber-600',
      route: '/user',
      credentials: { id: 'user001', password: 'user123' }
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    if (!userId || !password) {
      setError('Please enter both User ID and Password');
      return;
    }

    const role = roles.find(r => r.id === selectedRole);
    
    if (role && userId === role.credentials.id && password === role.credentials.password) {
      navigate(role.route);
    } else {
      setError('Invalid User ID or Password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40">
              <FiShield className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            GearGuard
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Equipment Management System
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Login to access your portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Role <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === role.id
                        ? `border-violet-500 bg-gradient-to-br ${role.gradient} shadow-lg`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <role.icon className={`text-3xl mx-auto mb-2 ${
                      selectedRole === role.id ? 'text-white' : 'text-gray-600'
                    }`} />
                    <p className={`text-sm font-semibold ${
                      selectedRole === role.id ? 'text-white' : 'text-gray-700'
                    }`}>
                      {role.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* User ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                User ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your user ID"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <FiAlertCircle className="text-red-600 text-xl flex-shrink-0" />
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-violet-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Login to Portal
            </button>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-semibold">Admin:</span> admin001 / admin123</p>
                <p><span className="font-semibold">Manager:</span> manager001 / manager123</p>
                <p><span className="font-semibold">Technician:</span> tech001 / tech123</p>
                <p><span className="font-semibold">Employee:</span> user001 / user123</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 GearGuard. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
