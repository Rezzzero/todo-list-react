import { Outlet } from "react-router-dom";
import { Navbar } from "../widgets/Navigation/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
