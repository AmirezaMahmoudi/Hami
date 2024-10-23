import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "./Navbar";
import { useIsLogin } from "../../Hooks/useIsLogin";
import Loading from "../../Components/Loading";

const MainLayout = () => {

  const [loading, isLogin] = useIsLogin();

  if (loading) return <Loading/>;
  if (!isLogin) return <Navigate to={"/auth/login"} />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
       <Navbar /> 
      <main className=" grow flex-grow-1 d-flex flex-column gap-4 container mt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
