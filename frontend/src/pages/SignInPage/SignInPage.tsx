import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/useAuth";
import { signInSchema, type SignInFormData } from "../../utils/validation";
import styles from "./SignInPage.module.scss";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name as keyof SignInFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear API error
    if (apiError) {
      setApiError("");
    }
  };
  const validateForm = (): boolean => {
    try {
      signInSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: unknown) {
      const validationErrors: Partial<SignInFormData> = {};

      if (error && typeof error === "object" && "errors" in error) {
        const zodError = error as {
          errors: Array<{ path: string[]; message: string }>;
        };
        zodError.errors?.forEach((err) => {
          const field = err.path[0] as keyof SignInFormData;
          validationErrors[field] = err.message;
        });
      }

      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
      navigate("/");
    } catch (error: unknown) {
      console.error("SignIn page error:", error);

      // Enhanced error message for debugging
      let errorMessage =
        (error as Error)?.message || "Sign in failed. Please try again.";

      // Add debugging info for network errors
      if (errorMessage.includes("Network error")) {
        errorMessage += "\n\nDebugging Info:\n";
        errorMessage += "• Backend URL: http://localhost:3000\n";
        errorMessage += "• Check if backend server is running\n";
        errorMessage += "• Check browser console for CORS errors\n";
        errorMessage += "• Verify CORS is configured correctly";
      }
      setApiError(errorMessage);

      // Show error toast for authentication failures
      if (errorMessage.includes("Network error")) {
        toast.error("Unable to connect to server", {
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          closeOnClick: true,
        });
      } else if (errorMessage.includes("Invalid credentials")) {
        toast.error("Invalid email or password", {
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          closeOnClick: true,
        });
      } else {
        // For any other authentication error
        toast.error("Sign in failed. Please try again.", {
          autoClose: 3000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          closeOnClick: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signInPage}>
      {/* Left Side - Sign In Form */}
      <div className={styles.leftSection}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Link
                to="/"
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                eg
              </Link>
            </div>
          </div>
          <div className={styles.signUpPrompt}>
            <span>Don't have an account?</span>
            <Link to="/signup" className={styles.signUpBtn}>
              Sign up
            </Link>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Welcome back!</h1>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {apiError && (
              <div className={styles.apiError}>
                {apiError.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            )}
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.formInput} ${
                  errors.email ? styles.error : ""
                }`}
                placeholder="Business email"
                disabled={loading}
              />
              {errors.email && (
                <span className={styles.formError}>{errors.email}</span>
              )}
            </div>{" "}
            <div className={styles.formGroup}>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${
                    errors.password ? styles.error : ""
                  }`}
                  placeholder="Password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className={styles.formError}>{errors.password}</span>
              )}
            </div>
            <div className={styles.formOptions}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>Keep me logged in</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.loadingContent}>
                  <div className={styles.spinner}></div>
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <div className={styles.formFooter}>
            <a href="#" className={styles.eulaLink}>
              End User License Agreement (EULA)
            </a>
            <div className={styles.gdprNotice}>
              <div className={styles.gdprIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="m9 12 2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <span>Easygenerator stores your data in the European Union</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Testimonial */}
      <div className={styles.rightSection}>
        <div className={styles.testimonial}>
          <div className={styles.quoteIcon}>"</div>
          <p className={styles.testimonialText}>
            User interface and course creation is straight forward, meaning
            courses can be created with minimal training required.
          </p>
          <div className={styles.testimonialAuthor}>
            {" "}
            <div className={styles.authorAvatar}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                K
              </div>
            </div>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>Scott Morris</div>
              <div className={styles.authorTitle}>
                Operations Manager, Kantar
              </div>
            </div>
          </div>
          <div className={styles.testimonialDots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={`${styles.dot} ${styles.active}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
