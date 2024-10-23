import { useForm } from "react-hook-form";
import PageTitle from "../../../../Components/PageTitle";
import { useEffect } from "react";
import { getInfo, getUpTime, setInfo } from "../../../../Services/Settings/system";
import { Alert } from "../../../../utils/alerts";

const General = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm();

  const submitForm = async ({ name }) => {
    try {
        const {data} = await setInfo({n : name})
        Alert("Successfull" , data.status , "success")
    } catch (error) {
        Alert("Error", error?.response?.data.status);

    }
  };

  const inputs = [
    {
      label: "Device name",
      name: "name",
      validate: {
        required: "Username is required",
      },
    },
    {
      label: "Model",
      name: "model",
      validate: {},
    },
    {
      label: "Hardware version",
      name: "hard_ver",
      validate: {},
    },
    {
      label: "Software version",
      name: "soft_ver",
      validate: {},
    },
    {
      label: "Output/ Outlet",
      name: "outlet",
      validate: {},
    },
    {
      label: "Serial",
      name: "mac",
      validate: {},
    },
    {
        label: "Uptime",
        name: "time",
        validate: {},
      },
  ];

  useEffect(() => {
    (async () => {
      const { data } = await getInfo();
      Object.entries(data[0]).forEach(([fieldName, fieldValue]) => {
        setValue(fieldName, fieldValue);
      });
    })();
  }, []);

  const handleGetUpTime = async () => {
    const { data : {day , huors , minute} } = await getUpTime();
    setValue("time" , `${day} Day(s) 6 ${huors}(s) ${minute} Minute(s) `)
  };

  useEffect(() => {
    handleGetUpTime()
    let interval = setInterval(() => {
        handleGetUpTime()
    }, 60000);
    return ()=> clearInterval(interval)
  }, []);

  return (
    <div className="my-10 mx-8">
      <PageTitle title={"System info"} />

      <form
        className="flex flex-col gap-4 mt-16"
        onSubmit={handleSubmit(submitForm)}
      >
        {inputs.map((i, id) => {
          return (
            <div key={Math.random() + id} className="flex gap-4 items-center">
              <label className="w-[200px] shrink-0" htmlFor="">
                {i?.label}
              </label>
              <div className="flex flex-col gap-2">
                <input
                  readOnly={(i.name !== "name") ?? false}
                  type={i?.type ?? "text"}
                  id=""
                  className={`h-9 w-[300px] text-slate-900 !border-2 border-transparent p-2 
                  
                   ${errors[i.name]?.message ? "!border-red-700" : ""}`}
                  {...register(i?.name, i?.validate)}
                />

                {errors[i?.name]?.message ? (
                  <span className="text-red-600 text-sm ">
                    {errors[i.name]?.message}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}

        <button className="inline-block w-24 ms-auto mt-0 h-9 bg-[#167DE5] rounded-md">Ok</button>
      </form>
    </div>
  );
};

export default General;
