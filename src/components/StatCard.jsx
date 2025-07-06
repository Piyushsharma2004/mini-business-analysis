import React from 'react';

function StatCard({ title, value, Icon, trend, color = 'blue' }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↗️' : '↘️'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
    </div>
  );
}

export default StatCard;