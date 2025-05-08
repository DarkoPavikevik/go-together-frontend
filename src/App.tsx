import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import "./utils/localization/i18n";

import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import MyRidesPage from "./components/pages/MyRidesPage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="go-together-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to={"/home"} replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/my-rides" element={<MyRidesPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
