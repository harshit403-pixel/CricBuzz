export const getErrorMessage = (error) => {
  const response = error?.response?.data;

  if (response?.errors) {
    return Object.values(response.errors)[0];
  }

  return (
    response?.message ||
    error?.message ||
    "Something went wrong"
  );
};