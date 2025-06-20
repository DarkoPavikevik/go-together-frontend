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
      // Here you would connect to your Spring Boot backend
      // const response = await fetch('/api/support/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

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
              <h1 className="text-2xl font-bold mb-4">Message Sent Successfully!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for contacting us. We've received your message and will get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                <Button variant="outline" onClick={() => (window.location.href = "/")}>
                  Back to Home
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
        <h1 className="text-3xl font-bold mb-4">Contact Support</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Need help? Have a question? We're here to assist you. Send us a message and we'll get back to you soon.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      {/* <MessageSquare className="h-5 w-5" /> */}
      <div className="flex-1">
        Get in Touch
        </div>
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="flex gap-3">
      <div className="flex items-center justify-center h-5 w-5 text-primary shrink-0">
        <Mail className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Email</p>
        <p className="text-sm text-muted-foreground">support@gotogether.mk</p>
      </div>
    </div>

    <div className="flex gap-3">
      <div className="flex items-center justify-center h-5 w-5 text-primary shrink-0">
        <Phone className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Phone</p>
        <p className="text-sm text-muted-foreground">+389 70 123 456</p>
      </div>
    </div>

    <div className="flex gap-3">
      <div className="flex items-center justify-center h-5 w-5 text-primary shrink-0">
        <Clock className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Support Hours</p>
        <p className="text-sm text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM</p>
      </div>
    </div>
  </CardContent>
</Card>

          {/* FAQ Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium">Common Questions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• How do I book a ride?</li>
                  <li>• How do I cancel a booking?</li>
                  <li>• Payment and refund policy</li>
                  <li>• Safety guidelines</li>
                  <li>• Account verification</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
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
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      id="category"
                      value={formData.category}
                      onChange={(value) => handleInputChange("category", value)}
                      placeholder="Select a category"
                      className="w-full"
                      size="large"
                    >
                      <Option value="booking">Booking Issues</Option>
                      <Option value="payment">Payment & Billing</Option>
                      <Option value="account">Account Problems</Option>
                      <Option value="safety">Safety Concerns</Option>
                      <Option value="technical">Technical Issues</Option>
                      <Option value="feedback">Feedback & Suggestions</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please describe your issue or question in detail..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
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
