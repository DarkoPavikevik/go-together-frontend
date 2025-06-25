"use client"

import { Shield, Eye, Lock, Database, UserCheck, Globe, Car } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation();

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('privacy.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('privacy.subtitle')}
        </p>
        <p className="text-sm text-muted-foreground mt-2">{t('privacy.lastUpdated')}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Privacy Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('privacy.overview.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t('privacy.overview.content')}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{t('privacy.overview.dataProtected')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">{t('privacy.overview.youControl')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">{t('privacy.overview.transparent')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1. Information We Collect */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.collection.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  {t('privacy.collection.account')}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• {t('privacy.collection.accountList1')}</li>
                  <li>• {t('privacy.collection.accountList2')}</li>
                  <li>• {t('privacy.collection.accountList3')}</li>
                  <li>• {t('privacy.collection.accountList4')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  {t('privacy.collection.vehicle')}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• {t('privacy.collection.vehicleList1')}</li>
                  <li>• {t('privacy.collection.vehicleList2')}</li>
                  <li>• {t('privacy.collection.vehicleList3')}</li>
                  <li>• {t('privacy.collection.vehicleList4')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t('privacy.collection.usage')}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• {t('privacy.collection.usageList1')}</li>
                  <li>• {t('privacy.collection.usageList2')}</li>
                  <li>• {t('privacy.collection.usageList3')}</li>
                  <li>• {t('privacy.collection.usageList4')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. How We Use Your Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.use.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('privacy.use.content')}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">{t('privacy.use.service')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('privacy.use.serviceList1')}</li>
                  <li>• {t('privacy.use.serviceList2')}</li>
                  <li>• {t('privacy.use.serviceList3')}</li>
                  <li>• {t('privacy.use.serviceList4')}</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">{t('privacy.use.safety')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('privacy.use.safetyList1')}</li>
                  <li>• {t('privacy.use.safetyList2')}</li>
                  <li>• {t('privacy.use.safetyList3')}</li>
                  <li>• {t('privacy.use.safetyList4')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Information Sharing */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.sharing.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">{t('privacy.sharing.notice')}</h4>
              <p className="text-sm text-green-700">
                {t('privacy.sharing.noticeContent')}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{t('privacy.sharing.users')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• {t('privacy.sharing.usersList1')}</li>
                  <li>• {t('privacy.sharing.usersList2')}</li>
                  <li>• {t('privacy.sharing.usersList3')}</li>
                  <li>• {t('privacy.sharing.usersList4')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">{t('privacy.sharing.legal')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('privacy.sharing.legalContent')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Data Security */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.security.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('privacy.security.content')}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">{t('privacy.security.technical')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('privacy.security.technicalList1')}</li>
                  <li>• {t('privacy.security.technicalList2')}</li>
                  <li>• {t('privacy.security.technicalList3')}</li>
                  <li>• {t('privacy.security.technicalList4')}</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">{t('privacy.security.operational')}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('privacy.security.operationalList1')}</li>
                  <li>• {t('privacy.security.operationalList2')}</li>
                  <li>• {t('privacy.security.operationalList3')}</li>
                  <li>• {t('privacy.security.operationalList4')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Your Privacy Rights */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.rights.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              {t('privacy.rights.content')}
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{t('privacy.rights.youCan')}:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('privacy.rights.youCanList1')}</li>
                  <li>• {t('privacy.rights.youCanList2')}</li>
                  <li>• {t('privacy.rights.youCanList3')}</li>
                  <li>• {t('privacy.rights.youCanList4')}</li>
                  <li>• {t('privacy.rights.youCanList5')}</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                {t('privacy.rights.note')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 6. Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.retention.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('privacy.retention.content')}
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">{t('privacy.retention.active')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('privacy.retention.activeContent')}
                </p>
              </div>
              <div>
                <h4 className="font-medium">{t('privacy.retention.deleted')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('privacy.retention.deletedContent')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Cookies and Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.cookies.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('privacy.cookies.content')}
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">{t('privacy.cookies.essential')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('privacy.cookies.essentialContent')}
                </p>
              </div>
              <div>
                <h4 className="font-medium">{t('privacy.cookies.analytics')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('privacy.cookies.analyticsContent')}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('privacy.cookies.note')}
            </p>
          </CardContent>
        </Card>

        {/* 8. Children's Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.children.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">{t('privacy.children.notice')}</h4>
              <p className="text-sm text-orange-700">
                {t('privacy.children.noticeContent')}
              </p>
            </div>
            <p className="text-muted-foreground">
              {t('privacy.children.content')}
            </p>
          </CardContent>
        </Card>

        {/* 9. Changes to Privacy Policy */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.changes.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('privacy.changes.content')}
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('privacy.contact.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t('privacy.contact.content')}
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>{t('privacy.contact.support')}</strong> support@gotogether.mk
              </p>
              <p>
                <strong>{t('privacy.contact.address')}</strong> {
                  // Display address based on language
                  i18n.language === 'en' ? 'Skopje, North Macedonia' :
                  i18n.language === 'mk' ? 'Скопје, Северна Македонија' :
                  'Shkup, Maqedonia e Veriut'
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild>
                <Link to="/contact">{t('privacy.contact.contactSupport')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/terms">{t('privacy.contact.terms')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}