"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Upload,
  X,
  Check,
  Loader2,
  Camera,
  Users,
  Shield,
  Settings,
} from "lucide-react";
import {
  Select,
  InputNumber,
  Switch,
  Upload as AntUpload,
  message,
  Button,
  Card,
  Input,
} from "antd";
import { useTranslation } from "react-i18next";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";

const { Option } = Select;

// Mock current vehicle data
const mockVehicleData = {
  id: 1,
  make: "Volkswagen",
  model: "Golf",
  year: 2018,
  color: "Blue",
  plate: "SK-1234-AB",
  seats: 4,
  fuelType: "Gasoline",
  transmission: "Manual",
  airConditioning: true,
  bluetooth: true,
  usbCharging: true,
  musicSystem: true,
  smokingAllowed: false,
  petsAllowed: true,
  description:
    "Comfortable and reliable car, perfect for city and highway driving. Well-maintained with regular service.",
  images: [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ],
};

const carMakes = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Citroën",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Škoda",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

const carColors = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
  "Purple",
  "Gold",
  "Beige",
];

const fuelTypes = ["Gasoline", "Diesel", "Hybrid", "Electric", "LPG", "CNG"];

export default function EditVehicle() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(mockVehicleData);
  const [uploadedImages, setUploadedImages] = useState(mockVehicleData.images);

  const handleInputChange = (field, value) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature, checked) => {
    setVehicleData((prev) => ({ ...prev, [feature]: checked }));
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // In a real app, you'd get the URL from the server response
      const newImageUrl = URL.createObjectURL(info.file.originFileObj);
      setUploadedImages((prev) => [...prev, newImageUrl]);
      message.success("Image uploaded successfully!");
    }
    if (info.file.status === "error") {
      message.error("Image upload failed.");
    }
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would connect to your Spring Boot backend
      // const response = await fetch('/api/vehicles', {
      //   method: vehicleData.id ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...vehicleData, images: uploadedImages }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      message.success("Vehicle information saved successfully!");

      // Redirect back to profile
      navigate("/profile");
    } catch (error) {
      console.error("Failed to save vehicle:", error);
      message.error("Failed to save vehicle information.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button
          variant="outlined"
          className="mb-4"
          onClick={() => navigate("/profile")}
        >
          ← Back to Profile
        </Button>
        <h1 className="text-3xl font-bold">
          {vehicleData.id ? "Edit Vehicle" : "Add Vehicle"}
        </h1>
        <p className="text-muted-foreground">
          {vehicleData.id
            ? "Update your vehicle information to help passengers identify your car"
            : "Add your vehicle information to start offering rides"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Enter the basic details about your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Select
                  id="make"
                  value={vehicleData.make}
                  onChange={(value) => handleInputChange("make", value)}
                  placeholder="Select car make"
                  className="w-full"
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {carMakes.map((make) => (
                    <Option key={make} value={make}>
                      {make}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={vehicleData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="e.g. Golf, Corolla, Focus"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select
                  id="year"
                  value={vehicleData.year}
                  onChange={(value) => handleInputChange("year", value)}
                  placeholder="Select year"
                  className="w-full"
                  size="large"
                >
                  {years.map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color *</Label>
                <Select
                  id="color"
                  value={vehicleData.color}
                  onChange={(value) => handleInputChange("color", value)}
                  placeholder="Select color"
                  className="w-full"
                  size="large"
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="plate">License Plate *</Label>
                <Input
                  id="plate"
                  value={vehicleData.plate}
                  onChange={(e) =>
                    handleInputChange("plate", e.target.value.toUpperCase())
                  }
                  placeholder="SK-1234-AB"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Technical Details
            </CardTitle>
            <CardDescription>
              Provide technical information about your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="seats">Number of Seats *</Label>
                <InputNumber
                  id="seats"
                  value={vehicleData.seats}
                  onChange={(value) => handleInputChange("seats", value)}
                  min={2}
                  max={9}
                  className="w-full"
                  size="large"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select
                  id="fuelType"
                  value={vehicleData.fuelType}
                  onChange={(value) => handleInputChange("fuelType", value)}
                  placeholder="Select fuel type"
                  className="w-full"
                  size="large"
                >
                  {fuelTypes.map((fuel) => (
                    <Option key={fuel} value={fuel}>
                      {fuel}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  id="transmission"
                  value={vehicleData.transmission}
                  onChange={(value) => handleInputChange("transmission", value)}
                  placeholder="Select transmission"
                  className="w-full"
                  size="large"
                >
                  <Option value="Manual">Manual</Option>
                  <Option value="Automatic">Automatic</Option>
                  <Option value="Semi-Automatic">Semi-Automatic</Option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features & Amenities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Features & Amenities
            </CardTitle>
            <CardDescription>
              Select the features available in your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Comfort Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-blue-100 text-blue-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>Air Conditioning</span>
                    </div>
                    <Switch
                      checked={vehicleData.airConditioning}
                      onChange={(checked) =>
                        handleFeatureToggle("airConditioning", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-green-100 text-green-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>Bluetooth</span>
                    </div>
                    <Switch
                      checked={vehicleData.bluetooth}
                      onChange={(checked) =>
                        handleFeatureToggle("bluetooth", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-purple-100 text-purple-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>USB Charging</span>
                    </div>
                    <Switch
                      checked={vehicleData.usbCharging}
                      onChange={(checked) =>
                        handleFeatureToggle("usbCharging", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-orange-100 text-orange-600">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>Music System</span>
                    </div>
                    <Switch
                      checked={vehicleData.musicSystem}
                      onChange={(checked) =>
                        handleFeatureToggle("musicSystem", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Policies</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-red-100 text-red-600">
                        <X className="h-4 w-4" />
                      </div>
                      <span>Smoking Allowed</span>
                    </div>
                    <Switch
                      checked={vehicleData.smokingAllowed}
                      onChange={(checked) =>
                        handleFeatureToggle("smokingAllowed", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-yellow-100 text-yellow-600">
                        <Users className="h-4 w-4" />
                      </div>
                      <span>Pets Allowed</span>
                    </div>
                    <Switch
                      checked={vehicleData.petsAllowed}
                      onChange={(checked) =>
                        handleFeatureToggle("petsAllowed", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Vehicle Photos
            </CardTitle>
            <CardDescription>
              Add photos of your vehicle to help passengers identify it
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Vehicle ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {uploadedImages.length < 5 && (
                <AntUpload
                  name="vehiclePhoto"
                  listType="picture-card"
                  className="upload-list-inline"
                  showUploadList={false}
                  onChange={handleImageUpload}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Photo</span>
                  </div>
                </AntUpload>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              You can upload up to 5 photos. The first photo will be used as the
              main image.
            </p>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>
              Provide any additional details about your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={vehicleData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe your vehicle, its condition, any special features, or important information for passengers..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/profile")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save Vehicle
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
