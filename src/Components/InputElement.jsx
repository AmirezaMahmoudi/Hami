import { useState } from "react";

const InputElement = ({
  type = "text",
  name,
  register,
  className,
  placeholder,
  validate,
  errors,
  id,
  label,
  labelClassName,
  inputClassName,
  errorClssName,
  showError = true,
  helperText
}) => {
  const [isShowPass, setIsShowPass] = useState(false);

  return label ? (
    <div className={className}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        type={type}
        {...register(name, validate)}
        placeholder={placeholder}
        name={name}
        className={`${inputClassName} ${
          errors?.[name]?.message ? "!border-red-600" : null
        }`}
        id={id}
      />
    </div>
  ) : (
    <>

      {type === "password" ? (
        <div className="relative">
          <input
            type={isShowPass ? "text" : type}
            {...register(name, validate)}
            placeholder={placeholder}
            name={name}
            className={`${className} ${
              errors?.[name]?.message ? "!border-red-600" : null
            }`}
            id={id}
          />
          
        </div>
      ) : (
        <input
          type={type}
          {...register(name, validate)}
          placeholder={placeholder}
          name={name}
          className={`${className} ${
            errors?.[name]?.message ? "!border-red-600" : null
          }`}
          id={id}
        />
      )}
      {
        showError ? (
          errors?.[name]?.message ? (
            <span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`text-red-600 mr-2 ${errorClssName}`}
            >
               {showError ? errors?.[name]?.message : null}
            </span>
          ) : null

        ) : null
      }

      {
        helperText ? (
          <span className="text-[#5d5d5d]">{helperText}</span>
        ) : null
      }
    </>
  );
};

export default InputElement;
