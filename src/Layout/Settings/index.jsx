import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "./Sidebar";
import Loading from "../../Components/Loading";
import { useIsLogin } from "../../Hooks/useIsLogin";

const SettingsLayout = () => {

  const [loading, isLogin] = useIsLogin();

  if (loading) return <Loading/>;
  if (!isLogin) return <Navigate to={"/auth/login"} />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className=" grow flex-grow-1 flex gap-4 w-screen">
        <Sidebar/>

          <Outlet />


      </main>

      <Footer />
    </div>
  );
};

export default SettingsLayout;
