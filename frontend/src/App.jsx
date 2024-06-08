import { Outlet } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

/**
 * Main App component that includes the header, footer,
 * and renders the current route's component via Outlet.
 *
 * @returns {JSX.Element} App component
 */
export const App = () => {
  return (
    <>
      {/* Header component displayed on every page */}
      <Header />
      {/* Outlet renders the matched child route's component */}
      <Outlet />
      {/* Footer component displayed on every page */}
      <Footer />
    </>
  );
};
