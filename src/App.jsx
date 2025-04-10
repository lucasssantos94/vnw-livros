import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RootLayout from "@components/RootLayout";
import { AuthProvider } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <RootLayout>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </RootLayout>
      <ToastContainer
        toastStyle={{
          position: "fixed",
          top: "16%",
          right: "2rem",
          fontSize: "1.2rem",
        }}
      />
    </AuthProvider>
  );
};

export default App;
