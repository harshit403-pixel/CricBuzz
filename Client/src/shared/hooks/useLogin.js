import { useState } from "react";
import toast from "react-hot-toast";

import authService from "../services/auth/auth.service";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    try {
      setLoading(true);

      const response =
        await authService.login(payload);

      toast.success(response.message);

      return response;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
  };
};

export default useLogin;