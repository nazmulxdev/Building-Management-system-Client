import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLoginButton from "../../Shared/SocialLoginButton";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Will be implemented later
    console.log(data);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="form-control">
          <label className="label" htmlFor="login-email">
            <span className="label-text text-text">Email</span>
          </label>
          <input
            type="email"
            id="login-email"
            placeholder="Enter your email"
            className={`input input-bordered w-full ${
              errors.email ? "input-error" : ""
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            </label>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label" htmlFor="login-password">
            <span className="label-text text-text">Password</span>
          </label>
          <input
            type="password"
            id="login-password"
            placeholder="••••••••"
            className={`input input-bordered w-full ${
              errors.password ? "input-error" : ""
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          )}
          <label className="label">
            <Link
              to="/forgot-password"
              className="label-text-alt link link-accent"
            >
              Forgot password?
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>

        {/* social login  */}
        <SocialLoginButton></SocialLoginButton>

        {/* Register Link */}
        <p className="text-center text-text-secondary">
          Don't have an account?{" "}
          <Link to="/auth/register" className="link link-accent">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
