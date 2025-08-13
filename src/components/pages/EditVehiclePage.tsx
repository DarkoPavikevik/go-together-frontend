"use client";

import { InboxOutlined } from "@ant-design/icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, InputNumber, Select, Switch } from "antd";
import type { RcFile } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import { Camera, Car, Check, Loader2, Settings, Shield } from "lucide-react";
import { nanoid } from "nanoid";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import { createVehicle, updateVehicle } from "../../services/vehicle/vehicleService.ts";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Label } from "../ui/Label";
import { useTheme } from "../ui/ThemeProvider";
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const carMakes = [
  "Audi", "BMW", "Chevrolet", "Citroën", "Fiat", "Ford", "Honda", 
  "Hyundai", "Kia", "Mazda", "Mercedes-Benz", "Nissan", "Opel", 
  "Peugeot", "Renault", "Škoda", "Toyota", "Volkswagen", "Volvo"
];

const carColors = [
  "Black", "White", "Silver", "Gray", "Blue", "Red", "Green", 
  "Yellow", "Orange", "Brown", "Purple", "Gold", "Beige"
];

interface IFormData {
  userId: number;
  brand: string;
  model: string;
  picture: string;
  plateNumber: string;
  seats: number;
  year: number;
  color: string;
  airCondition: boolean;
  usbCharging: boolean;
  music: boolean;
  comfortableSeats: boolean;
}

export default function EditVehicle() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<RcFile | null>(null);
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const supabase = useSupabaseClient();
  const { me, refetch } = useUser();

  const { mutate: updateVehicleMutation } = useMutation({
    mutationKey: ["update-vehicle"],
    mutationFn: (data: IFormData) => updateVehicle(me?.vehicle.id as number, data),
    onSuccess: () => {
      enqueueSnackbar(t("editVehicle.messages.updateSuccess"), { variant: "success" });
      refetch();
      setIsLoading(false);
      navigate("/profile");
    },
  });

  const { mutate: createVehicleMutation } = useMutation({
    mutationKey: ["update-vehicle"],
    mutationFn: (data: IFormData) => createVehicle(me?.id as number, data),
    onSuccess: () => {
      enqueueSnackbar(t("editVehicle.messages.createSuccess"), { variant: "success" });
      refetch();
      setIsLoading(false);
      navigate("/profile");
    },
  });

  const handleSubmit = async (formData: IFormData) => {
    setIsLoading(true);
    try {
      let vehiclePicture = me?.vehicle ? me?.vehicle.picture : "";
      if (selectedImage) {
        const { data, error } = await supabase.storage
          .from("storage")
          .upload(me?.id + "/" + nanoid(), selectedImage, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          enqueueSnackbar(t("editVehicle.messages.uploadError"), { variant: "error" });
          console.log(error);
          return;
        }

        vehiclePicture = `https://qloapwicswrnfibjjqsp.supabase.co/storage/v1/object/public/${data.fullPath}`;
      }
      const body: IFormData = {
        ...formData,
        userId: me?.id as number,
        picture: vehiclePicture as string,
      };
      if (me?.vehicle) {
        await updateVehicleMutation(body);
      } else {
        await createVehicleMutation(body);
      }
    } catch (error) {
      enqueueSnackbar(t("editVehicle.messages.saveError"), { variant: "error" });
      console.error(error);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const buttonStyle = theme === "dark"
    ? { backgroundColor: "#6e3fac", borderColor: "#6e3fac", color: "white" }
    : { color: "white", backgroundColor: "#646cff" };
  
  const props = {
    name: "file",
    accept: "image/png,image/jpeg,image/jpg",
    maxCount: 1,
    beforeUpload: (file: RcFile) => {
      setSelectedImage(file);
      return false;
    },
  };

  const formattedColor = me?.vehicle && me?.vehicle.color
    ? me.vehicle.color.charAt(0).toUpperCase() + me.vehicle.color.slice(1).toLowerCase()
    : "";

  return (
    <div className="container px-24 py-8">
      <div className="mb-8 text-left">
        <Button
          variant="outlined"
          className="mb-4"
          onClick={() => navigate("/profile")}
        >
          ← {t("editVehicle.back")}
        </Button>
        <h1 className="text-3xl font-bold">
          {me?.vehicle?.id ? t("editVehicle.title") : t("editVehicle.addTitle")}
        </h1>
        <p className="text-muted-foreground">
          {me?.vehicle?.id
            ? t("editVehicle.editDescription")
            : t("editVehicle.addDescription")}
        </p>
      </div>

      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          brand: me?.vehicle?.brand ?? "",
          model: me?.vehicle?.model ?? "",
          picture: me?.vehicle?.picture ?? "",
          plateNumber: me?.vehicle?.plateNumber ?? "",
          seats: me?.vehicle?.seats ?? 0,
          year: me?.vehicle?.year ?? 0,
          color: formattedColor ?? "",
          airCondition: me?.vehicle?.airCondition ?? true,
          usbCharging: me?.vehicle?.usbCharging ?? true,
          music: me?.vehicle?.music ?? true,
          comfortableSeats: me?.vehicle?.comfortableSeats ?? true,
        }}
      >
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              {t("editVehicle.basicInfo.title")}
            </CardTitle>
            <CardDescription className="text-left">
              {t("editVehicle.basicInfo.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-left">
                  <Label>{t("editVehicle.basicInfo.brand")}</Label>
                </div>
                <Form.Item
                  name={"brand"}
                  rules={[{
                    required: true,
                    message: t("editVehicle.validation.brandRequired"),
                  }]}
                >
                  <Select
                    placeholder={t("editVehicle.basicInfo.brandPlaceholder")}
                    className="w-full"
                    showSearch
                  >
                    {carMakes.map((make) => (
                      <Option key={make} value={make}>
                        {make}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="space-y-2">
                <div className="text-left">
                  <Label>{t("editVehicle.basicInfo.model")}</Label>
                </div>
                <Form.Item
                  name={"model"}
                  rules={[{
                    required: true,
                    message: t("editVehicle.validation.modelRequired"),
                  }]}
                >
                  <Input placeholder={t("editVehicle.basicInfo.modelPlaceholder")} />
                </Form.Item>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <div className="text-left">
                  <Label>{t("editVehicle.basicInfo.year")}</Label>
                </div>
                <Form.Item
                  name={"year"}
                  rules={[{
                    required: true,
                    message: t("editVehicle.validation.yearRequired"),
                  }]}
                >
                  <Select 
                    placeholder={t("editVehicle.basicInfo.yearPlaceholder")} 
                    className="w-full"
                  >
                    {years.map((year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="space-y-2">
                <div className="text-left">
                  <Label>{t("editVehicle.basicInfo.color")}</Label>
                </div>
                <Form.Item
                  name={"color"}
                  rules={[{
                    required: true,
                    message: t("editVehicle.validation.colorRequired"),
                  }]}
                >
                  <Select 
                    placeholder={t("editVehicle.basicInfo.colorPlaceholder")} 
                    className="w-full"
                  >
                    {carColors.map((color) => (
                      <Option key={color} value={color}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          {color}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div className="space-y-2">
                <div className="text-left">
                  <Label>{t("editVehicle.basicInfo.licensePlate")}</Label>
                </div>
                <Form.Item
                  name={"plateNumber"}
                  rules={[{
                    required: true,
                    message: t("editVehicle.validation.plateRequired"),
                  }]}
                >
                  <Input placeholder="SK-1234-AB" />
                </Form.Item>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="text-left">
                  <Label>{t("editVehicle.basicInfo.seats")}</Label>
                </div>
                <Form.Item
                  name={"seats"}
                  rules={[{
                    required: true,
                    message: t("editVehicle.validation.seatsRequired"),
                  }, {
                    type: "number",
                    min: 2,
                    max: 9,
                    message: t("editVehicle.validation.seatsRange"),
                  }]}
                >
                  <InputNumber
                    placeholder={t("editVehicle.basicInfo.seatsPlaceholder")}
                    style={{ width: "100%" }}
                    className="w-full bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                </Form.Item>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features & Amenities Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t("editVehicle.features.title")}
            </CardTitle>
            <CardDescription className="text-left">
              {t("editVehicle.features.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-blue-100 text-blue-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>{t("editVehicle.features.airCondition")}</span>
                    </div>
                    <Form.Item name={"airCondition"} valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-green-100 text-green-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>{t("editVehicle.features.usbCharging")}</span>
                    </div>
                    <Form.Item name={"usbCharging"} valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-purple-100 text-purple-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>{t("editVehicle.features.music")}</span>
                    </div>
                    <Form.Item name={"music"} valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-orange-100 text-orange-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>{t("editVehicle.features.comfortableSeats")}</span>
                    </div>
                    <Form.Item name={"comfortableSeats"} valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Photos Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              {t("editVehicle.photos.title")}
            </CardTitle>
            <CardDescription className="text-left">
              {t("editVehicle.photos.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Form.Item style={{ maxWidth: 500 }} name={"picture"}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {t("editVehicle.photos.uploadText")}
                  </p>
                  <p className="ant-upload-hint">
                    {t("editVehicle.photos.uploadHint")}
                  </p>
                </Dragger>
              </Form.Item>
            </div>
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card>
          <CardFooter className="flex justify-between">
            <Button onClick={() => navigate("/profile")} disabled={isLoading}>
              {t("editVehicle.actions.cancel")}
            </Button>
            <Button
              htmlType="submit"
              disabled={isLoading}
              className="min-w-[120px]"
              style={buttonStyle}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("editVehicle.actions.saving")}
                </div>
              ) : (
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  {t("editVehicle.actions.save")}
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}