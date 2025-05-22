"use client";

import { TabsContent, TabsList, Tabs, TabsTrigger } from "@radix-ui/react-tabs";
import { Avatar, Input, Button, DatePicker, Tag } from "antd";
import {
  Car,
  Clock,
  Filter,
  Luggage,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "../ui/Card";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { useTheme } from "../ui/ThemeProvider";

// Mock data for rides
const mockRides = [
  {
    id: 1,
    from: "Skopje",
    to: "Ohrid",
    date: new Date(2023, 6, 15),
    time: "08:00",
    price: 500,
    currency: "MKD",
    seats: 3,
    driver: {
      id: 1,
      name: "Aleksandar M.",
      rating: 4.8,
      rides: 42,
      avatar: null,
    },
    vehicle: {
      model: "Volkswagen Golf",
      color: "Blue",
      year: 2018,
    },
    luggage: "Medium",
  },
  {
    id: 2,
    from: "Bitola",
    to: "Skopje",
    date: new Date(2023, 6, 16),
    time: "10:30",
    price: 450,
    currency: "MKD",
    seats: 2,
    driver: {
      id: 2,
      name: "Elena S.",
      rating: 4.9,
      rides: 78,
      avatar: null,
    },
    vehicle: {
      model: "Toyota Corolla",
      color: "Silver",
      year: 2020,
    },
    luggage: "Large",
  },
  {
    id: 3,
    from: "Skopje",
    to: "Tetovo",
    date: new Date(2023, 6, 17),
    time: "16:45",
    price: 250,
    currency: "MKD",
    seats: 4,
    driver: {
      id: 3,
      name: "Marko D.",
      rating: 4.7,
      rides: 35,
      avatar: null,
    },
    vehicle: {
      model: "Renault Clio",
      color: "Red",
      year: 2019,
    },
    luggage: "Small",
  },
  {
    id: 4,
    from: "Ohrid",
    to: "Skopje",
    date: new Date(2023, 6, 18),
    time: "12:15",
    price: 500,
    currency: "MKD",
    seats: 1,
    driver: {
      id: 4,
      name: "Ana P.",
      rating: 5.0,
      rides: 56,
      avatar: null,
    },
    vehicle: {
      model: "Hyundai i30",
      color: "White",
      year: 2021,
    },
    luggage: "Medium",
  },
];
const mockRoutes = [
  {
    id: 1,
    from: "Skopje",
    to: "Ohrid",
    available_rides: "1+ rides available today",
  },
  {
    id: 2,
    from: "Skopje",
    to: "Tetovo",
    available_rides: "69+ rides available today",
  },
  {
    id: 3,
    from: "Skopje",
    to: "Bitola",
    available_rides: "11+ rides available today",
  },
  {
    id: 4,
    from: "Ohrid",
    to: "Skopje",
    available_rides: "10+ rides available today",
  },
  {
    id: 5,
    from: "Bitola",
    to: "Skopje",
    available_rides: "8+ rides available today",
  },
  {
    id: 6,
    from: "Tetovo",
    to: "Skopje",
    available_rides: "6+ rides available today",
  },
];
export default function RidesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [rides, setRides] = useState(mockRides);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: null as Date | null,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would fetch from your API here
    // For now, we'll just filter the mock data
    const filtered = mockRides.filter((ride) => {
      const matchFrom =
        !searchParams.from ||
        ride.from.toLowerCase().includes(searchParams.from.toLowerCase());
      const matchTo =
        !searchParams.to ||
        ride.to.toLowerCase().includes(searchParams.to.toLowerCase());
      const matchDate =
        !searchParams.date ||
        ride.date.toDateString() === searchParams.date.toDateString();

      return matchFrom && matchTo && matchDate;
    });

    setRides(filtered);
  };

  const buttonStyle =
    theme === "dark"
      ? { backgroundColor: "#6e3fac", borderColor: "#6e3fac", color: "white" }
      : { color: "white", backgroundColor: "#646cff" };

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-left">{t("nav.rides")}</h1>
          <p
            className={`text-left ${
              theme === "dark" ? "text-gray-400" : "text-gray-400"
            }`}
          >
            {t("nav.rides.description")}
          </p>
        </div>
        <Button
          style={buttonStyle}
          variant="solid"
          color="blue"
          onClick={() => navigate(`/rides/create`)}
        >
          <Car className="mr-2 h-4 w-4" />
          {t("rides.create")}
        </Button>
      </div>

      <Tabs defaultValue="search" className="mb-8 text-left">
        <TabsList className="flex gap-4">
          <TabsTrigger style={buttonStyle} value="search">
            {t("rides.search.nav")}
          </TabsTrigger>
          <TabsTrigger style={buttonStyle} value="popular">
            {t("rides.popular.routes")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="search" className="mt-10">
          <Card
            className={
              theme === "dark" ? "border-[#363654]" : "border-gray-200"
            }
          >
            <CardHeader>
              <CardTitle>{t("rides.search")}</CardTitle>
              <CardDescription
                className={theme === "dark" ? "text-gray-400" : "text-gray-400"}
              >
                {t("nav.rides.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSearch}
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="from">{t("rides.from")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="from"
                      placeholder="City or location"
                      className="pl-8"
                      value={searchParams.from}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          from: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="to">{t("rides.to")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="to"
                      placeholder="City or location"
                      className="pl-8"
                      value={searchParams.to}
                      onChange={(e) =>
                        setSearchParams({ ...searchParams, to: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">{t("rides.date")}</Label>
                  <DatePicker
                    style={
                      theme === "dark"
                        ? {
                            backgroundColor: "#1e1e2f",
                            borderColor: "#363654",
                            color: "white",
                          }
                        : {}
                    }
                    value={searchParams.date ?? undefined}
                    onChange={(date) =>
                      setSearchParams({ ...searchParams, date: date || null })
                    }
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2 md:col-span-1">
                  <Label>&nbsp;</Label>
                  <Button
                    style={buttonStyle}
                    htmlType="submit"
                    className="w-full"
                    variant="solid"
                    color="blue"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {t("rides.search")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popular">
          <Card
            className={
              theme === "dark" ? "border-[#363654]" : "border-gray-200"
            }
          >
            <CardContent className="pt-6 ">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockRoutes.map((route) => {
                  return (
                    <Button
                      key={route.id}
                      style={{
                        height: "80px",
                        ...(theme === "dark"
                          ? {
                              backgroundColor: "#252538",
                              borderColor: "#363654",
                              color: "white",
                            }
                          : {}),
                      }}
                      variant="solid"
                      className={
                        theme === "dark"
                          ? "hover:bg-[#323248] hover:border-[#464668]"
                          : ""
                      }
                    >
                      <div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-2">
                            <MapPin
                              className={`h-4 w-4 ${
                                theme === "dark"
                                  ? "text-purple-300"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <span>{route.from}</span>
                            <span
                              className={
                                theme === "dark"
                                  ? "text-purple-300"
                                  : "text-muted-foreground"
                              }
                            >
                              →
                            </span>
                            <span>{route.to}</span>
                          </div>
                          <p
                            className={`mt-1 text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-muted-foreground"
                            }`}
                          >
                            {route.available_rides}
                          </p>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Available Rides</h2>
        <Button
          style={
            theme === "dark"
              ? { backgroundColor: "#252538", borderColor: "#363654" }
              : {}
          }
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <Card
              key={ride.id}
              className={`overflow-hidden ${
                theme === "dark" ? "border-[#363654]" : "border-gray-200"
              }`}
            >
              <CardContent
                className={`pb-0 pr-0 ${
                  theme === "dark" ? "bg-[#252538]" : "bg-[#f1f5f9]"
                }`}
              >
                <div className="grid md:grid-cols-[1fr_auto]">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={ride.driver.avatar}
                          alt={ride.driver.name}
                          size={"large"}
                          style={
                            theme === "dark"
                              ? { backgroundColor: "#6e3fac" }
                              : {}
                          }
                        >
                          {ride.driver.name.charAt(0)}
                        </Avatar>

                        <div className="text-left">
                          <div className="font-medium">{ride.driver.name}</div>
                          <div
                            className={`flex items-center text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-400"
                            }`}
                          >
                            <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {ride.driver.rating} · {ride.driver.rides} rides
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {ride.price} {ride.currency}
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-400"
                          }`}
                        >
                          per person
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 grid gap-2 md:grid-cols-2">
                      <div className="flex items-start gap-2">
                        <MapPin />
                        <div className="text-left">
                          <div className="font-medium">{ride.from}</div>
                          <div
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-400"
                            }`}
                          >
                            {format(ride.date, "EEE, MMM d")} · {ride.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin />
                        <div>
                          <div className="font-medium text-left">{ride.to}</div>
                          <div
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-400"
                            }`}
                          >
                            Estimated arrival: {ride.time.split(":")[0]}:
                            {(Number.parseInt(ride.time.split(":")[0]) + 2) %
                              24}
                            :{ride.time.split(":")[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Tag
                        color="default"
                        style={
                          theme === "dark"
                            ? {
                                borderRadius: "999px",
                                backgroundColor: "#252538",
                                borderColor: "#363654",
                                color: "white",
                              }
                            : { borderRadius: "999px" }
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Car className="h-3 w-3" />
                          {ride.vehicle.model}
                        </div>
                      </Tag>
                      <Tag
                        color="default"
                        style={
                          theme === "dark"
                            ? {
                                borderRadius: "999px",
                                backgroundColor: "#252538",
                                borderColor: "#363654",
                                color: "white",
                              }
                            : { borderRadius: "999px" }
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          {ride.seats} {ride.seats === 1 ? "seat" : "seats"}{" "}
                          left
                        </div>
                      </Tag>
                      <Tag
                        color="default"
                        style={
                          theme === "dark"
                            ? {
                                borderRadius: "999px",
                                backgroundColor: "#252538",
                                borderColor: "#363654",
                                color: "white",
                              }
                            : { borderRadius: "999px" }
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Luggage className="h-3 w-3" />
                          {ride.luggage} luggage
                        </div>
                      </Tag>
                      <Tag
                        color="default"
                        style={
                          theme === "dark"
                            ? {
                                borderRadius: "999px",
                                backgroundColor: "#252538",
                                borderColor: "#363654",
                                color: "white",
                              }
                            : { borderRadius: "999px" }
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          ~2 hours
                        </div>
                      </Tag>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-center border-t p-6 md:border-l md:border-t-0 ${
                      theme === "dark"
                        ? "border-[#363654] bg-[#1e1e2f]"
                        : "border-gray-200 bg-muted"
                    }`}
                  >
                    <Button
                      style={buttonStyle}
                      variant="solid"
                      color="blue"
                      onClick={() => navigate(`/rides/${ride.id}`)}
                    >
                      {t("rides.join")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card
            className={`p-6 text-center ${
              theme === "dark" ? "border-[#363654]" : "border-gray-200"
            }`}
          >
            <p
              className={`mb-4 ${
                theme === "dark" ? "text-gray-400" : "text-muted-foreground"
              }`}
            >
              No rides found matching your criteria.
            </p>
            <Button
              style={buttonStyle}
              variant="solid"
              color="blue"
              onClick={() => setRides(mockRides)}
            >
              Reset Search
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
