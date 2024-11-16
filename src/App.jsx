import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <h1>header</h1>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
