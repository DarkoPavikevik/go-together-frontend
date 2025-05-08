import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Go Together
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              © 2025 GoTogether.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t("footer.links.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {t("footer.links.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {t("footer.links.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {t("footer.links.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t("footer.legal.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {t("footer.legal.terms")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {t("footer.legal.privacy")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t("footer.social.title")}
            </h3>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-300">
          <p>{/* © {currentYear} Go Together. {t("footer.rights")} */}</p>
        </div>
      </div>
    </footer>
  );
}
