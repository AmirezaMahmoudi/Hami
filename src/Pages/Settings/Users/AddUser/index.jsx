import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../../Components/PageTitle";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "../../../../utils/alerts";
import {
  addUser,
  editUser,
  getUserInfo,
} from "../../../../Services/Settings/users";
import { useEffect } from "react";

const AddUser = () => {
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm();

  const inputs = [
    {
      label: "User",
      name: "user",
      validate: {
        required: "Username is required",
        pattern: {
          value: /^[a-zA-Z0-9_]+$/,
          message: "You can use English letters, numbers and underlines",
        },
      },
    },
    {
      label: "Password",
      type: "password",
      name: "pass",
      validate: {
        required: userId ? false : "Password is required",
        pattern: {
          message:
            "English letters, numbers, underlines and special characters can be used",
        },
      },
    },
    {
      label: "Confirm password",
      type: "password",
      name: "c",
      validate: {
        validate: (value) =>
          userId
            ? true
            : value === watch("pass") || "Password cannot be repeated",
      },
    },
    {
      label: "Firstname",
      name: "fname",
      validate: {
        required: "is required",
        pattern: {
          value: /^[a-zA-Z0-9آ-ی\s]+$/,
          message: "You can use English and Farsi letters, numbers and spaces",
        },
      },
    },
    {
      label: "Lastname",
      name: "lname",
      validate: {
        required: "is required",
        pattern: {
          value: /^[a-zA-Z0-9آ-ی\s]+$/,
          message: "You can use English and Farsi letters, numbers and spaces",
        },
      },
    },
  ];

  const navigate = useNavigate();

  const submitForm = async ({ user, pass, fname, lname, per }) => {
    if (!userId) {
      try {
        if (!per) {
          per = 2;
        }
        await addUser({
          user,
          pass,
          fname,
          lname,
          per,
        });
        navigate("/settings/users/list");
      } catch (error) {
        console.log(error);
        Alert("Error", error?.response?.data.status);
      }
    } else {
      try {
        await editUser({
          user,
          pass,
          fname,
          lname,
          per,
          id: userId,
        });
        navigate("/settings/users/list");
      } catch (error) {
        Alert("Error", error?.response?.data.status);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      (async () => {
        const { data } = await getUserInfo(userId);
        Object.entries(data).forEach(([fieldName, fieldValue]) => {
          setValue(fieldName, fieldValue);
        });
        setValue("per", data.per);
      })();
    }
  }, []);

  return (
    <div className="my-10 mx-8">
      <PageTitle title={`${userId ? "Edit" : "Add"} user`} />

      <form
        className="flex flex-col gap-4 mt-16"
        onSubmit={handleSubmit(submitForm)}
      >
        {inputs.map((i,id) => {
          return (
            <div key={id} className="flex gap-4 items-center">
              <label className="w-[250px] shrink-0">
                {i.label}
              </label>
              <div className="flex flex-col gap-2">
                <input
                disabled={(i.label === "User" && userId) ?? false}
                  type={i.type ?? "text"}
                  className={`h-[36px] text-slate-900 !border-2 border-transparent 
                  w-[300px]
                   ${
                    errors[i.name]?.message ? "!border-red-700" : ""
                  }`}
                  {...register(i.name, i.validate)}
                />

                {errors[i.name]?.message ? (
                  <span className="text-red-600 text-sm ">
                    {errors[i.name]?.message}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}

        <div className="flex gap-4 items-center">
          <label className="w-[250px] shrink-0" htmlFor="">
            User level
          </label>
          <Controller
            // rules={{
            //   required: "این فیلد الزامی است",
            // }}
            render={({ field }) => (
              <select
                name="x"
                id=""
                className="w-full h-[36px] rounded-md"
                {...field}
                defaultValue={watch().per}
              >
                <option value={2}>Operator</option>
                <option value={1}>Admin</option>
              </select>
            )}
            name="per"
            control={control}
          />
        </div>

        <button className="inline-block w-24 ms-auto mt-0 h-9 bg-[#167DE5] rounded-md">Ok</button>
      </form>
    </div>
  );
};

export default AddUser;
