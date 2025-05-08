import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Car, Loader2 } from "lucide-react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, Form } from "antd";
import { Link } from "react-router-dom";
import type { FieldType } from "../../utils/types/FieldTypes";

export default function SignUp() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FieldType) => {
    console.log("formData", data);
    // console.log(e);
    // setIsLoading(true);

    // try {
    //   // Here you would connect to your Spring Boot backend
    //   // const response = await fetch('/api/auth/signup', {
    //   //   method: 'POST',
    //   //   headers: { 'Content-Type': 'application/json' },
    //   //   body: JSON.stringify(formData),
    //   // })

    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   // Redirect to login page after successful registration
    //   window.location.href = "/sign-in";
    // } catch (error) {
    //   console.error("Registration failed:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Car className="h-10 w-110 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {t("auth.signUp")}
          </CardTitle>
          <CardDescription>
            Create an account to start sharing rides
          </CardDescription>
        </CardHeader>
        <Form onFinish={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="name">{t("auth.name")}</Label>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your fullname!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="phone">{t("auth.phone")}</Label>
              <Form.Item
                name={"phone"}
                rules={[
                  {
                    required: true,
                    message: "Please input your phone!",
                  },
                ]}
              >
                <PhoneInput
                  country={"mk"}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    border: "1px solid black",
                  }}
                  buttonStyle={{
                    border: "1px solid black",
                    borderRight: "none",
                    height: "40px",
                  }}
                />
              </Form.Item>
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Form.Item
                name={"confirmPassword"}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              htmlType="submit"
              className="w-full"
              variant="solid"
              disabled={isLoading}
              style={{ backgroundColor: "#646cff" }}
              color="primary"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("auth.signUp")}
            </Button>
            <div className="mt-4 text-center text-sm">
              {t("auth.haveAccount")}
              <Link
                to="/sign-in"
                className="text-primary underline-offset-4 hover:underline"
              >
                {" " + t("auth.signIn")}
              </Link>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
