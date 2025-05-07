"use client";

import { Car, CreditCard, MapPin, Search, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { useTranslation } from "react-i18next";
import { Button as AntdButton, DatePicker, type DatePickerProps } from "antd";
import { Button } from "../ui/Button";

export default function Home() {
  const { t } = useTranslation();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            {t("home.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/rides">
                <Search className="mr-2 h-4 w-4" />
                {t("home.findRide")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/rides/create">
                <Car className="mr-2 h-4 w-4" />
                {t("home.offerRide")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container py-12">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>{t("rides.search")}</CardTitle>
            <CardDescription>
              Find rides that match your travel plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="from">{t("rides.from")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="from"
                    placeholder="City or location"
                    className="pl-8"
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
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">{t("rides.date")}</Label>
                <DatePicker
                  onChange={onChange}
                  size="large"
                  style={{ borderColor: "black" }}
                />

                {/* <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setOpen(!open)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        dayjs(date).format("DD.MM.YYYY")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setOpen(false); // Close popover after date selection
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}
              </div>
              <div className="grid gap-2 sm:col-span-2 md:col-span-1">
                <Label>&nbsp;</Label>
                <AntdButton
                  className="w-full"
                  variant="solid"
                  size="large"
                  color="primary"
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
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">{t("home.howItWorks")}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("home.step1")}</h3>
                <p className="text-muted-foreground">
                  Create your profile, add your photo and verify your phone
                  number for added security.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("home.step2")}</h3>
                <p className="text-muted-foreground">
                  Search for rides or offer your own. Connect with travelers
                  going your way.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-xl font-bold">{t("home.step3")}</h3>
                <p className="text-muted-foreground">
                  Travel together, share costs, and rate your experience to help
                  the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">{t("home.benefits")}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <CreditCard className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit1")}</h3>
                <p className="text-muted-foreground">
                  Share travel expenses and save money on your journeys.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Car className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit2")}</h3>
                <p className="text-muted-foreground">
                  Fewer cars on the road means less pollution and traffic.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit3")}</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded travelers and make new friends.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <MapPin className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-bold">{t("home.benefit4")}</h3>
                <p className="text-muted-foreground">
                  Enjoy a comfortable journey with verified drivers and
                  passengers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="User"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">Ana K.</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "I've been using GoTogether for my daily commute to work. It's
                  saved me so much money and I've made some great friends!"
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="User"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">Marko S.</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "As a driver, I can offset my travel costs and help others.
                  The app makes it easy to find passengers going my way."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="User"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">Elena T.</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "I travel between cities often and GoTogether has been a
                  game-changer. Safe, reliable, and much cheaper than other
                  options."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-6 mx-auto max-w-[600px] text-primary-foreground/90 md:text-lg">
              Join thousands of travelers who are already saving money and
              reducing their carbon footprint.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth/signup">{t("nav.signUp")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/rides">{t("home.findRide")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
