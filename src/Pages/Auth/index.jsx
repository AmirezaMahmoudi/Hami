import { useForm } from "react-hook-form";
import httpService from "../../Services/httpService";
import styles from "./style.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../utils/alerts";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../Redux/Admin/AdminSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitForm = async ({ u, p }) => {
    try {
      const { data } = await httpService(`/auth`, "POST" , {
        u,
        p
      });
      dispatch(setUserInfo(data));
      localStorage.setItem("loginToken" , JSON.stringify(data.Access_token))
      navigate("/")
    } catch (error) {
      Alert("Error", "The password or username is wrong.");
    }
  };

  return (
    <div class="login-page">
      <div class="min-h-screen grid !w-full !max-w-full p-0">
        <div class="content">
          <div class="hero-content">
            <h1>Hami N-PDU system</h1>
            <div class="login-text">
              <div class="head">
                <img src="/Assets/img/login.png" alt="Data center"/>
                <h2>Login</h2>
              </div>
              <p>
                To apply settings and configure the device, you will be
                authenticated by username and password.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="mt-16">
              <div class="form-box">
                <label for="username">Username</label>
                <input
                autocomplete="off"
                  type="text"
                  className={`!text-black !border-2  ${errors?.u?.message ? "border-red-700" : ""}`}
                  {...register("u", {
                    required: "نام کاربری اجباری است",
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "فقظ از حروف انگلیسی و اعداد و آندرلاین میتوان استفاده کرد",
                    },
                  })}
                />
              </div>

              <div class="form-box">
                <label for="password">Password</label>
                <input
                autocomplete="off"
                
                  type="password"
                  className={`!text-black !border-2  ${errors?.p?.message ? "border-red-700" : ""}`}
                  {...register("p", {
                    required: "رمز عبور اجباری است",
                    minLength: {
                      value: 4,
                      message: "رمزعبور حداقل 5 کاراکتر باشد",
                    },
                  })}
                />
              </div>

              <button className="bg-[#1469BF] flex rounded-md w-full mt-6 items-center justify-center text-xl h-[48px] gap-2 ">
                <img src="/Assets/img/gage.png"  className="translate-y-[4px]"/>
                <span> Login </span>
              </button>
            </form>
          </div>
          <p class="copy">Copyright © 2023 Abarpardazesh.</p>
        </div>
        <div class="img"></div>
      </div>
    </div>
  );
};

export default Login;
