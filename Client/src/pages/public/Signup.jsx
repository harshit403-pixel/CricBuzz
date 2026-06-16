import { useForm, useWatch } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  Globe,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { env } from "../../config/env.js";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "SCORER", // Defaults to SCORER
    },
  });

  const selectedRole = useWatch({
    control,
    name: "role",
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(`/auth/register`, data);
      dispatch(setUser(res.data.data.user));
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${env.API_URL}/auth/google`;
  };

  const roles = [
    {
      id: "SCORER",
      name: "Scorer",
      desc: "Logs and updates live match data",
      icon: UserCheck,
    },
    {
      id: "ADMIN",
      name: "Admin",
      desc: "Manages matches, teams, and lists",
      icon: ShieldCheck,
    },
    {
      id: "SUPER_ADMIN",
      name: "Super Admin",
      desc: "Full system configurations",
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-radial from-slate-900 via-slate-950 to-black px-4 py-12 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Join the team and start scoring/managing matches
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <User className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full rounded-lg border bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                  errors.name ? "border-red-500" : "border-slate-800"
                }`}
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="h-5 w-5" />
              </span>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                className={`w-full rounded-lg border bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${
                  errors.password ? "border-red-500" : "border-slate-800"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Field - Premium Cards Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Account Role
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setValue("role", role.id)}
                    className={`flex flex-col items-center justify-between rounded-xl border p-4 text-center transition duration-200 outline-none cursor-pointer ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                        : "border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:bg-slate-950"
                    }`}
                  >
                    <IconComponent
                      className={`h-6 w-6 mb-2 ${isSelected ? "text-emerald-400" : "text-slate-500"}`}
                    />
                    <div>
                      <span className="block text-sm font-semibold">
                        {role.name}
                      </span>
                      <span className="block text-[10px] mt-1 leading-tight text-slate-500">
                        {role.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <input type="hidden" {...register("role")} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="mx-4 text-xs uppercase tracking-wider text-slate-500">
            or
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Google Signup Option */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-800 bg-slate-950 py-3 text-sm font-medium text-slate-200 transition duration-200 hover:bg-slate-900 active:scale-[0.99] cursor-pointer"
        >
          <Globe className="h-5 w-5 text-emerald-400" />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
