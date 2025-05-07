"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Menu, Moon, Sun, User, LogOut } from "lucide-react";
import { useTheme } from "../ui/themeprovider";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import ReactFlagsSelect from "react-flags-select";
const countryLangMap: Record<string, string> = {
  GB: "en", // English
  AL: "sq", // Albanian
  MK: "mk", // Macedonian
};
export default function Header() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("EN");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth context

  const changeLanguageHandler = (countryCode: string) => {
    const langCode = countryLangMap[countryCode];
    if (langCode) {
      i18n.changeLanguage(langCode);
    }
  };
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    console.log(nextTheme);
    setTheme(nextTheme);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around px-4 py-2">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Car className="h-5 w-5" />
                  <span>GoTogether</span>
                </Link>
                <Link to="/" className="hover:text-foreground/80">
                  {t("nav.home")}
                </Link>
                <Link to="/rides" className="hover:text-foreground/80">
                  {t("nav.rides")}
                </Link>
                {isLoggedIn && (
                  <>
                    <Link to="/my-rides" className="hover:text-foreground/80">
                      {t("nav.myRides")}
                    </Link>
                    <Link to="/profile" className="hover:text-foreground/80">
                      {t("nav.profile")}
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Car className="h-5 w-5" />
            <span className="hidden md:inline">GoTogether</span>
          </Link>

          <nav className="hidden lg:flex lg:gap-6 lg:text-sm lg:font-medium">
            <Link to="/" className="hover:text-foreground/80">
              {t("nav.home")}
            </Link>
            <Link to="/rides" className="hover:text-foreground/80">
              {t("nav.rides")}
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/my-rides" className="hover:text-foreground/80">
                  {t("nav.myRides")}
                </Link>
                <Link to="/profile" className="hover:text-foreground/80">
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
            className="!rounded-lg !w-14 !p-0 !shadow-none !bg-white"
            selectButtonClassName="!pr-0 after:hidden"
          />
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-black" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("nav.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {t("nav.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/auth/signin">{t("nav.signIn")}</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/signup">{t("nav.signUp")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
