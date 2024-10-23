import { useForm } from "react-hook-form";
import { useState } from "react";
import { netTools } from "../Services/Settings/tools";
import PageTitle from "./PageTitle";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";
import { Alert } from "../utils/alerts";
import CircleLoading from "./CircleLoading";

const NetTools = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
    getValues,
  } = useForm();

  const {pathname} = useLocation()
  const switchTool = pathname.includes("/ping") ? "ping" : "trace"

  const [data, setData] = useState("");

  const submitForm = async ({ h }) => {
    try {
      const res = await netTools({
        h,
        s: switchTool,
      });
      setData(res.data);
    } catch (error) {
        Alert("Error", error?.response?.data.status);
    }
  };
console.log(isSubmitting );
  return (
    <div className="my-10 mx-8 ">
      <PageTitle title={switchTool === "ping" ? "Ping" : "Traceroute"} />

      <form
        className="flex flex-col gap-4 mt-16"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="flex gap-4 items-start">
          <label className="w-[150px] shrink-0" htmlFor="">
            Host
          </label>

          <div className="flex flex-col">
            <input
            disabled={isSubmitting}
              type={"text"}
              className={` text-slate-900 !border-2 border-transparent opacity-100 w-[450px] h-[32px] ${
                errors.h?.message ? "!border-red-700" : ""
              }`}
              {...register("h", {
                required: "Required this field",
                pattern: {
                  value:
                    /^(22[0-3]|2[0-2][0-3]|[01]?[1-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[1-9][0-9]?)$/,
                  message: "Enter the correct IP",
                },
              })}
            />

            {errors.h?.message ? (
              <span className="text-red-600 text-sm mt-2">
                {errors.h?.message}
              </span>
            ) : null}
          </div>

          <button disabled={isSubmitting} className=" mt-0 w-[110px] !h-[32px] bg-[#167DE5] rounded-md ">
            {isSubmitting ? (
              <CircleLoading/>
            ) : switchTool === "ping" ? "Ping" : "Traceroute"}
          </button>
        </div>
      </form>

      <div className="flex gap-4 mt-4 ">
        <label className="w-[150px] shrink-0 text-">
          Response
        </label>

        <pre className="bg-white  text-slate-900 p-4 
        rounded-md max-h-[400px] min-h-[150px] overflow-auto max-w-[590px] w-full whitespace-pre-line">
          {data}
        </pre>

      </div>
    </div>
  );
};

export default NetTools;
