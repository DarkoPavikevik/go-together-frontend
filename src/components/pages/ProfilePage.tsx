"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Car, Edit, Loader2, Phone, Star, User } from "lucide-react";
import { format } from "date-fns";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Avatar, Button, Form, Image, Tag } from "antd";
import { Link } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { nanoid } from "nanoid";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import useAuthController from "../../services/auth/useAuthController";
import { useUser } from "../../context/AuthContext";
import { enqueueSnackbar } from "notistack";
import type { RcFile } from "antd/es/upload";
// Mock user data
const mockUser = {
  id: 1,
  name: "Aleksandar Markovski",
  email: "aleksandar@example.com",
  phone: "+389 70 123 456",
  avatar: null,
  bio: "I travel frequently between Skopje and Ohrid. I'm a safe driver and enjoy good conversation during trips.",
  rating: 4.8,
  ridesCompleted: 42,
  joinedDate: new Date(2022, 1, 15),
  preferences: {
    smoking: false,
    pets: true,
    music: true,
    talking: true,
  },
  vehicle: {
    model: "Volkswagen Golf",
    color: "Blue",
    year: 2018,
    plate: "SK-1234-AB",
    seats: 4,
    image:
      "https://www.mercedes-benz.co.uk/content/dam/hq/passengercars/cars/a-class/hatchback-w177-fl-pi/modeloverview/08-2022/images/mercedes-benz-a-class-w177-696x392-08-2022.jpg",
  },
  reviews: [
    {
      id: 1,
      user: {
        name: "Elena T.",
        avatar: null,
      },
      rating: 5,
      date: new Date(2023, 5, 10),
      comment:
        "Great driver, very punctual and friendly. The car was clean and comfortable.",
    },
    {
      id: 2,
      user: {
        name: "Marko D.",
        avatar: null,
      },
      rating: 4,
      date: new Date(2023, 4, 22),
      comment: "Good experience overall. Would ride again.",
    },
  ],
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const { addProfilePicture } = useAuthController();
  const { me, refetch } = useUser();
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  });
  // const userSupabase = useUser();
  const supabase = useSupabaseClient();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      // Here you would connect to your Spring Boot backend
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setUser((prev) => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (e: RcFile) => {
    let file = e;
    const { data, error } = await supabase.storage
      .from("storage")
      .upload(user.id + "/" + nanoid(), file, {
        cacheControl: "3600",
        upsert: false,
      });
    await addProfilePicture(me?.id as number, {
      profilePicture: `https://qloapwicswrnfibjjqsp.supabase.co/storage/v1/object/public/${data?.fullPath}`,
    });
    if (data) {
      enqueueSnackbar("Success with adding image", { variant: "success" });
      refetch();
      setIsEditing(false);
    } else {
      enqueueSnackbar("Error with adding image", { variant: "error" });
      console.log(error);
    }
  };

  const props = {
    name: "file",
    accept: "image/png,image/jpeg,image/jpg",
    maxCount: 1,
    beforeUpload: (file: RcFile) => {
      uploadImage(file);
      return false;
    },
  };

  //  <Form.Item style={{ maxWidth: 500 }}>
  //       <Dragger {...props}>
  //         <p className="ant-upload-drag-icon">
  //           <InboxOutlined />
  //         </p>
  //         <p className="ant-upload-text">Click or drag image to upload</p>
  //         <p className="ant-upload-hint">
  //           Only PNG and JPEG files are allowed.
  //         </p>
  //       </Dragger>
  //     </Form.Item>

  console.log(me);
  return (
    <div className="container py-8">
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-bold">{t("nav.profile")}</h1>
        <p className="text-gray-400">{t("profile.description")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar
                  style={{ width: "100px", height: "100px" }}
                  src={me?.profilePicture}
                >
                  <div className="text-3xl">
                    {me?.profilePicture == null && me?.username.charAt(0)}
                  </div>
                </Avatar>
                <h2 className="text-xl font-bold">{me?.username}</h2>
                <div className="flex items-center text-sm">
                  <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{me?.rating}</span>
                  <span className="mx-1 text-muted-foreground">·</span>
                  <span className="text-gray-400">
                    {user.ridesCompleted} {t("profile.rides")}
                  </span>
                </div>
                {me?.created && (
                  <p className="mt-1 text-sm text-gray-400">
                    {t("profile.member")} {format(me?.created, "MMMM yyyy")}
                  </p>
                )}

                <div className="mt-4 w-full border-gray-200">
                  <Button className="w-full" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    {t("profile.editProfile")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>
                <div className="text-left">{t("profile.contact")}</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{me?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{me?.phoneNumber}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>
                <div className="text-left">{t("profile.preferences")}</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Smoking</span>
                  <Tag
                    style={{ borderRadius: "999px" }}
                    color={me?.smoking ? "blue-inverse" : "red-inverse"}
                  >
                    {me?.smoking ? "Allowed" : "Not allowed"}
                  </Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pets</span>
                  <Tag
                    style={{ borderRadius: "999px" }}
                    color={me?.pets ? "blue-inverse" : "red-inverse"}
                  >
                    {me?.pets ? "Allowed" : "Not allowed"}
                  </Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span>Music</span>
                  <Tag
                    style={{ borderRadius: "999px" }}
                    color={me?.music ? "blue-inverse" : "red-inverse"}
                  >
                    {me?.music ? "Allowed" : "Not allowed"}
                  </Tag>
                </div>
                <div className="flex items-center justify-between">
                  <span>Talking</span>
                  <Tag
                    style={{ borderRadius: "999px" }}
                    color={me?.talking ? "blue-inverse" : "red-inverse"}
                  >
                    {me?.talking ? "Allowed" : "Not allowed"}
                  </Tag>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
                <div className="w-full space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center justify-center gap-4">
                    <Form.Item style={{ maxWidth: 500 }}>
                      <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag image to upload
                        </p>
                        <p className="ant-upload-hint">
                          Only PNG and JPEG files are allowed.
                        </p>
                      </Dragger>
                    </Form.Item>
                  </div>
                  {/* <div className="flex items-center gap-4">
                    <Button>Change Picture</Button>
                  </div> */}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-gray-200">
              <CardHeader>
                <div className="text-left">
                  <CardTitle>{t("profile.aboutme")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-left">{me?.bio}</p>
              </CardContent>
            </Card>
          )}

          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t("profile.vehicle")}</CardTitle>
                <Button>
                  <Link to="/vehicle">
                    {user.vehicle ? "Edit Vehicle" : t("profile.addVehicle")}
                  </Link>
                </Button>
              </div>
            </CardHeader>
            {user.vehicle ? (
              <CardContent className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-md">
                  <Image
                    src={user.vehicle.image || "/car-placeholder.png"}
                    alt={user.vehicle.model}
                    width={"100%"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-medium text-left">
                      {t("profile.vehicle.details")}
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Model:</span>
                        <span>{user.vehicle.model}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Color:</span>
                        <span>{user.vehicle.color}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span>{user.vehicle.year}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          License Plate:
                        </span>
                        <span>{user.vehicle.plate}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Seats:</span>
                        <span>{user.vehicle.seats}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-left">
                      {t("profile.vehicle.features")}
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span>✓</span>
                        <span>Air conditioning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span>
                        <span>USB charging</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span>
                        <span>Music</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span>
                        <span>Comfortable seats</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Car className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">No Vehicle Added</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add your vehicle details to start offering rides
                  </p>
                  <Button>
                    <Link to="/profile/vehicle">{t("profile.addVehicle")}</Link>
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-left">
                {t("profile.reviews")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.reviews.length > 0 ? (
                <div className="space-y-6">
                  {user.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar size={"large"} src={review.user.avatar}>
                          {review.user.avatar === null &&
                            review.user.name.charAt(0)}
                        </Avatar>
                        <div>
                          <div className="font-medium text-left">
                            {review.user.name}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? "fill-yellow-500"
                                      : "fill-muted stroke-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-gray-400">
                              {format(review.date, "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-left text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No reviews yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
