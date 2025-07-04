import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import "./utils/localization/i18n";

import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import MyRidesPage from "./components/pages/MyRidesPage";
import SignInPage from "./components/pages/SignInPage";
import ProfilePage from "./components/pages/ProfilePage";
import ChatPage from "./components/pages/ChatPage";
import RidesPage from "./components/pages/RidesPage";
import CreateRidesPage from "./components/pages/CreateRidesPage";
import RidesUserPage from "./components/pages/RidesUserPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./context/AuthContext";
import EditVehicle from "./components/pages/EditVehiclePage";
import AboutUs from "./components/pages/AboutUsPage";
import ContactSupport from "./components/pages/ContactSupportPage";
import TermsOfService from "./components/pages/TermsPage";
import PrivacyPolicy from "./components/pages/PrivacyPage";
import { SearchProvider } from "./context/SearchContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="go-together-theme">
        <BrowserRouter>
          <SnackbarProvider
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <UserProvider>
              <SearchProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route
                      path="/"
                      element={<Navigate to={"/home"} replace />}
                    />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/my-rides" element={<MyRidesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/chat/:id" element={<ChatPage />} />
                    <Route path="/rides" element={<RidesPage />} />
                    <Route path="/rides/create" element={<CreateRidesPage />} />
                    <Route path="/rides/:id" element={<RidesUserPage />} />
                    <Route path="/vehicle/:id" element={<EditVehicle />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactSupport />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                  </Route>
                  <Route path="sign-in" element={<SignInPage />} />
                  <Route
                    path="sign-up"
                    element={<SignInPage initialMode="signup" />}
                  />
                </Routes>
              </SearchProvider>
            </UserProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
