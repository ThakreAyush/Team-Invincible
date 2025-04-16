const StatsCard = ({ title, value, icon: Icon, color, change, changeType }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-center">
          <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-500">{title}</h3>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              {change && (
                <span className={`ml-2 text-sm font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {changeType === 'increase' ? '+' : '-'}{change}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default StatsCard
  