import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes_menu } from "./routes/routes";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Sidebar />
          <div className="container-components">
            <Routes>
              <Route path="/" exact />
              {routes_menu.map((route) => (
                <Route
                  path={route.url}
                  element={route.component}
                  key={route.name}
                />
              ))}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
