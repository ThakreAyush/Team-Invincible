"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import { Badge } from "/components/ui/badge"
import { Separator } from "/components/ui/separator"
import { Phone, Mail, ExternalLink, Calendar, Info, AlertCircle } from "lucide-react"

export default function GovernmentPortal() {
  // Sample schemes data
  const schemes = [ 
    {
      id: 1,
      name: "Green Travel Subsidy",
      description: "Get up to 30% subsidy on electric vehicles and public transport passes",
      category: "Transport",
      deadline: "December 31, 2023",
    },
    {
      id: 2,
      name: "Solar Panel Rebates",
      description: "Claim up to $2,500 in rebates when installing solar panels for residential use",
      category: "Energy",
      deadline: "Ongoing",
    },
    {
      id: 3,
      name: "Sustainable Living Tax Benefits",
      description: "Tax deductions for certified green home improvements and energy-efficient appliances",
      category: "Housing",
      deadline: "Tax year 2023-24",
    },
    {
      id: 4,
      name: "Community Garden Grants",
      description: "Funding for neighborhood initiatives to create and maintain community gardens",
      category: "Community",
      deadline: "Applications open quarterly",
    },
  ]

  // Sample news data
  const news = [
    {
      id: 1,
      title: "New Carbon Tax Framework Announced",
      date: "October 15, 2023",
      summary:
        "The Ministry of Environment has announced a new framework for carbon taxation that will come into effect next year.",
    },
    {
      id: 2,
      title: "Green Building Standards Updated",
      date: "September 28, 2023",
      summary:
        "Updated standards for green building certification have been released, focusing on water conservation and renewable materials.",
    },
    {
      id: 3,
      title: "Public Consultation on Plastic Ban",
      date: "September 10, 2023",
      summary:
        "The government is seeking public input on the proposed ban of single-use plastics. Online submissions open until November 30.",
    },
  ]

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Government Portal - Green Initiatives</h1>
        <p className="text-muted-foreground">
          Discover programs, policies, and resources to support sustainable living
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Schemes Section */}
        <div className="md:col-span-12">
          <Card>
            <CardHeader>
              <CardTitle>Available Schemes & Programs</CardTitle>
              <CardDescription>Explore government initiatives to support sustainable practices</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">All Schemes</TabsTrigger>
                  <TabsTrigger value="transport">Transport</TabsTrigger>
                  <TabsTrigger value="energy">Energy</TabsTrigger>
                  <TabsTrigger value="housing">Housing</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="grid gap-4 sm:grid-cols-2">
                  {schemes.map((scheme) => (
                    <Card key={scheme.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{scheme.name}</CardTitle>
                          <Badge>{scheme.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Deadline: {scheme.deadline}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Learn More <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="transport" className="grid gap-4 sm:grid-cols-2">
                  {schemes
                    .filter((s) => s.category === "Transport")
                    .map((scheme) => (
                      <Card key={scheme.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{scheme.name}</CardTitle>
                            <Badge>{scheme.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Deadline: {scheme.deadline}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Learn More <ExternalLink className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
                <TabsContent value="energy" className="grid gap-4 sm:grid-cols-2">
                  {schemes
                    .filter((s) => s.category === "Energy")
                    .map((scheme) => (
                      <Card key={scheme.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{scheme.name}</CardTitle>
                            <Badge>{scheme.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Deadline: {scheme.deadline}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Learn More <ExternalLink className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
                <TabsContent value="housing" className="grid gap-4 sm:grid-cols-2">
                  {schemes
                    .filter((s) => s.category === "Housing")
                    .map((scheme) => (
                      <Card key={scheme.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{scheme.name}</CardTitle>
                            <Badge>{scheme.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Deadline: {scheme.deadline}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Learn More <ExternalLink className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* News Section */}
        <div className="md:col-span-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Latest Announcements & News</CardTitle>
              <CardDescription>Updates from the Ministry of Environment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {news.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="min-w-[4px] bg-primary/20 rounded-full"></div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                          {index === 0 && (
                            <Badge variant="outline" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.summary}</p>
                        <Button variant="link" className="p-0 h-auto">
                          Read full announcement
                        </Button>
                      </div>
                    </div>
                    {index < news.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All News
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Contact & Helpline</CardTitle>
              <CardDescription>Get assistance with green initiatives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Helpline</span>
                </div>
                <p className="text-sm text-muted-foreground">1-800-GREEN-HELP (1-800-473-3643)</p>
                <p className="text-xs text-muted-foreground">Monday to Friday, 9 AM - 5 PM</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email Support</span>
                </div>
                <p className="text-sm text-muted-foreground">green-support@gov.example.org</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Submit an Inquiry</h3>
                <Input placeholder="Your name" />
                <Input placeholder="Email address" />
                <Textarea placeholder="Your question or comment" className="min-h-[100px]" />
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>Responses typically provided within 2-3 business days</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Inquiry</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Alert Banner */}
        <div className="md:col-span-12">
          <Card className="bg-muted">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <p className="text-sm">
                  Public consultation on the new Carbon Reduction Strategy is now open.{" "}
                  <Button variant="link" className="p-0 h-auto">
                    Submit your feedback by November 30
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
