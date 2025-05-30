import { useMutation } from "@tanstack/react-query";
import { Button, Form } from "antd";
import { Car, Loader2 } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthController from "../../services/auth/useAuthController";
import type { IRegisterType } from "../../utils/types/RegisterType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export default function SignUp() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuthController();
  const navigate = useNavigate();

  const { mutate: registerMutation } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IRegisterType) => register(data),
    onSuccess: () => {
      enqueueSnackbar("USpesno klaen", { variant: "success" });
      navigate("/sign-in");
    },
  });
  const handleSubmit = async (data: IRegisterType) => {
    await registerMutation(data);
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
              <Label htmlFor="username">{t("auth.name")}</Label>
              <Form.Item
                name="username"
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
              <Label htmlFor="phoneNumber">{t("auth.phone")}</Label>
              <Form.Item
                name={"phoneNumber"}
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
                  onClick={(e) => console.log(e)}
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
