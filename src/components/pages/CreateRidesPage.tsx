"use client";

import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Slider,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { Clock, Loader2, MapPin } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import type { RideDTO } from "../../context/AuthContext/types";
import {
  createRide,
  getCitiesByCountry,
} from "../../services/rides/ridesServices";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Textarea } from "../ui/Textarea";
import { useTheme } from "../ui/ThemeProvider";

export default function CreateRidePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { me } = useUser();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    stops: false,
    waypoints: [] as string[],
  });
  const { data: cities, isLoading: loadingCities } = useQuery({
    queryKey: ["get-cities"],
    queryFn: () => getCitiesByCountry("macedonia"),
    enabled: !!formData.stops,
  });

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (rideData: RideDTO) => {
    setIsLoading(true);
    await createRide({ ...rideData, userInfo: { id: me?.id as number } });
    navigate("/rides");
    setIsLoading(false);
  };

  const cityOptions = cities?.map((city: { label: string; value: string }) => ({
    label: city,
    value: city,
  }));

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("rides.create")}</h1>
        <p className="text-muted-foreground">
          Offer a ride and share your journey with others
        </p>
      </div>
      <div className="flex justify-center">
        <Card className="w-200 mx-auto ">
          <Form onFinish={handleSubmit} initialValues={{ seatsAvailable: 3 }}>
            <CardHeader className="text-left">
              <CardTitle>Ride Details</CardTitle>
              <CardDescription>
                Fill in the information about your ride
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 w-full">
              <div className="grid gap-6 md:grid-cols-4 items-center">
                <div className="space-y-2">
                  <Label htmlFor="from">{t("rides.from")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Form.Item
                      name="fromLocation"
                      rules={[
                        {
                          type: "string",
                          required: true,
                          message: "Please input your start location!",
                        },
                      ]}
                    >
                      <Input placeholder="City or location" className="pl-8" />
                    </Form.Item>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">{t("rides.to")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Form.Item
                      name="toLocation"
                      rules={[
                        {
                          type: "string",
                          required: true,
                          message: "Please input your arrive location!",
                        },
                      ]}
                    >
                      <Input placeholder="City or location" className="pl-8" />
                    </Form.Item>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">{t("rides.date")}</Label>
                  {/* Replace Popover and Calendar with Ant Design DatePicker */}
                  <Form.Item
                    name="date"
                    rules={[
                      {
                        type: "date",
                        required: true,
                        message: "Please input your date!",
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                      placeholder="Pick a date"
                      format="MMM D, YYYY"
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                    />
                  </Form.Item>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t("rides.time")}</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Form.Item
                      name="time"
                      rules={[
                        {
                          type: "string",
                          required: true,
                          message: "Please input your start time!",
                        },
                      ]}
                    >
                      <Input type="time" className="pl-8" />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2"></div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="seats">{t("rides.seats")}</Label>
                  <div className="pt-2">
                    <Form.Item name="seatsAvailable">
                      <Slider
                        max={7}
                        min={1}
                        step={1}
                        marks={{ 1: "1", 7: "7" }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per seat</Label>
                  <div className="flex items-center gap-2">
                    <Form.Item
                      name="price"
                      rules={[
                        {
                          required: true,
                          message: "Please input your price!",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Price" />
                    </Form.Item>

                    <Form.Item
                      name="currency"
                      rules={[
                        {
                          type: "string",
                          required: true,
                          message: "Please input your currency!",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100px" }}
                        placeholder="Currency"
                        options={[
                          { value: "MKD", label: "MKD" },
                          { value: "EUR", label: "EUR" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="luggage">Luggage Size</Label>
                  {/* Replace Select with Ant Design Select */}
                  <div className="flex items-center gap-2">
                    <Form.Item
                      className="w-full"
                      name="luggageSize"
                      rules={[
                        {
                          type: "string",
                          required: true,
                          message: "Please input your luggage!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Luggage"
                        options={[
                          { value: "SMALL", label: "Small" },
                          { value: "MEDIUM", label: "Medium" },
                          { value: "LARGE", label: "Large" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="stops">Allow stops along the way?</Label>
                  {/* Replace Switch with Ant Design Switch */}
                  <Switch
                    id="stops"
                    checked={formData.stops}
                    onChange={(checked) => {
                      handleSwitchChange("stops", checked);
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  If enabled, you may pick up or drop off passengers at
                  locations along your route
                </p>
                {formData.stops && (
                  <div className="text-left h-auto w-full pt-5">
                    <Form.Item name={"waypoints"}>
                      <Select
                        options={loadingCities ? [] : cityOptions}
                        placeholder="Select a city"
                        mode="tags"
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
                      />
                    </Form.Item>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Information</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Add any details about your ride, meeting point, etc."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => navigate("/rides")}>Cancel</Button>
              <Button htmlType="submit" type="primary" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Ride
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    </div>
  );
}
