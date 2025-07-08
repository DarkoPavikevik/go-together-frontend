import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

if (typeof window !== "undefined") {
  document.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
  });
}

const supabase = createClient(
  "https://qloapwicswrnfibjjqsp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsb2Fwd2ljc3dybmZpYmpqcXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTgxNDksImV4cCI6MjA2MzM5NDE0OX0.uXXRrU0XKduKYN1CUFRjhyoGULaIHsRPN_ilC4o69AU"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </StrictMode>
);
