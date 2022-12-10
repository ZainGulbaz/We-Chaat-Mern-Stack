import { Route, Routes } from "react-router-dom";
import { HOME } from "./routes";
import Home from "./Views/Home/Home";
import "./App.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path={HOME} element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
