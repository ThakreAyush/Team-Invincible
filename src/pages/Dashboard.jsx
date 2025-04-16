"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Car, Utensils, ShoppingBag, Lightbulb, Award, ArrowRight } from 'lucide-react'

export default function CarbonDashboard() {
  const [chartType, setChartType] = useState("pie")
  
  // Sample data for the carbon footprint
  const carbonData = [
    { name: "Travel", value: 1200, color: "#ff6384" },
    { name: "Food", value: 800, color: "#36a2eb" },
    { name: "Shopping", value: 600, color: "#ffce56" },
    { name: "Electricity", value: 400, color: "#4bc0c0" }
  ]
  
  // Sample insights
  const insights = [
    { 
      id: 1, 
      title: "Switch to public transport", 
      description: "Save 300kg CO₂/year by using public transport twice a week", 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      id: 2, 
      title: "Try meat-free days", 
      description: "Going meat-free once a week can reduce your carbon footprint by 170kg CO₂/year", 
      icon: <Utensils className="h-5 w-5" /> 
    },
    { 
      id: 3, 
      title: "Reduce online shopping", 
      description: "Combining orders can save up to 120kg CO₂/year from delivery emissions", 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      id: 4, 
      title: "Switch to LED lighting", 
      description: "Replacing all bulbs with LEDs can save 80kg CO₂/year", 
      icon: <Lightbulb className="h-5 w-5" /> 
    }
  ]
  
  // Sample badges
  const badges = [
    { id: 1, name: "Eco Warrior", description: "Reduced carbon footprint by 20%", achieved: true },
    { id: 2, name: "Green Shopper", description: "Made 10 sustainable purchases", achieved: true },
    { id: 3, name: "Low Carbon Consumer", description: "Maintained below average footprint for 3 months", achieved: false }
  ]
  
  // Calculate total carbon footprint
  const totalCarbon = carbonData.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">My Carbon Footprint Portfolio</h1>
        <p className="text-muted-foreground">Track, analyze, and reduce your environmental impact</p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-12">
        {/* Summary Stats Section */}
        <Card className="md:col-span-12">
          <CardHeader>
            <CardTitle>Carbon Footprint Summary</CardTitle>
            <CardDescription>Your total and category-wise carbon emissions</CardDescription>
            <Tabs defaultValue="pie" className="w-full" onValueChange={setChartType}>
              <TabsList className="grid w-[200px] grid-cols-2">
                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-4 flex flex-col justify-center items-center">
                <div className="text-4xl font-bold mb-2">{totalCarbon} kg</div>
                <div className="text-muted-foreground text-sm">Total CO₂ emissions</div>
                
                <div className="w-full mt-6 space-y-4">
                  {carbonData.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value} kg</span>
                      </div>
                      <Progress value={(item.value / totalCarbon) * 100} className="h-2" indicatorClassName={`bg-[${item.color}]`} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-8 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "pie" ? (
                    <PieChart>
                      <Pie
                        data={carbonData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {carbonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  ) : (
                    <BarChart
                      data={carbonData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="CO₂ (kg)">
                        {carbonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Personalized Insights Section */}
        <div className="md:col-span-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Personalized Insights</CardTitle>
              <CardDescription>Recommendations to reduce your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {insights.map((insight) => (
                  <Card key={insight.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-0 flex flex-row items-start space-y-0">
                      <div className="mr-2 bg-primary/10 p-2 rounded-full">
                        {insight.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Achievement Badges Section */}
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
              <CardDescription>Your eco-friendly milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${badge.achieved ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Award className={`h-5 w-5 ${badge.achieved ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{badge.name}</h4>
                        {badge.achieved && (
                          <Badge variant="outline" className="ml-2">Achieved</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Badges</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
