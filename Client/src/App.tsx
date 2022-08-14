import { Route, Routes } from "react-router-dom";
import { HOME } from "./routes";
import { useSelector } from "react-redux";
import Home from "./Views/Home/Home";
import "./App.css";
const App = () => {
  let homeProgress = useSelector(
    (store: { progressReducer: { home: boolean } }) =>
      store.progressReducer.home
  );
  return (
    <>
      <Routes>
        <Route path={HOME} element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
