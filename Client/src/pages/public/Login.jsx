import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { env } from "../../config/env";
import { useLogin } from "../../features/auth/hooks/useLogin";
import { loginSchema } from "../../features/auth/index.js";
import { setUser } from "../../slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginMutation.mutateAsync(data);

      dispatch(setUser(res.data.data.user));
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${env.API_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-radial from-slate-900 via-slate-950 to-black px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h2 className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
            Welcome Back
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your scorer panel
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail className="h-5 w-5" />
              </span>

              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                  errors.email ? "border-red-500" : "border-slate-800"
                }`}
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>

              <button
                type="button"
                className="text-xs text-emerald-400 transition hover:text-emerald-300 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="h-5 w-5" />
              </span>

              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full rounded-lg border bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                  errors.password ? "border-red-500" : "border-slate-800"
                }`}
                {...register("password")}
              />
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-slate-800" />
          <span className="mx-4 text-xs uppercase tracking-wider text-slate-500">
            or
          </span>
          <div className="flex-grow border-t border-slate-800" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-slate-800 bg-slate-950 py-3 text-sm font-medium text-slate-200 transition duration-200 hover:bg-slate-900 active:scale-[0.99]"
        >
          <Globe className="h-5 w-5 text-emerald-400" />
          Login with Google
        </button>

        <p className="mt-8 text-center text-xs text-slate-400">
          New here?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-400 transition hover:text-emerald-300 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
