"use client"

import { ScrollText, Shield, AlertTriangle, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"

export default function TermsOfService() {
  const { t,i18n } = useTranslation()

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{t("terms.title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("terms.subtitle")}
        </p>
        <p className="text-sm text-muted-foreground mt-2">{t("terms.lastUpdated")}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Quick Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              {t("terms.overview.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t("terms.overview.content")}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">{t("terms.overview.community")}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{t("terms.overview.safety")}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">{t("terms.overview.responsibility")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1. Acceptance of Terms */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.acceptance.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("terms.acceptance.content1")}
            </p>
            <p className="text-muted-foreground">
              {t("terms.acceptance.content2")}
            </p>
          </CardContent>
        </Card>

        {/* 2. Description of Service */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.service.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("terms.service.content")}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{t("terms.service.includes")}:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t("terms.service.list1")}</li>
                <li>• {t("terms.service.list2")}</li>
                <li>• {t("terms.service.list3")}</li>
                <li>• {t("terms.service.list4")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3. User Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.responsibilities.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{t("terms.responsibilities.allUsers")}:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• {t("terms.responsibilities.list1")}</li>
                  <li>• {t("terms.responsibilities.list2")}</li>
                  <li>• {t("terms.responsibilities.list3")}</li>
                  <li>• {t("terms.responsibilities.list4")}</li>
                  <li>• {t("terms.responsibilities.list5")}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">{t("terms.responsibilities.drivers")}:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• {t("terms.responsibilities.list6")}</li>
                  <li>• {t("terms.responsibilities.list7")}</li>
                  <li>• {t("terms.responsibilities.list8")}</li>
                  <li>• {t("terms.responsibilities.list9")}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Safety and Liability */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.safety.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">{t("terms.safety.notice")}</h4>
              <p className="text-sm text-red-700">
                {t("terms.safety.content")}
              </p>
            </div>
            <p className="text-muted-foreground">
              {t("terms.safety.content2")}
            </p>
          </CardContent>
        </Card>

        {/* 5. Payment Terms */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.payment.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("terms.payment.content")}
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{t("terms.payment.guidelines")}:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t("terms.payment.list1")}</li>
                <li>• {t("terms.payment.list2")}</li>
                <li>• {t("terms.payment.list3")}</li>
                <li>• {t("terms.payment.list4")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 6. Prohibited Uses */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.prohibited.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              {t("terms.prohibited.content")}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">{t("terms.prohibited.contentViolations")}:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t("terms.prohibited.list1")}</li>
                  <li>• {t("terms.prohibited.list2")}</li>
                  <li>• {t("terms.prohibited.list3")}</li>
                  <li>• {t("terms.prohibited.list4")}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t("terms.prohibited.serviceMisuse")}:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t("terms.prohibited.list5")}</li>
                  <li>• {t("terms.prohibited.list6")}</li>
                  <li>• {t("terms.prohibited.list7")}</li>
                  <li>• {t("terms.prohibited.list8")}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Account Termination */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.termination.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("terms.termination.content1")}
            </p>
            <p className="text-muted-foreground">
              {t("terms.termination.content2")}
            </p>
          </CardContent>
        </Card>

        {/* 8. Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.changes.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t("terms.changes.content")}
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.contact.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t("terms.contact.content")}
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>{t("terms.contact.email")}</strong> support@gotogether.mk
              </p>
              <p>
                <strong>{t("terms.contact.address")}</strong> {
                  // Display address based on language
                  i18n.language === 'en' ? 'Skopje, North Macedonia' :
                  i18n.language === 'mk' ? 'Скопје, Северна Македонија' :
                  'Shkup, Maqedonia e Veriut'
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button variant="outline" asChild>
                <Link to="/contact">{t("terms.contact.support")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/privacy">{t("terms.contact.privacy")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}