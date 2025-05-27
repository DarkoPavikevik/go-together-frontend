"use client";
import {
  Car,
  Facebook,
  Github,
  Home,
  Instagram,
  Linkedin,
  LogOut,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Drawer } from "antd";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUser } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import Image from "../ui/Image";
import { useTheme } from "../ui/ThemeProvider";

const countryLangMap: Record<string, string> = {
  GB: "en", // English
  AL: "sq", // Albanian
  MK: "mk", // Macedonian
};
export default function Header() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logout, me } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const changeLanguageHandler = (countryCode: string) => {
    const langCode = countryLangMap[countryCode];
    if (langCode) {
      i18n.changeLanguage(langCode);
    }
  };
  // const toggleTheme = () => {
  //   const nextTheme = theme === "dark" ? "light" : "dark";
  //   console.log(nextTheme);
  //   setTheme(nextTheme);
  // };
  console.log(me);
  return (
    <header className="sticky top-0 z-50 w-full shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around px-4 py-2">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setDrawerOpen(true)}
            variant="ghost"
            className={`lg:hidden relative overflow-hidden transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-900 to-indigo-900 text-white hover:from-purple-800 hover:to-indigo-800"
                : "bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 hover:from-blue-200 hover:to-indigo-200"
            } rounded-full p-2 h-10 w-10`}
            aria-label="Toggle menu"
          >
            <GiHamburgerMenu className="h-5 w-5 absolute transform transition-transform duration-500 rotate-0" />
          </Button>

          <Drawer
            title={
              <div className="flex items-center gap-3 text-[#646cff]">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image
                    alt={"GoTogether"}
                    src="/GoTogetherLogo2.png"
                    className="h-15 w-15"
                  />
                </Link>
                <span className="font-bold text-3xl">GoTogether</span>
              </div>
            }
            placement="left"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            bodyStyle={{
              padding: "16px",
              backgroundColor: theme === "dark" ? "#1e1e2f" : "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // 👈 pushes bottom section down
              height: "100%", // 👈 ensures the drawer uses full height
            }}
            headerStyle={{
              backgroundColor: theme === "dark" ? "#1e1e2f" : "#fff",
              color: theme === "dark" ? "#fff" : "#000",
              borderBottom:
                theme === "dark" ? "1px solid #363654" : "1px solid #f0f0f0",
            }}
            className={theme === "dark" ? "dark-mode-drawer" : ""}
            closeIcon={
              <div
                className={`p-1 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <X
                  className={`h-5 w-5 ${
                    theme === "dark" ? "text-gray-300" : "text-[#646cff]"
                  }`}
                />
              </div>
            }
          >
            <div className="flex flex-col justify-between h-full">
              {/* Navigation links section */}
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/"
                  className="hover:text-[#646cff] flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 drawer-nav-item"
                  onClick={() => setDrawerOpen(false)}
                  style={{ animationDelay: "0.1s" }}
                >
                  <Home className="h-5 w-5 text-[#646cff]" />
                  {t("nav.home")}
                </Link>
                <Link
                  to="/rides"
                  className="hover:text-[#646cff] flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 drawer-nav-item"
                  onClick={() => setDrawerOpen(false)}
                  style={{ animationDelay: "0.2s" }}
                >
                  <Car className="h-5 w-5 text-[#646cff]" />
                  {t("nav.rides")}
                </Link>
                {isAuthenticated && (
                  <>
                    <Link
                      to="/my-rides"
                      className="hover:text-[#646cff] flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 drawer-nav-item"
                      onClick={() => setDrawerOpen(false)}
                      style={{ animationDelay: "0.3s" }}
                    >
                      <Car className="h-5 w-5 text-[#646cff]" />
                      {t("nav.myRides")}
                    </Link>
                    <Link
                      to="/profile"
                      className="hover:text-[#646cff] flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 drawer-nav-item"
                      onClick={() => setDrawerOpen(false)}
                      style={{ animationDelay: "0.4s" }}
                    >
                      <User className="h-5 w-5 text-[#646cff]" />
                      {t("nav.profile")}
                    </Link>
                  </>
                )}
              </nav>

              {/* Social media icons at bottom */}
              <div className="flex flex-col items-center mt-8">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className={`footer-social-icon ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                        : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                    }`}
                    aria-label="Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className={`footer-social-icon ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                        : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                    }`}
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className={`footer-social-icon ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                        : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                    }`}
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className={`footer-social-icon ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                        : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                    }`}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </Drawer>

          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Image
              alt={"GoTogether"}
              src="/GoTogetherLogo2.png"
              className="h-20 w-20"
            />
          </Link>

          <nav className="hidden lg:flex lg:gap-6 lg:text-sm lg:font-medium">
            <Link
              to="/"
              className={`hover:text-foreground/80 py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary/70 ${
                location.pathname === "/"
                  ? "after:scale-x-100 text-primary"
                  : ""
              }`}
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/rides"
              className={`hover:text-foreground/80 py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary/70 ${
                location.pathname === "/rides"
                  ? "after:scale-x-100 text-primary"
                  : ""
              }`}
            >
              {t("nav.rides")}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/my-rides"
                  className={`hover:text-foreground/80 py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary/70 ${
                    location.pathname === "/my-rides"
                      ? "after:scale-x-100 text-primary"
                      : ""
                  }`}
                >
                  {t("nav.myRides")}
                </Link>
                <Link
                  to="/profile"
                  className={`hover:text-foreground/80 py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary/70 ${
                    location.pathname === "/profile"
                      ? "after:scale-x-100 text-primary"
                      : ""
                  }`}
                >
                  {t("nav.profile")}
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
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
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
            className={`relative overflow-hidden transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-900 to-indigo-900 text-white hover:from-purple-800 hover:to-indigo-800"
                : "bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 hover:from-blue-200 hover:to-indigo-200"
            } rounded-full p-2 h-10 w-10`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 absolute transform transition-transform duration-500 rotate-0" />
            ) : (
              <Moon className="h-5 w-5 absolute transform transition-transform duration-500 rotate-0" />
            )}
          </Button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  style={{
                    backgroundColor: "lightgray",
                    verticalAlign: "middle",
                    cursor: "pointer",
                    marginLeft: 15,
                  }}
                  size="large"
                  icon={<UserOutlined />}
                  src={me?.profilePicture}
                ></Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`${
                  theme === "dark"
                    ? "bg-[#1e1e2f] border-[#363654]"
                    : "bg-gray-100 border-gray-200"
                }`}
              >
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("nav.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    if (location.pathname !== "/home") {
                      navigate("/home");
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <Link to="/home" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    {t("nav.signOut")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                asChild
                className={`${
                  theme === "dark"
                    ? "text-white hover:bg-purple-900/20"
                    : "text-white"
                }`}
              >
                <Link to="/sign-in">{t("nav.signIn")}</Link>
              </Button>
              <Button
                className={`${
                  theme === "dark"
                    ? "text-white hover:bg-purple-900/20"
                    : "text-white"
                }`}
                asChild
              >
                <Link to="/sign-up">{t("nav.signUp")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
