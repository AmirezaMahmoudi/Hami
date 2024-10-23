import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminRouter from "./Router/AdminRouter";
import AuthRouter from "./Router/AuthRouter";
import { useLocation } from "react-router-dom";
import SettingsRouter from "./Router/SettingsRouter";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname.includes("/auth") ? (
        <AuthRouter />
      ) : pathname.includes("/settings") ? (
        <SettingsRouter />
      ) : (
        <AdminRouter />
      )}
    </>
  );
}

export default App;
