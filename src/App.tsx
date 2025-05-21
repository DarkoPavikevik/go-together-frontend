import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import "./utils/localization/i18n";

import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import MyRidesPage from "./components/pages/MyRidesPage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";
import ProfilePage from "./components/pages/ProfilePage";
import ChatPage from "./components/pages/ChatPage";
import RidesPage from "./components/pages/RidesPage";
import CreateRidesPage from "./components/pages/CreateRidesPage";
import RidesUserPage from "./components/pages/RidesUserPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./context/AuthContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="go-together-theme">
        <BrowserRouter>
          <SnackbarProvider
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <UserProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Navigate to={"/home"} replace />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/my-rides" element={<MyRidesPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/chat/:id" element={<ChatPage />} />
                  <Route path="/rides" element={<RidesPage />} />
                  <Route path="/rides/create" element={<CreateRidesPage />} />
                  <Route path="/rides/:id" element={<RidesUserPage />} />
                </Route>
                <Route path="sign-in" element={<SignInPage />} />
              </Routes>
            </UserProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
