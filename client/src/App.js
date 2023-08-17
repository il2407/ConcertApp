import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppAppBar from "./views/AppAppBar";
import ParticlesBackground from "./components/ParticlesBackground";
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppAppBar />
        <ParticlesBackground />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>{" "}
      </Provider>
      ,
    </>
  );
}
