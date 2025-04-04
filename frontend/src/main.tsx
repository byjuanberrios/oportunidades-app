import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/store";

import "@/styles/app.css";

// Layout
import Main from "./layouts/Main.tsx";

// Pages
import Index from "./pages/Index.tsx";
import Following from "./pages/Following.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Main />}>
            <Route index element={<Index />} />
            <Route path="/following" element={<Following />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
