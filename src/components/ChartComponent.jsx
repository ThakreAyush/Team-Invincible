import { useEffect, useRef } from 'react'

// This is a simplified chart component that simulates a chart
// In a real application, you would use a library like Chart.js, Recharts, or D3.js
const ChartComponent = ({ 
  type = 'line', 
  data = [], 
  labels = [], 
  title = '', 
  height = 300,
  colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B']
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const chartHeight = canvas.height - 40 // Leave space for labels
    
    // Clear canvas
    ctx.clearRect(0, 0, width, canvas.height)
    
    // Draw title
    if (title) {
      ctx.font = 'bold 14px Arial'
      ctx.fillStyle = '#1F2937'
      ctx.textAlign = 'center'
      ctx.fillText(title, width / 2, 20)
    }
    
    // If no data, show placeholder
    if (!data.length || !labels.length) {
      ctx.font = '14px Arial'
      ctx.fillStyle = '#6B7280'
      ctx.textAlign = 'center'
      ctx.fillText('No data available', width / 2, canvas.height / 2)
      return
    }
    
    // Determine max value for scaling
    const maxValue = Math.max(...data.flat())
    const datasetCount = Array.isArray(data[0]) ? data.length : 1
    
    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 1
    
    // Y-axis
    ctx.moveTo(50, 40)
    ctx.lineTo(50, chartHeight + 40)
    
    // X-axis
    ctx.moveTo(50, chartHeight + 40)
    ctx.lineTo(width - 20, chartHeight + 40)
    ctx.stroke()
    
    // Draw y-axis labels
    ctx.font = '10px Arial'
    ctx.fillStyle = '#6B7280'
    ctx.textAlign = 'right'
    
    const yLabelCount = 5
    for (let i = 0; i <= yLabelCount; i++) {
      const y = chartHeight + 40 - (i * (chartHeight / yLabelCount))
      const value = (maxValue * i / yLabelCount).toFixed(0)
      ctx.fillText(value, 45, y + 3)
      
      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.strokeStyle = '#F3F4F6'
      ctx.moveTo(50, y)
      ctx.lineTo(width - 20, y)
      ctx.stroke()
    }
    
    // Draw x-axis labels
    ctx.textAlign = 'center'
    const xStep = (width - 70) / (labels.length - 1)
    
    labels.forEach((label, i) => {
      const x = 50 + (i * xStep)
      ctx.fillText(label, x, chartHeight + 55)
    })
    
    // Draw data
    if (type === 'line') {
      // Handle multiple datasets
      const datasets = Array.isArray(data[0]) ? data : [data]
      
      datasets.forEach((dataset, datasetIndex) => {
        ctx.beginPath()
        ctx.strokeStyle = colors[datasetIndex % colors.length]
        ctx.lineWidth = 2
        
        dataset.forEach((value, i) => {
          const x = 50 + (i * xStep)
          const y = chartHeight + 40 - ((value / maxValue) * chartHeight)
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        
        ctx.stroke()
        
        // Draw points
        dataset.forEach((value, i) => {
          const x = 50 + (i * xStep)
          const y = chartHeight + 40 - ((value / maxValue) * chartHeight)
          
          ctx.beginPath()
          ctx.fillStyle = colors[datasetIndex % colors.length]
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fill()
        })
      })
    } else if (type === 'bar') {
      // Handle multiple datasets
      const datasets = Array.isArray(data[0]) ? data : [data]
      const barWidth = (xStep * 0.8) / datasets.length
      
      datasets.forEach((dataset, datasetIndex) => {
        ctx.fillStyle = colors[datasetIndex % colors.length]
        
        dataset.forEach((value, i) => {
          const x = 50 + (i * xStep) - (barWidth * datasets.length / 2) + (barWidth * datasetIndex)
          const y = chartHeight + 40 - ((value / maxValue) * chartHeight)
          const height = (value / maxValue) * chartHeight
          
          ctx.fillRect(x, y, barWidth, height)
        })
      })
    } else if (type === 'pie') {
      // Simple pie chart (only uses first dataset)
      const dataset = Array.isArray(data[0]) ? data[0] : data
      const total = dataset.reduce((sum, value) => sum + value, 0)
      let startAngle = 0
      
      dataset.forEach((value, i) => {
        const sliceAngle = (value / total) * 2 * Math.PI
        
        ctx.beginPath()
        ctx.fillStyle = colors[i % colors.length]
        ctx.moveTo(width / 2, canvas.height / 2)
        ctx.arc(width / 2, canvas.height / 2, Math.min(width, chartHeight) / 3, startAngle, startAngle + sliceAngle)
        ctx.closePath()
        ctx.fill()
        
        startAngle += sliceAngle
      })
    }
    
  }, [data, labels, title, type, colors, height])

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <canvas 
        ref={canvasRef} 
        width="600" 
        height={height}
        className="w-full h-auto"
      />
    </div>
  )
}

export default ChartComponent
