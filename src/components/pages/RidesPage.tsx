"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Label } from "@radix-ui/react-label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  DatePicker,
  Pagination,
  Select,
  Spin,
  Tag,
} from "antd";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Car, Clock, Luggage, MapPin, Search, Star, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import {
  getCitiesByCountry,
  getRides,
  popularRides,
  searchRide,
} from "../../services/rides/ridesServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { useTheme } from "../ui/ThemeProvider";
import PriceFilterDropdown from "../ui/PriceFilterButton";
import { getPaginationConfig } from "../../utils/paginationConfig";
import { nanoid } from "nanoid";
import { useSearch } from "../../context/SearchContext";


export interface IRide {
  id: number;
  userInfo: {
    id: number;
    name: string;
    avatar: string;
    vehicle: string;
    rating: string | null;
    numberOfRides: number;
  };
  fromLocation: string;
  toLocation: string;
  date: string;
  time: string;
  price: number;
  seatsAvailable: number;
  status: "OPEN" | "CLOSED" | "CANCELLED";
  luggageSize: "SMALL" | "MEDIUM" | "LARGE";
  currency: string;
  waypoints: string[];
  notes: string;
  estimate: { estimatedArrivalTimes: string[] };
}

export default function RidesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated } = useUser();
  const {
    from,
    to,
    date,
    setFrom,
    setTo,
    setDate,
    isSearchActive,
    setIsSearchActive,
  } = useSearch();
  const [priceFilters, setPriceFilters] = useState<{
    sortOrder?: "asc" | "desc";
    priceRange?: string;
  }>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const { data: rides, isLoading: ridesLoading } = useQuery({
    queryKey: ["get-rides", pagination.current, pagination.pageSize],
    queryFn: () => getRides(pagination.current - 1, pagination.pageSize),
  });

  const { data: cities, isLoading: loadingCities } = useQuery({
    queryKey: ["get-cities"],
    queryFn: () => getCitiesByCountry("macedonia"),
  });

  const { data: popularRidesData, isLoading: loadingPopularRides } = useQuery({
    queryKey: ["get-popular-rides"],
    queryFn: () => popularRides(),
  });

  const {
    data: searchedRides,
    isLoading: searchedRidesLoading,
    refetch: refetchSearchedRides,
  } = useQuery({
    queryKey: ["get-searched-rides", pagination.current, pagination.pageSize],
    queryFn: () => {
      if (from || to || date) {
        return searchRide(from, to, date);
      }
    },
  });
  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  };
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (from || to || date) {
      setIsSearchActive(true);
      try {
        await refetchSearchedRides();
      } catch (error) {
        console.error("Error searching rides:", error);
      }
    } else {
      setIsSearchActive(false);
    }
  };

  const handleResetSearch = () => {
    setFrom("");
    setTo("");
    setDate("");
    setIsSearchActive(false);
  };
  const paginationConfig = getPaginationConfig({
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    handlePageChange,
    t,
  });
  const buttonStyle =
    theme === "dark"
      ? { backgroundColor: "#6e3fac", borderColor: "#6e3fac", color: "white" }
      : { color: "white", backgroundColor: "#646cff" };

  const cityOptions = cities?.map((city: { label: string; value: string }) => ({
    label: city,
    value: city,
  }));

  const displayedRides = (
    isSearchActive ? searchedRides?.content || [] : rides?.content || []
  )
    .filter((ride: IRide) => {
      if (!priceFilters.priceRange) return true;

      const [min, max] = priceFilters.priceRange.split(/-|\+/);
      if (priceFilters.priceRange.endsWith("+")) {
        return ride.price >= Number(min);
      }
      return ride.price >= Number(min) && ride.price <= Number(max);
    })
    .sort((a: IRide, b: IRide) => {
      if (priceFilters.sortOrder === "asc") {
        return a.price - b.price;
      } else if (priceFilters.sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    });
  useEffect(() => {
    if (rides) {
      setPagination((prev) => ({
        ...prev,
        total: rides.totalElements || 0,
      }));
    }
  }, [rides]);

  return (
    <div className="container px-24 py-8">
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
        <TabsList className="flex gap-4 mb-5">
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
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 items-end"
              >
                <div className="grid gap-2">
                  <Label htmlFor="from">{t("rides.from")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Select
                      value={from}
                      options={loadingCities ? [] : cityOptions}
                      placeholder="Select a city"
                      style={{
                        width: "100%",
                        ...(theme === "dark"
                          ? {
                              backgroundColor: "#1e1e2f",
                              borderColor: "#363654",
                              color: "white",
                            }
                          : {}),
                      }}
                      showSearch
                      dropdownStyle={
                        theme === "dark"
                          ? {
                              backgroundColor: "#252538",
                              borderColor: "#363654",
                              color: "white",
                            }
                          : {}
                      }
                      onChange={(e) => {
                        setFrom(e);
                      }}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="to">{t("rides.to")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Select
                      value={to}
                      options={
                        loadingCities
                          ? []
                          : cityOptions.filter(
                              (to: { value: string }) => to.value !== from
                            )
                      }
                      placeholder="Select a city"
                      style={{
                        width: "100%",
                        ...(theme === "dark"
                          ? {
                              backgroundColor: "#1e1e2f",
                              borderColor: "#363654",
                              color: "white",
                            }
                          : {}),
                      }}
                      showSearch
                      dropdownStyle={
                        theme === "dark"
                          ? {
                              backgroundColor: "#252538",
                              borderColor: "#363654",
                              color: "white",
                            }
                          : {}
                      }
                      onChange={(e) => {
                        setTo(e);
                      }}
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
                    value={date ? dayjs(date) : undefined}
                    onChange={(date) => {
                      setDate(date ? dayjs(date).format("YYYY-MM-DD") : "");
                    }}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2 md:col-span-1">
                  <div className="flex gap-2">
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
                    {isSearchActive && (
                      <Button
                        onClick={handleResetSearch}
                        className="w-full"
                        variant="outlined"
                      >
                        Reset search
                      </Button>
                    )}
                  </div>
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
                {loadingPopularRides ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                  />
                ) : (
                  popularRidesData.map(
                    (route: {
                      fromLocation: string;
                      toLocation: string;
                      rideCount: number;
                    }) => {
                      return (
                        <Button
                          key={nanoid()}
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
                                <span>{route.fromLocation}</span>
                                <span
                                  className={
                                    theme === "dark"
                                      ? "text-purple-300"
                                      : "text-muted-foreground"
                                  }
                                >
                                  →
                                </span>
                                <span>{route.toLocation}</span>
                              </div>
                              <p
                                className={`mt-1 text-xs ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {route.rideCount + "+ rides available today"}
                              </p>
                            </div>
                          </div>
                        </Button>
                      );
                    }
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{t("available.rides")}</h2>
        <PriceFilterDropdown
          onFilterChange={(filters) => setPriceFilters(filters)}
        />
        {/* <Button
          style={
            theme === "dark"
              ? { backgroundColor: "#252538", borderColor: "#363654" }
              : {}
          }
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button> */}
      </div>

      <div className="grid gap-4">
        {ridesLoading || searchedRidesLoading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : displayedRides.length > 0 ? (
          displayedRides.map((ride: IRide) => (
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
                          src={ride.userInfo.avatar}
                          alt={ride.userInfo.name}
                          size={"large"}
                          style={
                            theme === "dark"
                              ? { backgroundColor: "#6e3fac" }
                              : {}
                          }
                        >
                          {ride.userInfo.name.charAt(0)}
                        </Avatar>

                        <div className="text-left">
                          <div className="font-medium">
                            {ride.userInfo.name}
                          </div>
                          <div
                            className={`flex items-center text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-400"
                            }`}
                          >
                            <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {ride.userInfo.rating} ·{" "}
                            {ride.userInfo.numberOfRides} rides
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
                          <div className="font-medium">{ride.fromLocation}</div>
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
                          <div className="font-medium text-left">
                            {ride.toLocation}
                          </div>
                          <div
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-400"
                            }`}
                          >
                            Estimated arrival:{" "}
                            {ride.estimate.estimatedArrivalTimes
                              .find((timeStr) =>
                                timeStr.includes(ride.toLocation)
                              )
                              ?.split(": ")
                              .pop()}
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
                          {ride.userInfo.vehicle}
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
                          {ride.seatsAvailable}{" "}
                          {ride.seatsAvailable === 1 ? "seat" : "seats"} left
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
                          {ride.luggageSize} luggage
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
                          {ride.estimate.estimatedArrivalTimes
                            .find((timeStr) =>
                              timeStr.includes("Total trip duration")
                            )
                            ?.split(": ")
                            .pop()}
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
                      onClick={() => {
                        if (!isAuthenticated) {
                          navigate(`/sign-in`);
                        } else {
                          navigate(`/rides/${ride.id}`);
                        }
                      }}
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
              onClick={() => handleResetSearch()}
            >
              {t("Reset search")}
            </Button>
          </Card>
        )}
        {displayedRides.length > 0 && (
          <div className="flex justify-center mt-6">
            <Pagination {...paginationConfig} />
          </div>
        )}
      </div>
    </div>
  );
}
