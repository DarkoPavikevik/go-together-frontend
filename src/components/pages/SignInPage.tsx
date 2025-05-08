"use client";
import { useState } from "react";
import { Car, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";
import { Button, Form } from "antd";
import type { FieldType } from "../../utils/types/FieldTypes";

export default function SignIn() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FieldType) => {
    console.log("data", data);
    // e.preventDefault();
    // setIsLoading(true);
    // try {
    //   // Here you would connect to your Spring Boot backend
    //   // const response = await fetch('/api/auth/signin', {
    //   //   method: 'POST',
    //   //   headers: { 'Content-Type': 'application/json' },
    //   //   body: JSON.stringify({ email, password }),
    //   // })
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   // Redirect to home page after successful login
    //   window.location.href = "/";
    // } catch (error) {
    //   console.error("Login failed:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Car className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {t("auth.signIn")}
          </CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <Form onFinish={handleSubmit}>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full"
              variant="solid"
              color="primary"
              style={{ backgroundColor: "#646cff" }}
              disabled={isLoading}
              htmlType="submit"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("auth.signIn")}
            </Button>
            <div className="mt-4 text-center text-sm">
              {t("auth.noAccount")}{" "}
              <Link
                to="/sign-up"
                className="text-primary underline-offset-4 hover:underline"
              >
                {" " + t("auth.signUp")}
              </Link>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
