import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RootLayout from "@components/RootLayout";

const App = () => {
  return (
    <>
      <RootLayout>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </RootLayout>
    </>
  );
};

export default App;
