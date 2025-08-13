"use client";

import { Button as AntdButton, Avatar, Button, DatePicker, Select } from "antd";
import { Car, CreditCard, MapPin, Search, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useUser } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getCitiesByCountry } from "../../services/rides/ridesServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Label } from "../ui/Label";
import { useTheme } from "../ui/ThemeProvider";
import { useSearch } from "../../context/SearchContext";
import { getReviews } from "../../services/review/reviewServices";

const sliderSettings = {
  infinite: true,
  speed: 8000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
};

export default function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useUser();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { from, to, date, setFrom, setTo, setDate, setIsSearchActive } =
    useSearch();

  const { data: cities, isLoading: loadingCities } = useQuery({
    queryKey: ["get-cities"],
    queryFn: () => getCitiesByCountry("macedonia"),
  });

  const { data: reviews, isLoading: loadingReviews } = useQuery({
    queryKey: ["get-reviews"],
    queryFn: () => getReviews(),
  });

  const buttonStyle =
    theme === "dark"
      ? { backgroundColor: "#6e3fac", borderColor: "#6e3fac", color: "white" }
      : { color: "white", backgroundColor: "#646cff" };

  const cityOptions = cities?.map((city: { label: string; value: string }) => ({
    label: city,
    value: city,
  }));

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative py-16 md:py-24 homepage-gradient-color">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            {t("home.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="large"
              onClick={() => {
                navigate("/rides");
              }}
            >
              <Search className="mr-2 h-4 w-4 text-[#646cff]" />
              <div className="text-[#646cff] font-bold">
                {t("home.findRide")}
              </div>
            </Button>
            <Button
              size="large"
              className="text-amber-300"
              style={buttonStyle}
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/sign-in");
                } else {
                  navigate("/rides/create");
                }
              }}
            >
              <div className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                {t("home.offerRide")}
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-26 md:py-24 homepage-gradient-three-colors">
        <Card
  className={`mx-auto max-w-4xl shadow-2xl 
    ${theme === "dark" ? "bg-[#1e1e2f] border-[#363654]" : "bg-white border-gray-200"}`}
>
  <CardHeader>
    <CardTitle className={`${theme === "dark" ? "text-white" : "text-black"}`}>
      {t("rides.search")}
    </CardTitle>
    <CardDescription className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
      {t("rides.search.description")}
    </CardDescription>
  </CardHeader>
          <CardContent>
            <form className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="from" className="text-left">
                  {t("rides.from")}
                </Label>
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
          backgroundColor: "#1e1e2f", // input background
          borderColor: "#505070",
          color: "white"
        }
      : {})
  }}
  dropdownStyle={
    theme === "dark"
      ? {
          backgroundColor: "#1e1e2f", // dropdown background
          color: "white",
          borderColor: "#505070"
        }
      : {}
  }
  dropdownRender={(menu) => (
    <div style={theme === "dark" ? { backgroundColor: "#1e1e2f" } : {}}>
      {menu}
    </div>
  )}
  showSearch
  onChange={(e) => {
    setFrom(e);
  }}
/>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="to" className="text-left">
                  {t("rides.to")}
                </Label>
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
                <Label htmlFor="date" className="text-left">
                  {t("rides.date")}
                </Label>
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
                <Label>&nbsp;</Label>
                <AntdButton
                  className="w-full"
                  variant="solid"
                  size="middle"
                  color="primary"
                  style={buttonStyle}
                  onClick={() => {
                    setIsSearchActive(true);
                    navigate("/rides");
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {t("rides.search")}
                </AntdButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      {/* How It Works Section */}
      <section className="w-full py-26 md:py-24 homepage-gradient-three-colors">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">{t("home.howItWorks")}</h2>
          </div>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <Card
              className={`w-[430px] shadow-2xl ${
                theme === "dark" ? "border-[#363654]" : "border-gray-200"
              }`}
            >
              <CardContent className="pt-6">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-primary-foreground ${
                    theme === "dark" ? "bg-[#6e3fac]" : "bg-[#646cff]"
                  } text-white`}
                >
                  1
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("home.step1")}</h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-muted-foreground"
                  }
                >
                  {t("home.howItWorks.description")}
                </p>
              </CardContent>
            </Card>
            <Card
              className={`w-[430px] shadow-2xl ${
                theme === "dark" ? "border-[#363654]" : "border-gray-200"
              }`}
            >
              <CardContent className="pt-6">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-primary-foreground ${
                    theme === "dark" ? "bg-[#6e3fac]" : "bg-[#646cff]"
                  } text-white`}
                >
                  2
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("home.step2")}</h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-muted-foreground"
                  }
                >
                  {t("home.step2.description")}
                </p>
              </CardContent>
            </Card>
            <Card
              className={`w-[430px] shadow-2xl ${
                theme === "dark" ? "border-[#363654]" : "border-gray-200"
              }`}
            >
              <CardContent className="pt-6">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-primary-foreground ${
                    theme === "dark" ? "bg-[#6e3fac]" : "bg-[#646cff]"
                  } text-white`}
                >
                  3
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("home.step3")}</h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-muted-foreground"
                  }
                >
                  {t("home.step3.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-26 homepage-gradient-three-colors">
        <div className="flex flex-col items-center text-center">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">{t("home.benefits")}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="w-[310px] border-gray-200 shadow-2xl">
              <CardContent className="pt-6">
                <CreditCard className="mb-4 h-10 w-10 text-[#646cff]" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit1")}</h3>
                <p className="text-muted-foreground">
                  {t("home.benefit1.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="w-[310px] border-gray-200 shadow-2xl">
              <CardContent className="pt-6">
                <Car className="mb-4 h-10 w-10 text-[#646cff]" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit2")}</h3>
                <p className="text-muted-foreground">
                  {t("home.benefit2.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="w-[310px] border-gray-200 shadow-2xl">
              <CardContent className="pt-6">
                <Users className="mb-4 h-10 w-10 text-[#646cff]" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit3")}</h3>
                <p className="text-muted-foreground">
                  {t("home.benefit3.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="w-[310px] border-gray-200 shadow-2xl">
              <CardContent className="pt-6">
                <MapPin className="mb-4 h-10 w-10 text-[#646cff]" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit4")}</h3>
                <p className="text-muted-foreground">
                  {t("home.benefit4.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`w-full py-16 md:py-24 ${
          isAuthenticated
            ? "homepage-gradient-bottom-color"
            : "homepage-gradient-three-colors"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">{t("home.whatTheySay")}</h2>
          </div>

          <div className="w-full max-w-7xl">
            <Slider {...sliderSettings}>
              {!loadingReviews &&
                reviews.map(
                  (review: {
                    id: number;
                    reviewerPicture: string;
                    reviewerName: string;
                    rating: number;
                    comment: string;
                  }) => (
                    <div key={review.id} className="px-4">
                      <Card className="h-full border-gray-200 shadow-lg">
                        <CardContent className="pt-6">
                          <div className="mb-4 flex items-center gap-4">
                            <Avatar
                              alt="test"
                              size={"large"}
                              src={review.reviewerPicture}
                            >
                              {review.reviewerPicture === null &&
                                review.reviewerName.charAt(0)}
                            </Avatar>
                            <div>
                              <h4 className="font-bold">
                                {review.reviewerName}
                              </h4>
                              <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i}>
                                    {i < review.rating ? "★" : "☆"}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="italic text-muted-foreground">
                            {review.comment}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )
                )}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="w-full py-26 homepage-gradient-bottom-color">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="mb-4 text-3xl font-bold">
                {t("home.titlejourney")}
              </h2>
              <p className="mb-6 mx-auto max-w-[600px] text-primary-foreground/90 md:text-lg">
                {t("home.titlejourney.description")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Button
                  size="large"
                  variant="outlined"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  {t("nav.signUp")}
                </Button>
                <Button
                  size="large"
                  className="text-amber-300"
                  style={buttonStyle}
                  onClick={() => {
                    navigate("/rides");
                  }}
                >
                  <div className="flex items-center">
                    <Car className="mr-2 h-4 w-4" />
                    {t("home.findRide")}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
