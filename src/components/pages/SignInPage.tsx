"use client";
import { useMutation } from "@tanstack/react-query";
import { Input as AntInput, Button, Form } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import useAuthController from "../../services/auth/useAuthController";
import type { IRegisterType } from "../../utils/types/RegisterType";
import Image from "../ui/Image";
import { Label } from "../ui/Label";
import { useTheme } from "../ui/ThemeProvider";
import AnimatedBackground from "../ui/animated-backgroud";

interface SignInProps {
  initialMode?: "signin" | "signup";
}
const countryLangMap: Record<string, string> = {
  GB: "en", // English
  AL: "sq", // Albanian
  MK: "mk", // Macedonian
};
export default function SignIn({ initialMode = "signin" }: SignInProps) {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");
  const navigate = useNavigate();
  const { login } = useUser();
  const { theme, setTheme } = useTheme();
  const { register } = useAuthController();
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  useEffect(() => {
    setIsSignUp(initialMode === "signup");
  }, [initialMode]);

  const toggleFormMode = () => {
    form.resetFields();
    setIsSignUp(!isSignUp);
  };

  const { mutate: registerMutation } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IRegisterType) => register(data),
    onSuccess: () => {
      enqueueSnackbar(t("auth.registerSuccess"), { variant: "success" });
      setIsSignUp(false);
    },
    onError: () => {
      enqueueSnackbar(t("auth.registerError"), { variant: "error" });
    },
  });

  const handleSignIn = async (data: any) => {
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

  const handleSignUp = async (data: IRegisterType) => {
    setIsLoading(true);
    await registerMutation(data);
    setIsLoading(false);
  };
  const changeLanguageHandler = (countryCode: string) => {
    const langCode = countryLangMap[countryCode];
    if (langCode) {
      i18n.changeLanguage(langCode);
    }
  };
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#37215c] to-[#2a1a47]">
      {/* Left side with animation - with rounded edges */}
      <div className="hidden md:block md:w-1/2 p-6 relative">
        <div className="absolute inset-0 rounded-r-3xl overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-[#37215c] to-[#4f2c8d] flex items-center justify-center">
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
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-white text-3xl font-bold mt-6 text-center">
                {isSignUp ? "Join Our Community!" : "Welcome Back!"}
              </h2>
              <p className="text-indigo-100 mt-2 text-center text-lg">
                {isSignUp
                  ? "Create an account to start sharing rides."
                  : "Sign in to continue your journey with us."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with unified sign-in/sign-up form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-4">
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 right-20 pink__gradient" />
        <div style={{ position: "absolute", top: 20, right: 20 }}>
          <div className="flex flex-row gap-3">
            <ReactFlagsSelect
              selected={
                Object.keys(countryLangMap).find(
                  (key) => countryLangMap[key] === i18n.language
                ) || "GB"
              }
              onSelect={(code) => changeLanguageHandler(code)}
              countries={["GB", "MK", "AL"]}
              showSelectedLabel={false}
              showSecondarySelectedLabel={false}
              showOptionLabel={false}
              className="!w-14 !p-0 hover:border-1 border-[#646cff] rounded-lg"
              selectButtonClassName="!pr-0 after:hidden !border-none"
            />
            <Button
              size="large"
              variant="text"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`relative overflow-hidden transition-all duration-300 rounded-full p-2 h-10 w-10 !bg-transparent !border-none !text-white`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 absolute transform transition-transform duration-500 rotate-0 " />
              ) : (
                <Moon className="h-5 w-5 absolute transform transition-transform duration-500 rotate-0" />
              )}
            </Button>
          </div>
        </div>
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{
              height: isSignUp ? "720px" : "550px",
              overflow: "hidden",
            }}
            animate={{
              height: isSignUp ? "85vh" : "60vh",
              opacity: 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`p-5 shadow-2xl rounded-xl w-full ${
              theme === "dark"
                ? "bg-[#37215c80] auth-page-form"
                : "bg-white border-gray-100"
            } border`}
          >
            <div className="flex justify-center">
              <Image
                src="/GoTogetherLogo2.png"
                alt="Logo"
                className="w-28 h-28"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center">
              {isSignUp ? t("auth.signUp") : t("auth.signIn")}
            </h2>

            <Form
              form={form}
              name={isSignUp ? "sign_up" : "login"}
              onFinish={isSignUp ? handleSignUp : handleSignIn}
              className="flex flex-col"
              layout="vertical"
              style={{
                transition: "height 0.5s ease-in-out",
                overflow: "hidden",
              }}
            >
              {isSignUp && (
                <motion.div
                  key="email-signup"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="space-y-0 text-left"
                >
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
                    <div className="relative">
                      <Mail className="h-5 w-5 absolute left-4 top-[50%] transform -translate-y-1/2 text-[#a8a8bf] z-10" />
                      <input
                        className={`pl-12 w-full ${
                          theme === "dark" ? "auth-input" : ""
                        }`}
                        style={{
                          height: "40px",
                          fontSize: "16px",
                          backgroundColor:
                            theme === "dark" ? "rgba(35, 23, 60, 0.6)" : "#fff",
                          borderColor:
                            theme === "dark"
                              ? "rgba(75, 61, 119, 0.3)"
                              : "#e2e8f0",
                          color: theme === "dark" ? "#fff" : "#000",
                        }}
                      />
                    </div>
                  </Form.Item>
                </motion.div>
              )}

              <motion.div
                key={isSignUp ? "username-signup" : "username-signin"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: isSignUp ? 0.2 : 0.1 }}
                className="space-y-2 text-left"
              >
                <Label htmlFor="username">{t("auth.name")}</Label>
                <Form.Item
                  name={"username"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your full name!",
                    },
                  ]}
                >
                  <div className="flex items-center gap-5">
                    <User className="h-5 w-5 absolute left-4 top-[50%] transform -translate-y-1/2 text-[#a8a8bf] z-10" />
                    <input
                      className={`pl-12 w-full ${
                        theme === "dark" ? "auth-input" : ""
                      }`}
                      style={{
                        height: "40px",
                        fontSize: "16px",
                        backgroundColor:
                          theme === "dark" ? "rgba(35, 23, 60, 0.6)" : "#fff",
                        borderColor:
                          theme === "dark"
                            ? "rgba(75, 61, 119, 0.3)"
                            : "#e2e8f0",
                        color: theme === "dark" ? "#fff" : "#000",
                      }}
                    />
                  </div>
                </Form.Item>
              </motion.div>

              {isSignUp && (
                <motion.div
                  key="phone-signup"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-2 text-left"
                >
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
                        backgroundColor:
                          theme === "dark" ? "rgba(35, 23, 60, 0.6)" : "white",
                        color: theme === "dark" ? "white" : "black",
                        border:
                          theme === "dark"
                            ? "1px solid rgba(75, 61, 119, 0.3)"
                            : "1px solid #e2e8f0",
                      }}
                      buttonStyle={{
                        border:
                          theme === "dark"
                            ? "1px solid rgba(75, 61, 119, 0.3)"
                            : "1px solid #e2e8f0",
                        borderRight: "none",
                        backgroundColor:
                          theme === "dark" ? "rgba(35, 23, 60, 0.6)" : "white",
                        height: "40px",
                      }}
                      dropdownStyle={{
                        backgroundColor:
                          theme === "dark" ? "rgba(35, 23, 60, 0.6)" : "white",
                        color: theme === "dark" ? "white" : "black",
                      }}
                    />
                  </Form.Item>
                </motion.div>
              )}

              <motion.div
                key={isSignUp ? "password-signup" : "password-signin"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: isSignUp ? 0.4 : 0.2 }}
                className="space-y-2 text-left"
              >
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
                  <div className="relative w-full">
                    <span className="pr-3 pl-1 flex items-center">
                      <Lock
                        size={18}
                        className={
                          theme === "dark" ? "text-[#cfcfe9]" : "text-[#a8a8bf]"
                        }
                        style={{ position: "absolute", top: 10, left: 17 }}
                      />
                    </span>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className={`pl-12 w-full ${
                        theme === "dark" ? "auth-input" : ""
                      }`}
                      style={{
                        height: "40px",
                        fontSize: "16px",
                        backgroundColor:
                          theme === "dark" ? "rgba(35, 23, 60, 0.6)" : "#fff",
                        borderColor:
                          theme === "dark"
                            ? "rgba(75, 61, 119, 0.3)"
                            : "#e2e8f0",
                        color: theme === "dark" ? "#fff" : "#000",
                      }}
                    />
                    <span
                      style={{
                        color: theme === "dark" ? "#cfcfe9" : "#666",
                      }}
                    >
                      <Button
                        onClick={() =>
                          setPasswordVisible((prevState) => !prevState)
                        }
                        className="!border-none !shadow-none hover:!border-none focus:!border-none focus:!outline-none active:!border-none p-1"
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 0,
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        {passwordVisible ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                      </Button>
                    </span>
                  </div>
                </Form.Item>
              </motion.div>

              {isSignUp && (
                <motion.div
                  key="confirm-password-signup"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="space-y-2 text-left"
                >
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Form.Item
                    name={"confirmPassword"}
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <div className="relative w-full">
                      <div className="relative w-full">
                        <span className="pr-3 pl-1 flex items-center">
                          <Lock
                            size={18}
                            className={
                              theme === "dark"
                                ? "text-[#cfcfe9]"
                                : "text-[#a8a8bf]"
                            }
                            style={{ position: "absolute", top: 10, left: 17 }}
                          />
                        </span>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className={`pl-12 w-full ${
                            theme === "dark" ? "auth-input" : ""
                          }`}
                          style={{
                            height: "40px",
                            fontSize: "16px",
                            backgroundColor:
                              theme === "dark"
                                ? "rgba(35, 23, 60, 0.6)"
                                : "#fff",
                            borderColor:
                              theme === "dark"
                                ? "rgba(75, 61, 119, 0.3)"
                                : "#e2e8f0",
                            color: theme === "dark" ? "#fff" : "#000",
                          }}
                        />
                        <span
                          style={{
                            color: theme === "dark" ? "#cfcfe9" : "#666",
                          }}
                        >
                          <Button
                            onClick={() =>
                              setPasswordVisible((prevState) => !prevState)
                            }
                            className="!border-none !shadow-none hover:!border-none focus:!border-none focus:!outline-none active:!border-none p-1"
                            style={{
                              position: "absolute",
                              top: 4,
                              right: 0,
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            {passwordVisible ? (
                              <Eye size={16} />
                            ) : (
                              <EyeOff size={16} />
                            )}
                          </Button>
                        </span>
                      </div>
                    </div>
                  </Form.Item>
                </motion.div>
              )}

              <motion.div
                key={isSignUp ? "submit-signup" : "submit-signin"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: isSignUp ? 0.6 : 0.3 }}
              >
                <Button
                  className={`w-full mt-6 ${
                    theme === "dark" ? "auth-button-primary" : ""
                  }`}
                  type="primary"
                  style={{
                    backgroundColor: "#646cff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  disabled={isLoading}
                  htmlType="submit"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSignUp ? t("auth.signUp") : t("auth.signIn")}
                </Button>
              </motion.div>
            </Form>

            <div className="flex items-center my-4">
              <hr
                className={`flex-grow ${
                  theme === "dark" ? "border-[#4f2c8d50]" : "border-gray-200"
                }`}
              />
              <span
                className={`px-6 text-base ${
                  theme === "dark" ? "text-[#a8a8bf]" : "text-gray-500"
                }`}
              >
                or
              </span>
              <hr
                className={`flex-grow ${
                  theme === "dark" ? "border-[#4f2c8d50]" : "border-gray-200"
                }`}
              />
            </div>

            <Button
              type="default"
              className={`w-full ${
                theme === "dark" ? "auth-button-secondary" : ""
              }`}
              style={{
                borderRadius: "8px",
                background:
                  theme === "dark"
                    ? "rgba(35, 23, 60, 0.6)"
                    : "rgba(100, 108, 255, 0.1)",
                color: "#646cff",
                border:
                  theme === "dark"
                    ? "1px solid rgba(100, 108, 255, 0.5)"
                    : "1px solid #646cff",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={toggleFormMode}
            >
              {isSignUp
                ? `${t("auth.haveAccount")} ${t("auth.signIn")}`
                : `${t("auth.noAccount")} ${t("auth.signUp")}`}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
