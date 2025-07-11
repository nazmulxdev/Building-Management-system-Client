import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLoginButton from "../../Shared/SocialLoginButton";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Will be implemented later
    console.log(data);
  };

  const password = watch("password");

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb text-primary">
        Create New Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="form-control">
          <label className="label" htmlFor="register-name">
            <span className="label-text text-text">Full Name</span>
          </label>
          <input
            type="text"
            id="register-name"
            placeholder="Enter your full name"
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>
        {/* profile pic */}
        <div className="form-control">
          <label className="label" htmlFor="profile-photo">
            <span className="label-text text-text">Your Profile Photo</span>
          </label>

          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("profilePhoto", {
              required: "Profile photo is required",
              validate: {
                lessThan5MB: (files) =>
                  files[0]?.size < 5000000 || "Maximum 5MB file size",
                acceptedFormats: (files) =>
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files[0]?.type,
                  ) || "Only JPEG, PNG, or WEBP formats",
              },
            })}
          />

          {errors.profilePhoto && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.profilePhoto.message}
              </span>
            </label>
          )}

          {/* Image preview (optional) */}
          {watch("profilePhoto")?.[0] && (
            <div className="mt-3">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img
                    src={URL.createObjectURL(watch("profilePhoto")[0])}
                    alt="Preview"
                  />
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                {watch("profilePhoto")[0].name}
              </p>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label" htmlFor="register-email">
            <span className="label-text text-text">Email</span>
          </label>
          <input
            type="email"
            id="register-email"
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
          <label className="label" htmlFor="register-password">
            <span className="label-text text-text">Password</span>
          </label>
          <input
            type="password"
            id="register-password"
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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                message: "Must contain uppercase and lowercase letters",
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
        </div>

        {/* Confirm Password Field */}
        <div className="form-control">
          <label className="label" htmlFor="register-confirm-password">
            <span className="label-text text-text">Confirm Password</span>
          </label>
          <input
            type="password"
            id="register-confirm-password"
            placeholder="••••••••"
            className={`input input-bordered w-full ${
              errors.confirmPassword ? "input-error" : ""
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.confirmPassword.message}
              </span>
            </label>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
        {/* social login */}
        <SocialLoginButton></SocialLoginButton>

        {/* Login Link */}
        <p className="text-center text-text-secondary">
          Already have an account?{" "}
          <Link to="/auth/login" className="link link-accent">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
