import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RootLayout from "@components/RootLayout";
import { AuthProvider } from "./context/AuthContext";

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
    </AuthProvider>
  );
};

export default App;
