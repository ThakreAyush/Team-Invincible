const FormInput = ({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    placeholder = '', 
    required = false,
    error = '',
    className = '',
    ...props 
  }) => {
    return (
      <div className={`mb-4 ${className}`}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            rows={4}
            {...props}
          />
        ) : type === 'file' ? (
          <input
            id={name}
            name={name}
            type="file"
            onChange={onChange}
            required={required}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100`}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            {...props}
          />
        )}
        
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
  
  export default FormInput
  