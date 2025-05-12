"use client";

import {
  AutoComplete,
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Select,
  Slider,
  Switch,
} from "antd";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Label } from "@radix-ui/react-label";
import { Clock, Container, Loader2, MapPin } from "lucide-react";
import dayjs from "dayjs";
import { Textarea } from "../ui/Textarea";

export default function CreateRidePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: null as Date | null,
    time: "",
    seats: 3,
    price: 500,
    currency: "MKD",
    luggage: "Medium",
    description: "",
    stops: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSliderChange = (name: string, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would connect to your Spring Boot backend
      // const response = await fetch('/api/rides', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to rides page after successful creation
      navigate("/rides");
    } catch (error) {
      console.error("Failed to create ride:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
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
                    <Input
                      id="from"
                      name="from"
                      placeholder="City or location"
                      className="pl-8"
                      required
                      value={formData.from}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">{t("rides.to")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="to"
                      name="to"
                      placeholder="City or location"
                      className="pl-8"
                      required
                      value={formData.to}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">{t("rides.date")}</Label>
                  {/* Replace Popover and Calendar with Ant Design DatePicker */}
                  <DatePicker
                    id="date"
                    className="w-full"
                    placeholder="Pick a date"
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        date: date ? date.toDate() : null,
                      })
                    }
                    value={formData.date ? dayjs(formData.date) : null}
                    format="MMM D, YYYY"
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t("rides.time")}</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      className="pl-8"
                      required
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2"></div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="seats">{t("rides.seats")}</Label>
                  <div className="pt-2">
                    {/* Replace Slider with Ant Design Slider */}
                    <Slider
                      id="seats"
                      defaultValue={formData.seats}
                      max={7}
                      min={1}
                      step={1}
                      onChange={(value) =>
                        handleSliderChange("seats", value as number)
                      }
                      marks={{ 1: "1", 7: "7" }}
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>{formData.seats}</span>
                      <span>7</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per seat</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      required
                      value={formData.price}
                      onChange={handleChange}
                    />
                    {/* Replace Select with Ant Design Select */}
                    <Select
                      value={formData.currency}
                      onChange={(value) =>
                        handleSelectChange("currency", value)
                      }
                      style={{ width: "100px" }}
                      options={[
                        { value: "MKD", label: "MKD" },
                        { value: "EUR", label: "EUR" },
                      ]}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="luggage">Luggage Size</Label>
                  {/* Replace Select with Ant Design Select */}
                  <Select
                    id="luggage"
                    value={formData.luggage}
                    onChange={(value) => handleSelectChange("luggage", value)}
                    style={{ width: "100%" }}
                    options={[
                      { value: "Small", label: "Small" },
                      { value: "Medium", label: "Medium" },
                      { value: "Large", label: "Large" },
                    ]}
                  />
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
                    <Select
                      showSearch
                      placeholder="Select a stop"
                      className="w-full"
                      mode="tags"
                      options={[
                        { id: 1, value: "Dare" },
                        { id: 2, value: "Dimsa" },
                        { id: 3, value: "Boko" },
                        { id: 4, value: "Bubi" },
                        { id: 5, value: "Boki" },
                        { id: 6, value: "Mert" },
                        { id: 7, value: "Eren" },
                        { id: 8, value: "Norik" },
                        { id: 9, value: "Barca" },
                        { id: 10, value: "Barca > Real" },
                      ]}
                      onChange={(value) => console.log(value)}
                    ></Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Information</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Add any details about your ride, meeting point, etc."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Ride
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
