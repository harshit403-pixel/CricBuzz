import Input from "./Input";

const FormField = ({
  label,
  error,
  className = "",
  ...inputProps
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">
        {label}
      </label>

      <Input
        className={className}
        {...inputProps}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;