import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../ui/ThemeProvider";
import { Twitter, Facebook, Instagram, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full border-t ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#1e1e2f] to-[#16133a] border-[#363654] text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Go Together
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              © {currentYear} GoTogether.
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              All rights reserved.
            </p>
          </div>
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.links.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 hover:text-purple-300 transition-colors duration-200"
                      : "text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  }`}
                >
                  {t("footer.links.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 hover:text-purple-300 transition-colors duration-200"
                      : "text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  }`}
                >
                  {t("footer.links.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 hover:text-purple-300 transition-colors duration-200"
                      : "text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  }`}
                >
                  {t("footer.links.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.legal.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 hover:text-purple-300 transition-colors duration-200"
                      : "text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  }`}
                >
                  {t("footer.legal.terms")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 hover:text-purple-300 transition-colors duration-200"
                      : "text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  }`}
                >
                  {t("footer.legal.privacy")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {t("footer.social.title")}
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://x.com/darkopavikevik"
                className={`footer-social-icon ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                    : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                }`}
                aria-label="Twitter"
              >
                <Twitter
                  className={`h-6 w-6 ${
                    theme === "dark" ? "hover:stroke-purple-300" : ""
                  }`}
                />
              </a>
              <a
                href="https://www.facebook.com/darko.pavikevik.3/"
                className={`footer-social-icon ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                    : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                }`}
                aria-label="Facebook"
              >
                <Facebook
                  className={`h-6 w-6 ${
                    theme === "dark" ? "hover:stroke-purple-300" : ""
                  }`}
                />
              </a>
              <a
                href="https://www.instagram.com/darkopavikevik/?next=%2F"
                className={`footer-social-icon ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                    : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                }`}
                aria-label="Instagram"
              >
                <Instagram
                  className={`h-6 w-6 ${
                    theme === "dark" ? "hover:stroke-purple-300" : ""
                  }`}
                />
              </a>
              <a
                href="https://github.com/DarkoPavikevik"
                className={`footer-social-icon ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                    : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                }`}
                aria-label="GitHub"
              >
                <Github
                  className={`h-6 w-6 ${
                    theme === "dark" ? "hover:stroke-purple-300" : ""
                  }`}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/darko-pavikevik-0b297a1a2/"
                className={`footer-social-icon ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-purple-300 transition-all duration-200 transform hover:scale-110"
                    : "text-gray-600 hover:text-gray-900 transition-all duration-200 transform hover:scale-110"
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin
                  className={`h-6 w-6 ${
                    theme === "dark" ? "hover:stroke-purple-300" : ""
                  }`}
                />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`mt-8 pt-8 border-t text-center ${
            theme === "dark"
              ? "border-[#363654] text-gray-300"
              : "border-gray-200 text-gray-600"
          }`}
        >
          <p>© {currentYear} Go Together. All rights reserved.</p>
        </div>
      </div>
      {theme === "dark" && (
        <div className="h-1 w-full bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 animate-gradient-x"></div>
      )}
    </footer>
  );
}
