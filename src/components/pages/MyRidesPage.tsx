"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
// import { Badge } from "../ui/Badge";
import { MapPin, MessageSquare } from "lucide-react";
import { format } from "date-fns";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Avatar, Badge, Tag, Button as AntdButton } from "antd";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";

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
      avatar: null,
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
        avatar: null,
      },
      {
        name: "Marko D.",
        avatar: null,
      },
    ],
    availableSeats: 1,
  },
];

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
      avatar: null,
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
        avatar: null,
      },
      {
        name: "Stefan K.",
        avatar: null,
      },
      {
        name: "Maja T.",
        avatar: null,
      },
    ],
  },
];

export default function MyRidesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [upcomingRides, setUpcomingRides] = useState(mockUpcomingRides);
  const [pastRides, setPastRides] = useState(mockPastRides);

  return (
    <div className="container px-24 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("nav.myRides")}</h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past rides
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className=" rounded-md p-1 space-x-2">
          <TabsTrigger
            value="upcoming"
            className=" bg-blue-500 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#646cff] data-[state=active]:border-blue-500"
            style={{ border: "1px solid black" }}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="  bg-blue-500 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#646cff] data-[state=active]:border-blue-500"
            style={{ border: "1px solid black" }}
          >
            Past
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingRides.length > 0 ? (
            upcomingRides.map((ride) => {
              const avatarDriverPlaceholder =
                ride.driver && ride?.driver.name.slice(0, 1);
              return (
                <Card key={ride.id} className="border-1 border-gray-200">
                  <CardContent className="pb-0 pr-0 bg-[#f1f5f9]">
                    <div className="grid md:grid-cols-[1fr_auto]">
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Tag
                            color={
                              ride.status === "confirmed"
                                ? "green"
                                : ride.status === "pending"
                                ? "orange"
                                : "default"
                            }
                            style={{
                              borderRadius: "999px",
                              paddingInline: "12px",
                            }}
                          >
                            {ride.status === "confirmed"
                              ? "Confirmed"
                              : ride.status === "pending"
                              ? "Pending"
                              : ride.status}
                          </Tag>
                          <Tag
                            style={{
                              borderRadius: "999px",
                              paddingInline: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {ride.type === "driver"
                              ? "You're driving"
                              : "You're a passenger"}
                          </Tag>
                        </div>
                        <div className="mb-4 grid gap-0 md:grid-cols-2">
                          <div className="flex space-x-2">
                            <MapPin />
                            <div>
                              <div className="font-bold text-left">
                                {ride.from}
                              </div>
                              <div className="text-gray-400">
                                {format(ride.date, "EEE, MMM d")} · {ride.time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin />
                            <div>
                              <div className="font-bold text-left">
                                {ride.to}
                              </div>
                              <div className="text-sm text-gray-400">
                                Estimated arrival: {ride.time.split(":")[0]}:
                                {(Number.parseInt(ride.time.split(":")[0]) +
                                  2) %
                                  24}
                                :{ride.time.split(":")[1]}
                              </div>
                            </div>
                          </div>
                        </div>
                        {ride.type === "passenger" ? (
                          <div className="flex items-center gap-2">
                            {ride.driver && (
                              <>
                                <Avatar
                                  style={{
                                    backgroundColor: "lightgray",
                                    verticalAlign: "middle",
                                  }}
                                  size="default"
                                  gap={2}
                                  src={ride.driver.avatar}
                                >
                                  {ride.driver.avatar === null &&
                                    avatarDriverPlaceholder}
                                </Avatar>

                                <div className="text-left">
                                  <div className="text-sm font-medium">
                                    {ride.driver.name}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    Driver
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="mb-2 text-sm font-medium text-left">
                              Passengers:
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {ride.passengers &&
                                ride.passengers.map((passenger, index) => {
                                  const avatarPassengerPlaceholder =
                                    passenger.name &&
                                    passenger.name.slice(0, 1);
                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <Avatar
                                        style={{
                                          backgroundColor: "lightgray",
                                          verticalAlign: "middle",
                                        }}
                                        size="default"
                                        gap={2}
                                        src={passenger.avatar}
                                      >
                                        {passenger.avatar === null &&
                                          avatarPassengerPlaceholder}
                                      </Avatar>
                                      <div className="text-sm">
                                        {passenger.name}
                                      </div>
                                    </div>
                                  );
                                })}
                              {ride.availableSeats &&
                                ride.availableSeats > 0 && (
                                  <Tag
                                    style={{
                                      borderRadius: "999px",
                                      paddingInline: "12px",
                                    }}
                                  >
                                    +{ride.availableSeats} available{" "}
                                    {ride.availableSeats === 1
                                      ? "seat"
                                      : "seats"}
                                  </Tag>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center gap-3 border-t bg-muted p-6 md:border-l md:border-t-0 border-gray-200 bg-[#f1f5f9]">
                        <div className="text-xl font-bold">
                          {ride.price} {ride.currency}
                        </div>
                        <div className="flex gap-2">
                          <AntdButton
                            onClick={() => navigate(`/rides/${ride.id}`)}
                          >
                            Details
                          </AntdButton>
                          <AntdButton
                            variant="solid"
                            color="primary"
                            style={{ backgroundColor: "#646cff" }}
                            onClick={() => navigate(`/chat/${ride.id}`)}
                          >
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Chat
                          </AntdButton>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No upcoming rides</CardTitle>
                <CardDescription>
                  You don't have any upcoming rides. Find a ride or offer one!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center gap-4">
                <Button asChild>
                  <Link to="/rides">Find a Ride</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/rides/create">Offer a Ride</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          {pastRides.length > 0 ? (
            pastRides.map((ride) => {
              const avatarPastRidePlaceholder = ride.driver?.name.slice(0, 1);
              return (
                <Card key={ride.id} className="border-1 border-gray-200">
                  <CardContent className="pb-0 pr-0 bg-[#f1f5f9]">
                    <div className="grid md:grid-cols-[1fr_auto]">
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Tag
                            color={
                              ride.status === "completed" ? "blue" : "default"
                            }
                            style={{
                              borderRadius: "999px",
                              paddingInline: "12px",
                            }}
                          >
                            {ride.status === "completed"
                              ? "Completed"
                              : ride.status}
                          </Tag>
                          <Tag
                            style={{
                              borderRadius: "999px",
                              paddingInline: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {ride.type === "driver"
                              ? "You drove"
                              : "You were a passenger"}
                          </Tag>
                        </div>
                        <div className="mb-4 grid gap-0 md:grid-cols-2">
                          <div className="flex space-x-2">
                            <MapPin />
                            <div>
                              <div className="font-bold text-left">
                                {ride.from}
                              </div>
                              <div className="text-gray-400">
                                {format(ride.date, "EEE, MMM d")} · {ride.time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin />
                            <div>
                              <div className="font-bold text-left">
                                {ride.to}
                              </div>
                            </div>
                          </div>
                        </div>
                        {ride.type === "passenger" ? (
                          <div className="flex items-center gap-2">
                            {ride.driver && (
                              <>
                                <Avatar
                                  style={{
                                    backgroundColor: "lightgray",
                                    verticalAlign: "middle",
                                  }}
                                  size="default"
                                  gap={2}
                                  src={ride.driver.avatar}
                                >
                                  {ride.driver.avatar === null &&
                                    avatarPastRidePlaceholder}
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">
                                    {ride.driver.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Driver
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="mb-2 text-sm font-medium text-left">
                              Passengers:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {ride.passengers?.map((passenger, index) => {
                                const pastRiderPassenger = passenger.name.slice(
                                  0,
                                  1
                                );
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <Avatar
                                      style={{
                                        backgroundColor: "lightgray",
                                        verticalAlign: "middle",
                                      }}
                                      size="default"
                                      gap={2}
                                      src={passenger.avatar}
                                    >
                                      {passenger.avatar === null &&
                                        pastRiderPassenger}
                                    </Avatar>
                                    <div className="text-sm">
                                      {passenger.name}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2 border-t bg-muted p-6 md:border-l md:border-t-0 border-gray-200 bg-[#f1f5f9]">
                        <div className="text-xl font-bold">
                          {ride.price} {ride.currency}
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/rides/${ride.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No past rides</CardTitle>
                <CardDescription>
                  You haven't completed any rides yet.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
