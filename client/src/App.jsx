import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import SpinnerFullPage from "./components/SpinnerFullPage";

const Home = lazy(() => import("./pages/Home"));
const Dictionary = lazy(() => import("./pages/Dictionary"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}
