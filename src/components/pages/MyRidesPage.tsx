"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { format } from "date-fns";
import { MapPin, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button as AntdButton, Avatar, Skeleton, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import { pastRides, upcomingRides } from "../../services/rides/ridesServices";
import { Button } from "../ui/Button";
import type { IRidesData } from "../../utils/types/RideTypes";
import { useTheme } from "../ui/ThemeProvider";

export default function MyRidesPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { me } = useUser();
  const { data: upcomingRidesData, isLoading: loadingUpcomingRides } = useQuery(
    {
      queryKey: ["upcoming-rides"],
      queryFn: () => upcomingRides(me?.id as number),
      enabled: !!me,
    }
  );

  const { data: pastRidesData, isLoading: loadingPastRides } = useQuery({
    queryKey: ["past-rides"],
    queryFn: () => pastRides(me?.id as number),
    enabled: !!me,
  });

  return (
    <div className="container px-24 py-8 min-h-screen ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("nav.myRides")}</h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past rides
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList
    className="
      inline-flex gap-2 rounded-xl p-1
      border bg-slate-100
      dark:bg-[#1e1e2f] dark:border-[#363654]
    "
  >
    <TabsTrigger
      value="upcoming"
      className="
        px-4 py-2 rounded-lg font-medium transition
        text-slate-700 dark:text-slate-300
        hover:bg-white/70 dark:hover:bg-white/5
        data-[state=active]:bg-white
        data-[state=active]:text-[#646cff]
        data-[state=active]:shadow
        data-[state=active]:border data-[state=active]:border-slate-300

        dark:data-[state=active]:bg-[#646cff]
        dark:data-[state=active]:text-white
        dark:data-[state=active]:border-[#7e7eea]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-slate-300 dark:focus-visible:ring-[#7e7eea]
      "
    >
      Upcoming
    </TabsTrigger>

    <TabsTrigger
      value="past"
      className="
        px-4 py-2 rounded-lg font-medium transition
        text-slate-700 dark:text-slate-300
        hover:bg-white/70 dark:hover:bg-white/5
        data-[state=active]:bg-white
        data-[state=active]:text-[#646cff]
        data-[state=active]:shadow
        data-[state=active]:border data-[state=active]:border-slate-300

        dark:data-[state=active]:bg-[#646cff]
        dark:data-[state=active]:text-white
        dark:data-[state=active]:border-[#7e7eea]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-slate-300 dark:focus-visible:ring-[#7e7eea]
      "
    >
      Past
    </TabsTrigger>
  </TabsList>
       <TabsContent value="upcoming" className="space-y-4">
  {!loadingUpcomingRides ? (
    upcomingRidesData?.length > 0 ? (
      upcomingRidesData.map((data: IRidesData) => {
        const ride = data.ride;
        const avatarDriverPlaceholder = ride.userInfo?.name?.slice(0, 1);
        return (
          <Card 
            key={ride.id} 
            className={`border ${
              theme === "dark" ? "border-[#363654]" : "border-gray-200"
            }`}
          >
            <CardContent className={`pb-0 pr-0 ${
              theme === "dark" ? "bg-[#1e1e2f]" : "bg-[#f1f5f9]"
            }`}>
              <div className="grid md:grid-cols-[1fr_auto]">
                {/* Left Side */}
                <div className="p-6">
                  {/* Status Tags */}
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
                        backgroundColor: theme === "dark" ? "#363654" : undefined,
                        color: theme === "dark" ? "white" : undefined,
                      }}
                    >
                      {data.driver === true
                        ? "You're driving"
                        : "You're a passenger"}
                    </Tag>
                  </div>

                  {/* From & To */}
                  <div className="mb-4 grid gap-0 md:grid-cols-2">
                    <div className="flex space-x-2">
                      <MapPin className={theme === "dark" ? "text-white" : ""} />
                      <div>
                        <div className={`font-bold text-left ${
                          theme === "dark" ? "text-white" : ""
                        }`}>
                          {ride.fromLocation}
                        </div>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-400"}>
                          {format(ride.date, "EEE, MMM d")} · {ride.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className={theme === "dark" ? "text-white" : ""} />
                      <div>
                        <div className={`font-bold text-left ${
                          theme === "dark" ? "text-white" : ""
                        }`}>
                          {ride.toLocation}
                        </div>
                        <div className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }`}>
                          Estimated arrival:{" "}
                          {String(
                            (parseInt(ride.time.split(":")[0]) + 2) % 24
                          ).padStart(2, "0")}
                          :{ride.time.split(":")[1]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver or Passengers */}
                  {data.driver ? (
                    <div className="flex items-center gap-2">
                      {data.driver && (
                        <>
                          <div className="text-left">
                            <div className={`mb-2 text-sm font-medium text-left ${
                              theme === "dark" ? "text-white" : ""
                            }`}>
                              Passengers:
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {ride.passengerBookings?.map(
                                (passenger, index) => {
                                  const avatarPlaceholder =
                                    passenger.user.name?.slice(0, 1);
                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <Avatar
                                        style={{
                                          backgroundColor: theme === "dark" ? "#363654" : "lightgray",
                                          verticalAlign: "middle",
                                        }}
                                        size="default"
                                        gap={2}
                                        src={passenger.user.avatar}
                                      >
                                        {!passenger.user.avatar &&
                                          avatarPlaceholder}
                                      </Avatar>
                                      <div className={`text-sm ${
                                        theme === "dark" ? "text-white" : ""
                                      }`}>
                                        {passenger.user.name}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                              {ride.seatsAvailable > 0 && (
                                <Tag
                                  style={{
                                    borderRadius: "999px",
                                    paddingInline: "12px",
                                    backgroundColor: theme === "dark" ? "#363654" : undefined,
                                    color: theme === "dark" ? "white" : undefined,
                                  }}
                                >
                                  +{ride.seatsAvailable} available{" "}
                                  {ride.seatsAvailable === 1
                                    ? "seat"
                                    : "seats"}
                                </Tag>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Avatar
                        style={{
                          backgroundColor: theme === "dark" ? "#363654" : "lightgray",
                          verticalAlign: "middle",
                        }}
                        size="default"
                        gap={2}
                        src={ride.userInfo?.avatar}
                      >
                        {!ride.userInfo?.avatar && avatarDriverPlaceholder}
                      </Avatar>
                      <div className="text-left">
                        <div className={`text-sm font-medium ${
                          theme === "dark" ? "text-white" : ""
                        }`}>
                          {ride.userInfo.name}
                        </div>
                        <div className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }`}>
                          Driver
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side */}
                <div className={`flex flex-col items-center justify-center gap-3 p-6 ${
                  theme === "dark" 
                    ? "border-l border-[#363654] bg-[#1e1e2f]" 
                    : "border-t border-gray-200 bg-[#f1f5f9] md:border-l md:border-t-0"
                }`}>
                  <div className={`text-xl font-bold ${
                    theme === "dark" ? "text-white" : ""
                  }`}>
                    {ride.price} {ride.currency}
                  </div>
                  <div className="flex gap-2">
                    <AntdButton
                      onClick={() => navigate(`/rides/${ride.id}`)}
                      className={theme === "dark" ? "text-white" : ""}
                    >
                      Details
                    </AntdButton>
                    <AntdButton
                      variant="solid"
                      color="primary"
                      style={{ 
                        backgroundColor: "#646cff",
                        color: "white"
                      }}
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
    <CardTitle className={theme === "dark" ? "text-white" : ""}>
      No upcoming rides
    </CardTitle>
    <CardDescription className={theme === "dark" ? "text-gray-400" : ""}>
      You don't have any upcoming rides. Find a ride or offer one!
    </CardDescription>
  </CardHeader>
  <CardContent className="flex justify-center gap-4">
    <AntdButton onClick={() => navigate("/rides")}>
      Find a Ride
    </AntdButton>
    <AntdButton
      variant="outlined"
      onClick={() => navigate("/rides/create")}
      className={theme === "dark" ? "text-white" : ""}
    >
      Offer a Ride
    </AntdButton>
  </CardContent>
</Card>
)
) : (
<Skeleton active />
)}
</TabsContent>
<TabsContent value="past" className="space-y-4">
  {!loadingPastRides ? (
    pastRidesData?.length > 0 ? (
      pastRidesData?.map((data: IRidesData) => {
        const ride = data.ride;
        const avatarPastRidePlaceholder = ride.userInfo?.name.slice(0, 1);
        return (
          <Card 
            key={ride.id} 
            className={`border-1 ${
              theme === "dark" ? "border-[#363654]" : "border-gray-200"
            }`}
          >
            <CardContent className={`pb-0 pr-0 ${
              theme === "dark" ? "bg-[#1e1e2f]" : "bg-[#f1f5f9]"
            }`}>
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
                        backgroundColor: theme === "dark" && ride.status !== "completed" ? "#363654" : undefined,
                        color: theme === "dark" ? "white" : undefined,
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
                        backgroundColor: theme === "dark" ? "#363654" : undefined,
                        color: theme === "dark" ? "white" : undefined,
                      }}
                    >
                      {data.driver
                        ? "You drove"
                        : "You were a passenger"}
                    </Tag>
                  </div>
                  <div className="mb-4 grid gap-0 md:grid-cols-2">
                    <div className="flex space-x-2">
                      <MapPin className={theme === "dark" ? "text-white" : ""} />
                      <div>
                        <div className={`font-bold text-left ${
                          theme === "dark" ? "text-white" : ""
                        }`}>
                          {ride.fromLocation}
                        </div>
                        <div className={theme === "dark" ? "text-gray-400" : "text-gray-400"}>
                          {format(ride.date, "EEE, MMM d")} · {ride.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className={theme === "dark" ? "text-white" : ""} />
                      <div>
                        <div className={`font-bold text-left ${
                          theme === "dark" ? "text-white" : ""
                        }`}>
                          {ride.toLocation}
                        </div>
                        <div className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }`}>
                          Arrived:{" "}
                          {String(
                            (parseInt(ride.time.split(":")[0]) + 2) % 24
                          ).padStart(2, "0")}
                          :{ride.time.split(":")[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                  {data.driver ? (
                    <div className="flex items-center gap-2">
                      {data.driver && (
                        <>
                          <div className="text-left">
                            <div className={`mb-2 text-sm font-medium text-left ${
                              theme === "dark" ? "text-white" : ""
                            }`}>
                              Passengers:
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              {ride.passengerBookings?.map(
                                (passenger, index) => {
                                  const avatarPlaceholder =
                                    passenger.user.name?.slice(0, 1);
                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <Avatar
                                        style={{
                                          backgroundColor: theme === "dark" ? "#363654" : "lightgray",
                                          verticalAlign: "middle",
                                        }}
                                        size="default"
                                        gap={2}
                                        src={passenger.user.avatar}
                                      >
                                        {!passenger.user.avatar &&
                                          avatarPlaceholder}
                                      </Avatar>
                                      <div className={`text-sm ${
                                        theme === "dark" ? "text-white" : ""
                                      }`}>
                                        {passenger.user.name}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                              {ride.seatsAvailable > 0 && (
                                <Tag
                                  style={{
                                    borderRadius: "999px",
                                    paddingInline: "12px",
                                    backgroundColor: theme === "dark" ? "#363654" : undefined,
                                    color: theme === "dark" ? "white" : undefined,
                                  }}
                                >
                                  +{ride.seatsAvailable} available{" "}
                                  {ride.seatsAvailable === 1
                                    ? "seat"
                                    : "seats"}
                                </Tag>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Avatar
                        style={{
                          backgroundColor: theme === "dark" ? "#363654" : "lightgray",
                          verticalAlign: "middle",
                        }}
                        size="default"
                        gap={2}
                        src={ride.userInfo?.avatar}
                      >
                        {!ride.userInfo?.avatar && avatarPastRidePlaceholder}
                      </Avatar>
                      <div className="text-left">
                        <div className={`text-sm font-medium ${
                          theme === "dark" ? "text-white" : ""
                        }`}>
                          {ride.userInfo.name}
                        </div>
                        <div className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }`}>
                          Driver
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={`flex flex-col items-center justify-center gap-2 p-6 ${
                  theme === "dark" 
                    ? "border-l border-[#363654] bg-[#1e1e2f]" 
                    : "border-t border-gray-200 bg-[#f1f5f9] md:border-l md:border-t-0"
                }`}>
                  <div className={`text-xl font-bold ${
                    theme === "dark" ? "text-white" : ""
                  }`}>
                    {ride.price} {ride.currency}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    asChild
                    className={theme === "dark" ? "text-white" : ""}
                  >
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
            )
          ) : (
            <Skeleton active />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
