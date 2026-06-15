const Button = ({
  children,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;