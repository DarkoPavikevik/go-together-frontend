"use client"

import { useState } from "react"
import { Input, Select } from "antd"
import { MessageSquare, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/Textarea"

const { Option } = Select

export default function ContactSupport() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">{t("contact.successTitle")}</h1>
              <p className="text-muted-foreground mb-6">
                {t("contact.successMessage")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsSubmitted(false)}>
                  {t("contact.anotherMessage")}
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/")}>
                  {t("contact.backHome")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{t("contact.title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("contact.description")}
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex-1">
                  {t("contact.getInTouch")}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex items-center justify-center h-5 w-5 text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("contact.email")}</p>
                  <p className="text-sm text-muted-foreground">support@gotogether.mk</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex items-center justify-center h-5 w-5 text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("contact.phone")}</p>
                  <p className="text-sm text-muted-foreground">+389 70 123 456</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex items-center justify-center h-5 w-5 text-primary shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("contact.supportHours")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("contact.supportHoursValue")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.quickHelp")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium">{t("contact.commonQuestions")}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t("contact.question1")}</li>
                  <li>• {t("contact.question2")}</li>
                  <li>• {t("contact.question3")}</li>
                  <li>• {t("contact.question4")}</li>
                  <li>• {t("contact.question5")}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.sendMessage")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.fullName")}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder={t("contact.fullName")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.emailAddress")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t("contact.category")}</Label>
                    <Select
                      id="category"
                      value={formData.category}
                      onChange={(value) => handleInputChange("category", value)}
                      placeholder={t("contact.category")}
                      className="w-full"
                      size="large"
                    >
                      <Option value="booking">{t("contact.categories.booking")}</Option>
                      <Option value="payment">{t("contact.categories.payment")}</Option>
                      <Option value="account">{t("contact.categories.account")}</Option>
                      <Option value="safety">{t("contact.categories.safety")}</Option>
                      <Option value="technical">{t("contact.categories.technical")}</Option>
                      <Option value="feedback">{t("contact.categories.feedback")}</Option>
                      <Option value="other">{t("contact.categories.other")}</Option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.subject")}</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder={t("contact.subject")}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.message")}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder={t("contact.message")}
                    rows={6}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("contact.sending")}
                      </>
                    ) : (
                      t("contact.sendButton")
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}