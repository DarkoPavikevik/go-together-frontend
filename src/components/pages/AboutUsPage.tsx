"use client"


import { Car, Users, Leaf } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"

export default function AboutUs() {
  const { t } = useTranslation()

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About GoTogether</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We connect people who share the same journey to make transportation more affordable and sustainable.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* What We Do */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              GoTogether is a ride-sharing platform that helps people find and offer rides across North Macedonia.
              Whether you're commuting to work, traveling between cities, or going to university, we help you connect
              with others going the same way.
            </p>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Safe Community</h3>
              <p className="text-sm text-muted-foreground">Verified users and rating system for safe travels</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Leaf className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">Reduce carbon footprint by sharing rides</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Car className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Affordable</h3>
              <p className="text-sm text-muted-foreground">Save money on transportation costs</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Mission */}
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              To make transportation accessible and affordable for everyone while reducing environmental impact. We
              believe that by sharing rides, we can build stronger communities and create a more sustainable future.
            </p>
            <p className="text-muted-foreground">
              Founded in 2025 in Skopje, GoTogether has helped thousands of people across North Macedonia save money and
              reduce their carbon footprint.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Have questions or need help? We're here to assist you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sign-up">Join GoTogether</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
