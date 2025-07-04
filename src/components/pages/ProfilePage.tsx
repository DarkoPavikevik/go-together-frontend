"use client";

import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import { Avatar, Button, Form, Image, Spin, Tag, Tooltip } from "antd";
import type { RcFile } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import { format } from "date-fns";
import { Car, Edit, Loader2, Phone, Star, User } from "lucide-react";
import { nanoid } from "nanoid";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import useAuthController from "../../services/auth/useAuthController";
import {
  updatePreference,
  updateProfile,
  type IUpdateProfile,
} from "../../services/profile/profileServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import ReviewsList from "../ui/ReviewsList";
import { Textarea } from "../ui/Textarea";
const preferences = [
  { key: "smoking", label: "Smoking" },
  { key: "pets", label: "Pets" },
  { key: "music", label: "Music" },
  { key: "talking", label: "Talking" },
] as const;

export default function ProfilePage() {
  const { t } = useTranslation();
  const { addProfilePicture } = useAuthController();
  const { me, refetch } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<RcFile | null>(null);

  // const userSupabase = useUser();
  const supabase = useSupabaseClient();

  const { mutate: updatePreferenceMutation, isPending } = useMutation({
    mutationKey: ["update-preference"],
    mutationFn: (
      body: Partial<Record<"smoking" | "pets" | "music" | "talking", boolean>>
    ) => updatePreference(me?.id as number, body),
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: updateProfileMutation, isPending: profilePending } =
    useMutation({
      mutationKey: ["update-profile"],
      mutationFn: (body: IUpdateProfile) =>
        updateProfile(me?.id as number, body),
      onSuccess: () => {
        refetch();
      },
    });

  const handleSubmit = async (data: IUpdateProfile) => {
    try {
      let profilePictureUrl = me?.profilePicture;
      if (selectedImage) {
        const { data, error } = await supabase.storage
          .from("storage")
          .upload(me?.id + "/" + nanoid(), selectedImage, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          enqueueSnackbar("Error uploading image", { variant: "error" });
          console.log(error);
          return;
        }

        profilePictureUrl = `https://qloapwicswrnfibjjqsp.supabase.co/storage/v1/object/public/${data.fullPath}`;
      }
      const body = {
        ...data,
        profilePicture: profilePictureUrl,
      };
      await updateProfileMutation(body);
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      refetch();
      setIsEditing(false);
    } catch (error) {
      enqueueSnackbar("Error saving changes", { variant: "error" });
      console.error(error);
    }
  };

  const props = {
    name: "file",
    accept: "image/png,image/jpeg,image/jpg",
    maxCount: 1,
    beforeUpload: (file: RcFile) => {
      setSelectedImage(file);
      return false;
    },
  };

  return (
    <div className="container px-24 py-8">
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
                    {me?.numberOfRides} {t("profile.rides")}
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
                <div className="space-y-2">
                  {preferences.map(({ key, label }) => {
                    const currentValue = me?.[key];
                    const isAllowed = currentValue === true;

                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <span>{label}</span>
                        <Tag
                          style={{ borderRadius: "999px", cursor: "pointer" }}
                          color={isAllowed ? "blue-inverse" : "red-inverse"}
                          onClick={() => {
                            if (!me?.id) return;

                            updatePreferenceMutation({
                              ...["smoking", "pets", "music", "talking"].reduce(
                                (acc, pref) => {
                                  acc[pref] = me?.[pref as keyof typeof me];
                                  return acc;
                                },
                                {} as any
                              ),
                              [key]: !isAllowed,
                            });
                          }}
                        >
                          <Tooltip title="Click to update">
                            {isPending ? (
                              <Spin
                                indicator={
                                  <LoadingOutlined
                                    spin
                                    style={{ color: "white" }}
                                  />
                                }
                                size="small"
                              />
                            ) : isAllowed ? (
                              "Allowed"
                            ) : (
                              "Not allowed"
                            )}
                          </Tooltip>
                        </Tag>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <Form
              onFinish={handleSubmit}
              initialValues={{
                name: me?.username,
                email: me?.email,
                phoneNumber: me?.phoneNumber,
                bio: me?.bio,
              }}
            >
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
                    <Form.Item name="name">
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>

                    <Form.Item name="email">
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone</Label>
                    <Form.Item name="phoneNumber">
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Form.Item name="bio">
                      <Textarea rows={4} />
                    </Form.Item>
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
                  <Button disabled={isLoading} htmlType="submit">
                    {(isLoading || profilePending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </Form>
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
                  <Link to={`/vehicle/${me?.id}`}>
                    {me?.vehicle ? "Edit Vehicle" : t("profile.addVehicle")}
                  </Link>
                </Button>
              </div>
            </CardHeader>
            {me?.vehicle ? (
              <CardContent className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-md">
                  <Image
                    src={me.vehicle.picture || "/car-placeholder.png"}
                    alt={me.vehicle.model}
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
                        <span className="text-muted-foreground">
                          {t("profile.model")}:
                        </span>
                        <span>{me?.vehicle.model}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("profile.color")}:
                        </span>
                        <span>{me?.vehicle.color}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("profile.year")}:
                        </span>
                        <span>{me?.vehicle.year}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("profile.licensePlate")}:
                        </span>
                        <span>{me?.vehicle.plateNumber}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t("profile.seats")}:
                        </span>
                        <span>{me?.vehicle.seats}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-left">
                      {t("profile.vehicle.features")}
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span>{me?.vehicle.airCondition ? "✓" : "X"}</span>
                        <span>{t("profile.air")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>{me?.vehicle.usbCharging ? "✓" : "X"}</span>
                        <span>{t("profile.usb")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>{me?.vehicle.music ? "✓" : "X"}</span>
                        <span>{t("profile.music")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span>{me?.vehicle.comfortableSeats ? "✓" : "X"}</span>
                        <span>{t("profile.confiseats")}</span>
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
              <ReviewsList reviews={me?.reviews} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
