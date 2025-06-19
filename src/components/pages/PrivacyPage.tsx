import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
        <p className="text-sm text-muted-foreground mt-2">Last updated: December 18, 2024</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Privacy Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We collect only the information necessary to provide our ride-sharing service safely and effectively. Your
              data is never sold to third parties, and you control your privacy settings.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Data Protected</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">You Control</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Transparent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1. Information We Collect */}
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Account Information
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Full name and profile photo</li>
                  <li>• Email address and phone number</li>
                  <li>• Date of birth (for age verification)</li>
                  <li>• Profile description and preferences</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Vehicle Information (Drivers)
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Vehicle make, model, year, and color</li>
                  <li>• License plate number</li>
                  <li>• Vehicle photos and features</li>
                  <li>• Insurance and registration details</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Usage Information
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Ride history and preferences</li>
                  <li>• Messages and communications</li>
                  <li>• Ratings and reviews</li>
                  <li>• App usage and interaction data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. How We Use Your Information */}
        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We use your information solely to provide and improve our ride-sharing service:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">Service Provision:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Connecting drivers and passengers</li>
                  <li>• Facilitating communication</li>
                  <li>• Processing ride bookings</li>
                  <li>• Providing customer support</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Safety & Security:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Verifying user identity</li>
                  <li>• Monitoring for suspicious activity</li>
                  <li>• Maintaining rating system</li>
                  <li>• Investigating safety reports</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Information Sharing */}
        <Card>
          <CardHeader>
            <CardTitle>3. Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">We Never Sell Your Data</h4>
              <p className="text-sm text-green-700">
                Your personal information is never sold to advertisers or third parties for marketing purposes.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Information Shared with Other Users:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Profile name and photo</li>
                  <li>• Vehicle information (for drivers)</li>
                  <li>• Ratings and reviews</li>
                  <li>• Trip-related communications</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Legal Requirements:</h4>
                <p className="text-sm text-muted-foreground">
                  We may disclose information when required by law, to protect our rights, or to ensure user safety in
                  emergency situations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Data Security */}
        <Card>
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">Technical Safeguards:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Encrypted data transmission (SSL/TLS)</li>
                  <li>• Secure data storage</li>
                  <li>• Regular security audits</li>
                  <li>• Access controls and monitoring</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Operational Security:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Limited employee access</li>
                  <li>• Background checks for staff</li>
                  <li>• Incident response procedures</li>
                  <li>• Regular security training</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Your Privacy Rights */}
        <Card>
          <CardHeader>
            <CardTitle>5. Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground mb-4">
              You have control over your personal information and privacy settings:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">You Can:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Access and update your profile information</li>
                  <li>• Control what information is visible to other users</li>
                  <li>• Delete your account and associated data</li>
                  <li>• Request a copy of your personal data</li>
                  <li>• Opt out of non-essential communications</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                To exercise these rights, visit your account settings or contact our support team.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 6. Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle>6. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We retain your information only as long as necessary to provide our services and comply with legal
              obligations:
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Active Accounts:</h4>
                <p className="text-sm text-muted-foreground">
                  Information is retained while your account is active and for a reasonable period afterward to
                  facilitate reactivation.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Deleted Accounts:</h4>
                <p className="text-sm text-muted-foreground">
                  Most personal information is deleted within 30 days of account deletion. Some data may be retained
                  longer for legal compliance or safety purposes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Cookies and Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>7. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We use cookies and similar technologies to improve your experience and analyze service usage:
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Essential Cookies:</h4>
                <p className="text-sm text-muted-foreground">
                  Required for basic functionality like login sessions and security features.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Analytics Cookies:</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand how users interact with our service to make improvements.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You can control cookie preferences through your browser settings.
            </p>
          </CardContent>
        </Card>

        {/* 8. Children's Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>8. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">Age Restriction</h4>
              <p className="text-sm text-orange-700">
                GoTogether is not intended for users under 18 years of age. We do not knowingly collect personal
                information from children.
              </p>
            </div>
            <p className="text-muted-foreground">
              If we become aware that we have collected personal information from a child under 18, we will take steps
              to delete such information promptly.
            </p>
          </CardContent>
        </Card>

        {/* 9. Changes to Privacy Policy */}
        <Card>
          <CardHeader>
            <CardTitle>9. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by email
              or through the service. Your continued use of GoTogether after such modifications constitutes acceptance
              of the updated Privacy Policy.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us About Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or how we handle your personal information:
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Privacy Officer:</strong> privacy@gotogether.mk
              </p>
              <p>
                <strong>General Support:</strong> support@gotogether.mk
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
                <Link to="/terms">Terms of Service</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
