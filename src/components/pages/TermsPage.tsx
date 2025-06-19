"use client"


import { ScrollText, Shield, AlertTriangle, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"

export default function TermsOfService() {
  const { t } = useTranslation()

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please read these terms carefully before using GoTogether services.
        </p>
        <p className="text-sm text-muted-foreground mt-2">Last updated: December 18, 2024</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Quick Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Quick Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              By using GoTogether, you agree to these terms. We provide a platform for ride-sharing in North Macedonia.
              You're responsible for your safety and following local laws.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Community Platform</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Safety First</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">Your Responsibility</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1. Acceptance of Terms */}
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              By accessing and using GoTogether ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-muted-foreground">
              These terms apply to all users of the service, including without limitation users who are browsers,
              drivers, passengers, and contributors of content.
            </p>
          </CardContent>
        </Card>

        {/* 2. Description of Service */}
        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              GoTogether is a ride-sharing platform that connects drivers and passengers traveling similar routes within
              North Macedonia. We provide the technology platform but do not provide transportation services.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Our Service Includes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Connecting drivers and passengers</li>
                <li>• Messaging system for communication</li>
                <li>• User profiles and rating system</li>
                <li>• Ride booking and management tools</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3. User Responsibilities */}
        <Card>
          <CardHeader>
            <CardTitle>3. User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">All Users Must:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Be at least 18 years old</li>
                  <li>• Provide accurate and truthful information</li>
                  <li>• Maintain the confidentiality of account credentials</li>
                  <li>• Comply with all applicable laws and regulations</li>
                  <li>• Treat other users with respect and courtesy</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Drivers Must Additionally:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Hold a valid driver's license</li>
                  <li>• Have valid vehicle registration and insurance</li>
                  <li>• Ensure vehicle is roadworthy and safe</li>
                  <li>• Follow traffic laws and drive safely</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Safety and Liability */}
        <Card>
          <CardHeader>
            <CardTitle>4. Safety and Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">Important Safety Notice:</h4>
              <p className="text-sm text-red-700">
                GoTogether is not responsible for the actions of users. You participate in ride-sharing at your own
                risk. Always verify driver and passenger identity before traveling.
              </p>
            </div>
            <p className="text-muted-foreground">
              Users acknowledge that ride-sharing involves inherent risks. GoTogether does not guarantee the safety,
              reliability, or legality of users or their vehicles. We strongly recommend meeting in public places and
              sharing trip details with trusted contacts.
            </p>
          </CardContent>
        </Card>

        {/* 5. Payment Terms */}
        <Card>
          <CardHeader>
            <CardTitle>5. Payment Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Payment arrangements are made directly between drivers and passengers. GoTogether does not process
              payments or guarantee payment completion.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Payment Guidelines:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Agree on payment method before the trip</li>
                <li>• Payments should cover fuel and vehicle costs only</li>
                <li>• Commercial transportation is prohibited</li>
                <li>• Keep receipts for your records</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 6. Prohibited Uses */}
        <Card>
          <CardHeader>
            <CardTitle>6. Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              The following activities are strictly prohibited on our platform:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Content Violations:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Posting false or misleading information</li>
                  <li>• Harassment or inappropriate behavior</li>
                  <li>• Spam or commercial advertising</li>
                  <li>• Sharing personal contact information publicly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Service Misuse:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Operating as a commercial taxi service</li>
                  <li>• Creating multiple fake accounts</li>
                  <li>• Attempting to hack or disrupt the service</li>
                  <li>• Violating local transportation laws</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Account Termination */}
        <Card>
          <CardHeader>
            <CardTitle>7. Account Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend accounts that violate these terms, engage in unsafe behavior,
              or receive consistently poor ratings from other users.
            </p>
            <p className="text-muted-foreground">
              Users may delete their accounts at any time through the profile settings. Upon termination, access to the
              service will be immediately revoked.
            </p>
          </CardContent>
        </Card>

        {/* 8. Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle>8. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              GoTogether reserves the right to modify these terms at any time. Users will be notified of significant
              changes via email or platform notifications. Continued use of the service constitutes acceptance of
              modified terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> support@gotogether.mk
              </p>
              <p>
                <strong>Address:</strong> Skopje, North Macedonia
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
