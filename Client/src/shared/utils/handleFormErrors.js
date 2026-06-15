export const handleFormErrors = (
  error,
  setError,
) => {
  const backendErrors =
    error?.response?.data?.errors;

  if (!backendErrors) return false;

  Object.entries(backendErrors).forEach(
    ([field, message]) => {
      setError(field, {
        type: "server",
        message,
      });
    },
  );

  return true;
};