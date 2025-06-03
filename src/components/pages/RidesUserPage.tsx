"use client";

import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  Modal,
  Skeleton,
  Tag,
} from "antd";
import { format } from "date-fns";
import {
  Car,
  Clock,
  CreditCard,
  Loader2,
  Luggage,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRideById } from "../../services/rides/ridesServices";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import ReviewsList from "../ui/ReviewsList";
import { Textarea } from "../ui/Textarea";

export default function RideDetailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showRequestSent, setShowRequestSent] = useState(false);
  const [openMessageDriver, setOpenMessageDriver] = useState(false);

  const { data: ride, isLoading: loadingRide } = useQuery({
    queryKey: ["get-ride-by-id"],
    queryFn: () => getRideById(Number(id)),
  });

  const handleSendRequest = async () => {
    setIsLoading(true);

    try {
      // Here you would connect to your Spring Boot backend
      // const response = await fetch(`/api/rides/${params.id}/request`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowRequestSent(true);
    } catch (error) {
      console.error("Failed to send request:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (loadingRide)
    return (
      <div className="container py-10 h-screen">
        <Skeleton />
      </div>
    );

  const { estimatedArrivalTimes } = ride.estimate;
  const toCity = ride.toLocation;

  const toCityEntry = estimatedArrivalTimes.find((entry: string) =>
    entry.toLowerCase().startsWith(toCity.toLowerCase())
  );

  let arrivalTime = null;

  if (toCityEntry) {
    arrivalTime = toCityEntry.split(":").slice(1).join(":").trim();
  }

  const totalDurationEntry = ride.estimate.estimatedArrivalTimes.find(
    (item: string) => item.toLowerCase().startsWith("total trip duration")
  );

  const totalDuration = totalDurationEntry
    ? totalDurationEntry.split(":").slice(1).join(":").trim()
    : "N/A";
  return (
    <div className="container py-8">
      <div className="mb-8 text-left">
        <Button className="mb-4" onClick={() => navigate("/rides")}>
          ← Back to rides
        </Button>

        <h2 className="text-4xl font-bold">
          {ride.fromLocation} to {ride.toLocation}
        </h2>
        <p className="text-gray-400">
          {format(ride.date, "EEEE, MMMM d, yyyy")} · {ride.time}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="user-ride-car-border">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar
                    size={"large"}
                    src={ride.userInfo.avatar || "/placeholder.svg"}
                    alt={ride.userInfo.name}
                  >
                    {ride.userInfo.avatar === null &&
                      ride.userInfo.name.charAt(0)}
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold text-left">
                      {ride.userInfo.name}
                    </h2>
                    <div className="flex items-center text-sm">
                      <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500 " />
                      <span className="font-medium text-gray-400">
                        {ride.userInfo.rating}
                      </span>
                      <span className="mx-1 text-gray-400">·</span>
                      <span className="text-gray-400">
                        {ride.userInfo.numberOfRides} rides
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Member since{" "}
                      {/* {format(ride?.driver?.joinedDate, "MMMM yyyy")} */}
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold">
                    {ride.price} {ride.currency}
                  </div>
                  <div className="text-sm text-gray-400">per seat</div>
                  <div className="mt-2">
                    <Tag color="default" style={{ borderRadius: "999px" }}>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {ride.seatsAvailable}{" "}
                        {ride.seatsAvailable === 1 ? "seat" : "seats"} available
                      </div>
                    </Tag>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-full flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#646cff]">
                        <MapPin className=" h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-left">
                        {ride.fromLocation}
                      </div>
                      <div className="text-sm text-gray-400">
                        {format(ride.date, "EEE, MMM d")} · {ride.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#646cff]">
                      <MapPin className=" h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-left">
                        {ride.toLocation}
                      </div>
                      <div className="text-sm text-gray-400">
                        Estimated arrival: {arrivalTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Tag
                    className="flex items-center gap-1"
                    style={{ borderRadius: "999px" }}
                  >
                    <div className="flex items-center gap-2">
                      <Car className="h-3 w-3" />
                      {ride.userInfo.vehicle}
                    </div>
                  </Tag>
                  <Tag
                    className="flex items-center gap-1"
                    style={{ borderRadius: "999px" }}
                  >
                    <div className="flex items-center gap-2">
                      <Luggage className="h-3 w-3" />
                      {ride.luggageSize} luggage
                    </div>
                  </Tag>
                  <Tag
                    className="flex items-center gap-1"
                    style={{ borderRadius: "999px" }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {totalDuration}
                    </div>
                  </Tag>
                  <Tag
                    className="flex items-center gap-1"
                    style={{ borderRadius: "999px" }}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3 w-3" />
                      Cash payment
                    </div>
                  </Tag>
                </div>
                {/*TO DOOOOOOOOOOO*/}
                {ride.description && (
                  <div className="text-left">
                    <h3 className="mb-2 font-medium">About this ride</h3>
                    <p className="text-sm text-muted-foreground">
                      {ride.description}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="user-ride-car-border ">
            <CardHeader>
              <CardTitle>Route Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ride.estimate.estimatedArrivalTimes
                  .filter(
                    (stopString: string) =>
                      !stopString
                        .toLowerCase()
                        .startsWith("total trip duration")
                  )
                  .map((stopString: string, index: number, arr: any) => {
                    const city = stopString.split("(")[0].trim();

                    const time = stopString
                      .split(":")
                      .slice(1)
                      .join(":")
                      .trim();

                    let stopType = "stop";
                    if (index === 0) stopType = "departure";
                    else if (index === arr.length - 1) stopType = "arrival";

                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-full flex-col items-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              stopType === "departure"
                                ? "bg-green-500 text-white"
                                : stopType === "arrival"
                                ? "bg-[#646cff] text-white"
                                : "bg-[#f1f5f9]"
                            }`}
                          >
                            <MapPin className="h-4 w-4" />
                          </div>
                          {index < arr.length - 1 && (
                            <div className="h-8 w-0.5 bg-gray-200">
                              <Divider type="vertical" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-left">{city}</div>
                          <div className="text-sm text-muted-foreground">
                            {time} ·{" "}
                            {stopType === "departure"
                              ? "Departure"
                              : stopType === "arrival"
                              ? "Arrival"
                              : "Stop"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card className="user-ride-car-border">
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-md">
                <Image
                  src={ride.vehicle.picture || "/car-placeholder.png"}
                  alt={ride.vehicle.model}
                  width={"100%"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-bold text-left">Vehicle Details</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span>{ride.vehicle.model}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Color:</span>
                      <span>{ride.vehicle.color}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Year:</span>
                      <span>{ride.vehicle.year}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">
                        License Plate:
                      </span>
                      <span>{ride.vehicle.plateNumber}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-left">Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span>{ride.vehicle.airCondition ? "✓" : "X"}</span>
                      <span>Air conditioning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>{ride.vehicle.usbCharging ? "✓" : "X"}</span>
                      <span>USB charging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>{ride.vehicle.music ? "✓" : "X"}</span>
                      <span>Music</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>{ride.vehicle.comfortableSeats ? "✓" : "X"}</span>
                      <span>Comfortable seats</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="user-ride-car-border">
            <CardHeader className="text-left">
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewsList reviews={ride.userInfo.reviews} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="user-ride-car-border">
            <CardHeader className="text-left">
              <CardTitle>Request to Join</CardTitle>

              <CardDescription>
                Send a request to join this ride
              </CardDescription>
            </CardHeader>

            <CardContent>
              {showRequestSent ? (
                <div className="text-center py-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>

                  <h3 className="text-lg font-medium mb-2">Request Sent!</h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    The driver will review your request and respond soon.
                  </p>

                  <Button>
                    <Link to="/my-rides">View My Rides</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#f1f5f9] dark:bg-slate-800 p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Price per seat
                      </span>

                      <span className="font-bold">
                        {ride.price} {ride.currency}
                      </span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Seats</span>

                      <span>1</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Total</span>

                      <span className="font-bold">
                        {ride.price} {ride.currency}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <Label htmlFor="message">
                      Message to driver (optional)
                    </Label>

                    <Textarea
                      id="message"
                      placeholder="Introduce yourself and let the driver know about any special requirements"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="dark:bg-slate-800 dark:border-gray-700"
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleSendRequest}
                    disabled={isLoading}
                    variant="solid"
                    style={{ backgroundColor: "#646cff", color: "white" }}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Request to Join
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You won't be charged until the driver accepts your request
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="user-ride-car-border">
            <CardHeader>
              <CardTitle>Contact Driver</CardTitle>
            </CardHeader>

            <CardContent>
              <Button
                className="w-full"
                variant="solid"
                onClick={() => setOpenMessageDriver(!openMessageDriver)}
              >
                Message
              </Button>

              <Modal
                open={openMessageDriver}
                onOk={() => setOpenMessageDriver(false)}
                onCancel={() => setOpenMessageDriver(false)}
                title={
                  <div>
                    <h2 className="text-xl">{`Message to ${ride.userInfo.name}`}</h2>

                    <p className="text-sm text-gray-400">
                      You can only message the driver after your request is
                      accepted
                    </p>
                  </div>
                }
                centered
                footer
                className="driver-message-modal"
              >
                <div className="space-y-4 py-4">
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[100px] dark:bg-slate-800 dark:border-gray-700"
                    disabled
                  />
                </div>

                <div className="flex flex-row-reverse">
                  <Button disabled>Send Message</Button>
                </div>
              </Modal>
            </CardContent>
          </Card>

          <Card className="user-ride-car-border">
            <CardHeader className="text-left">
              <CardTitle>Safety Tips</CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>

                  <span>
                    Verify the driver's identity before getting in the car
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>

                  <span>
                    Share your trip details with a friend or family member
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>

                  <span>Meet the driver in a public place</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-green-500 dark:text-green-400">✓</span>

                  <span>
                    Trust your instincts and cancel if you feel uncomfortable
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
