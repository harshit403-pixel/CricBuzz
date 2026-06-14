import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder = "",
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;