const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    ...props 
  }) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors duration-200'
    
    const variantClasses = {
      primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
      secondary: 'bg-white text-green-600 border border-green-600 hover:bg-green-50 focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    }
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
    
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  }
  
  export default Button
  