"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Link, MapPin, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";

const mockUpcomingRides = [
    {
      id: 1,
      type: "passenger",
      from: "Skopje",
      to: "Ohrid",
      date: new Date(2023, 6, 15),
      time: "08:00",
      price: 500,
      currency: "MKD",
      status: "confirmed",
      driver: {
        name: "Aleksandar M.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 2,
      type: "driver",
      from: "Ohrid",
      to: "Skopje",
      date: new Date(2023, 6, 18),
      time: "12:15",
      price: 500,
      currency: "MKD",
      status: "pending",
      passengers: [
        {
          name: "Elena S.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Marko D.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      availableSeats: 1,
    },
  ]
  
  const mockPastRides = [
    {
      id: 3,
      type: "passenger",
      from: "Skopje",
      to: "Tetovo",
      date: new Date(2023, 5, 10),
      time: "16:45",
      price: 250,
      currency: "MKD",
      status: "completed",
      driver: {
        name: "Marko D.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 4,
      type: "driver",
      from: "Tetovo",
      to: "Skopje",
      date: new Date(2023, 5, 12),
      time: "09:30",
      price: 250,
      currency: "MKD",
      status: "completed",
      passengers: [
        {
          name: "Ana P.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Stefan K.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Maja T.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
    },
  ]
  
  export default function MyRidesPage() {
    const { t } = useTranslation();
    const [upcomingRides, setUpcomingRides] = useState(mockUpcomingRides)
    const [pastRides, setPastRides] = useState(mockPastRides)
  
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t("nav.myRides")}</h1>
          <p className="text-muted-foreground">Manage your upcoming and past rides</p>
        </div>
  
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingRides.length > 0 ? (
              upcomingRides.map((ride) => (
                <Card key={ride.id}>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr_auto]">
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Badge
                            variant={
                              ride.status === "confirmed" ? "success" : ride.status === "pending" ? "warning" : "default"
                            }
                          >
                            {ride.status === "confirmed"
                              ? "Confirmed"
                              : ride.status === "pending"
                                ? "Pending"
                                : ride.status}
                          </Badge>
                          <Badge variant="outline">
                            {ride.type === "driver" ? "You're driving" : "You're a passenger"}
                          </Badge>
                        </div>
                        <div className="mb-4 grid gap-2 md:grid-cols-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{ride.from}</div>
                              <div className="text-sm text-muted-foreground">
                                {format(ride.date, "EEE, MMM d")} · {ride.time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{ride.to}</div>
                              <div className="text-sm text-muted-foreground">
                                Estimated arrival: {ride.time.split(":")[0]}:
                                {(Number.parseInt(ride.time.split(":")[0]) + 2) % 24}:{ride.time.split(":")[1]}
                              </div>
                            </div>
                          </div>
                        </div>
                        {ride.type === "passenger" ? (
  <div className="flex items-center gap-2">
    {ride.driver && (
      <>
        <Avatar className="h-8 w-8">
          <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} alt={ride.driver.name} />
          <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">{ride.driver.name}</div>
          <div className="text-xs text-muted-foreground">Driver</div>
        </div>
      </>
    )}
  </div>
                        ) : (
                            <div>
                            <div className="mb-2 text-sm font-medium">Passengers:</div>
                            <div className="flex flex-wrap gap-2">
                              {ride.passengers && ride.passengers.map((passenger, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={passenger.avatar || "/placeholder.svg"} alt={passenger.name} />
                                    <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="text-sm">{passenger.name}</div>
                                </div>
                              ))}
                              {ride.availableSeats && ride.availableSeats > 0 && (
                                <Badge variant="outline">
                                  +{ride.availableSeats} available {ride.availableSeats === 1 ? "seat" : "seats"}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 border-t bg-muted p-6 md:border-l md:border-t-0">
                        <div className="text-xl font-bold">
                          {ride.price} {ride.currency}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/rides/${ride.id}`}>Details</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/chat/${ride.id}`}>
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Chat
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No upcoming rides</CardTitle>
                  <CardDescription>You don't have any upcoming rides. Find a ride or offer one!</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center gap-4">
                  <Button asChild>
                    <Link href="/rides">Find a Ride</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/rides/create">Offer a Ride</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            {pastRides.length > 0 ? (
              pastRides.map((ride) => (
                <Card key={ride.id}>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr_auto]">
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Badge>{ride.status === "completed" ? "Completed" : ride.status}</Badge>
                          <Badge variant="outline">{ride.type === "driver" ? "You drove" : "You were a passenger"}</Badge>
                        </div>
                        <div className="mb-4 grid gap-2 md:grid-cols-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{ride.from}</div>
                              <div className="text-sm text-muted-foreground">
                                {format(ride.date, "EEE, MMM d")} · {ride.time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{ride.to}</div>
                            </div>
                          </div>
                        </div>
                        {ride.type === "passenger" ? (
  <div className="flex items-center gap-2">
    {ride.driver && (
      <>
        <Avatar className="h-8 w-8">
          <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} alt={ride.driver.name} />
          <AvatarFallback>{ride.driver.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">{ride.driver.name}</div>
          <div className="text-xs text-muted-foreground">Driver</div>
        </div>
      </>
    )}
  </div>
) : (
  <div>
    <div className="mb-2 text-sm font-medium">Passengers:</div>
    <div className="flex flex-wrap gap-2">
      {ride.passengers?.map((passenger, index) => (
        <div key={index} className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={passenger.avatar || "/placeholder.svg"} alt={passenger.name} />
            <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">{passenger.name}</div>
        </div>
      ))}
    </div>
  </div>
)}
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 border-t bg-muted p-6 md:border-l md:border-t-0">
                        <div className="text-xl font-bold">
                          {ride.price} {ride.currency}
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/rides/${ride.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No past rides</CardTitle>
                  <CardDescription>You haven't completed any rides yet.</CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    )
  }