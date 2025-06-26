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
        <h1 className="text-4xl font-bold mb-4">{t("about.title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("about.subtitle")}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* What We Do */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              {t("about.whatWeDo.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("about.whatWeDo.content")}
            </p>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{t("about.feature1.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.feature1.desc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Leaf className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{t("about.feature2.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.feature2.desc")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Car className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">{t("about.feature3.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("about.feature3.desc")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Mission */}
        <Card>
          <CardHeader>
            <CardTitle>{t("about.mission.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t("about.mission.content1")}
            </p>
            <p className="text-muted-foreground">
              {t("about.mission.content2")}
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>{t("about.contact.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{t("about.contact.content")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild>
                <Link to="/contact">{t("about.contact.support")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/sign-up">{t("about.contact.join")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}