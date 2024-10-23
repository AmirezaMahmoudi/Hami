import { Controller, useForm } from "react-hook-form";
import PageTitle from "../../../../Components/PageTitle";
import CircleLoading from "../../../../Components/CircleLoading";
import {
  from0to254,
  from0to255,
  from128to255,
  from1to223,
  from1to254,
} from "./validate";
import { useEffect } from "react";

const Network = () => {
  // const

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
  } = useForm();

  const inputs = [
    {
      label: "IPv4 Address",
      inputs: [
        {
          name: "Address_octet_1",
          validate: from1to223,
          defaultValue : 172
        },
        {
          name: "Address_octet_2",
          validate: from0to254,
          defaultValue : 16
        },
        {
          name: "Address_octet_3",
          validate: from0to254,
          defaultValue : 17
        },
        {
          name: "Address_octet_4",
          validate: from1to254,
          defaultValue : 148
        },
      ],
    },
    {
      label: "IPv4 Subnet Mask",
      inputs: [
        {
          name: "Subnet_octet_1",
          validate: from128to255,
          defaultValue : 255
        },
        {
          name: "Subnet_octet_2",
          validate: from0to255,
          defaultValue : 255
        },
        {
          name: "Subnet_octet_3",
          validate: from0to255,
          defaultValue : 255
        },
        {
          name: "Subnet_octet_4",
          validate: from0to255,
          defaultValue : 0
        },
      ],
    },
    {
      label: "IPv4 Gateway",
      inputs: [
        {
          name: "Gateway_octet_1",
          validate: from1to223,
          defaultValue : 172
        },
        {
          name: "Gateway_octet_2",
          validate: from0to254,
          defaultValue : 16
        },
        {
          name: "Gateway_octet_3",
          validate: from0to254,
          defaultValue : 17
        },
        {
          name: "Gateway_octet_4",
          validate: from1to254,
          defaultValue : 1
        },
      ],
    },
    {
      label: "Preferred DNS",
      inputs: [
        {
          name: "Preferred_octet_1",
          validate: from1to223,
          defaultValue : 4
        },
        {
          name: "Preferred_octet_2",
          validate: from0to254,
          defaultValue : 2
        },
        {
          name: "Preferred_octet_3",
          validate: from0to254,
          defaultValue : 2
        },
        {
          name: "Preferred_octet_4",
          validate: from1to254,
          defaultValue : 4
        },
      ],
    },
    {
      label: "Alternative DNS",
      inputs: [
        {
          name: "Alternative_octet_1",
          validate: from1to223,
          defaultValue : 8
        },
        {
          name: "Alternative_octet_2",
          validate: from0to254,
          defaultValue : 8
        },
        {
          name: "Alternative_octet_3",
          validate: from0to254,
          defaultValue : 8
        },
        {
          name: "Alternative_octet_4",
          validate: from1to254,
          defaultValue : 8
        },
      ],
    },
  ];

  const submitForm = async (formData) => {
    console.log(formData);
  };

  useEffect(() => {
    document.querySelector("[type=number]").focus();
  }, []);

  return (
    <div className="my-10 mx-8">
      <PageTitle title={"Network setting"} />

      <div>
        <div className="flex gap-8 mt-5">
          <span className="text-[1.2rem]  w-[200px]"></span>
          <div className="">
            <div className="flex gap-2 items-baseline">
              <input
                type="radio"
                name="ip_mode"
                value="get_ipv4"
                id="get_ipv4"
              />
              <label className="text-[17px]" htmlFor="get_ipv4">Get IPv4 address automatically </label>
            </div>

            <div className="flex gap-2 items-baseline">
              <input
                type="radio"
                name="ip_mode"
                value="use_fixed"
                id="use_fixed"
                checked
              />
              <label className="text-[17px]" htmlFor="use_fixed"> Use fixed IPv4 address </label>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitForm)} className="">
          <div className="flex flex-col gap-8 mt-5">
            {inputs.map((i) => {
              return (
                <div className="flex gap-8 items-center ">
                  <span className="text-[1.2rem] w-[200px] ">{i.label}</span>

                  <div className="flex gap-1">
                    {i.inputs.map((subI) => {
                      return (
                        <>
                          <Controller
                            name={subI.name} // Replace with your actual field name
                            render={({ field }) => (
                              <input
                              defaultValue={subI.defaultValue}
                                maxLength={3}
                                className={`h-8 w-14 text-slate-900 !border-2 border-transparent  text-center 
                              
                            ${!!errors[subI.name] ? "!border-red-700" : ""}`}
                                type="number"
                                value={watch(subI.name)}
                                onChange={(e) => {
                                  // const value = e.target.value;
                                  const value = e.target.value.replace(".", ""); // Remove dots on change

                                  if (value.length < 4) {
                                    field.onChange(value);
                                  }
                                  if (value.length === 3) {
                                    e.target.nextSibling.nextSibling?.focus();
                                  }

                                  if (value.length === 0) {
                                    e.target.previousElementSibling?.previousElementSibling?.focus();
                                  }
                                }}
                                onKeyUp={(e) => {
                                  const charCode = e.key;
                                  console.log(charCode);
                                  if (charCode === ".") {
                                    e.target.nextSibling.nextSibling?.focus();
                                    e.preventDefault(); // Prevent dot entry
                                    const newValue = e.target.value.replace(
                                      ".",
                                      ""
                                    ); // Remove dots
                                    console.log(newValue);
                                    field.onChange("25"); // Update form state
                                    
                                  }
                                }}
                              />
                            )}
                            control={control}
                            rules={subI.validate}
                          />
                          <span className="self-end last:hidden">.</span>
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/*  */}
          <button
            disabled={isSubmitting}
            className="w-[110px] !h-[32px] bg-[#167DE5] rounded-md mt-4 ms-auto block"
          >
            {isSubmitting ? <CircleLoading /> : "Ok"}
          </button>{" "}
        </form>
      </div>
    </div>
  );
};

export default Network;

{
  /* <input
className={`h-8 w-14 text-slate-900 !border-2 border-transparent  text-center
${!!errors[subI.name] ? "!border-red-700" : "ss"}`}
type="number"
{...register(subI.name, subI.validate)}
/> */
}
