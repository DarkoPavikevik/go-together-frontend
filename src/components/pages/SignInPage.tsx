"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import type { FieldType } from "../../utils/types/FieldTypes";
import Image from "../ui/Image";
import AnimatedBackground from "../ui/animated-backgroud";
import { enqueueSnackbar } from "notistack";
import { useUser } from "../../context/AuthContext";
import axios from "axios";

export default function SignIn() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useUser();
  const handleSubmit = async (data: FieldType) => {
    console.log("data", data);
    setIsLoading(true);
    axios({
      method: "post",
      url: "http://localhost:8080/api/auth/login",
      data: {
        username: data.username,
        password: data.password,
      },
    })
      .then((response) => {
        login(response.data.accessToken);
        setIsLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(t("signin.invalid_login"), {
          variant: "error",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side with animation */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center p-6 relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-md w-full z-10">
          <div className="rounded-lg w-full flex items-center justify-center mb-6">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-white text-3xl font-bold mt-6 text-center">
            Welcome Back!
          </h2>
          <p className="text-indigo-100 mt-2 text-center text-lg">
            Sign in to continue your journey with us.
          </p>
        </div>
      </div>

      {/* Right side with sign-in form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-gray-200">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/GoTogetherLogo2.png"
                alt="Logo"
                className="w-50 sm:w-10 md:w-100"
              />
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
                <Label htmlFor="username">{t("auth.name")}</Label>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
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
    </div>
  );
}
