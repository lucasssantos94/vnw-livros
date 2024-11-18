import { Outlet } from "react-router-dom";
import GridContainer from "@components/GridContainer";
import Header from "@components/Header";
import Footer from "@components/Footer";

const App = () => {
  return (
    <>
      <GridContainer>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </GridContainer>
    </>
  );
};

export default App;
