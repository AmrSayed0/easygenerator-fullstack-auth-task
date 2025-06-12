import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/useAuth";
import { signUpSchema, type SignUpFormData } from "../../utils/validation";
import styles from "./SignUpPage.module.scss";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name as keyof SignUpFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear API error
    if (apiError) {
      setApiError("");
    }
  };
  const validateForm = (): boolean => {
    try {
      signUpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: unknown) {
      const validationErrors: Partial<SignUpFormData> = {};

      if (error && typeof error === "object" && "errors" in error) {
        const zodError = error as {
          errors: Array<{ path: string[]; message: string }>;
        };
        zodError.errors?.forEach((err) => {
          const field = err.path[0] as keyof SignUpFormData;
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
      await signUp(formData.name || "", formData.email, formData.password);
      navigate("/");
    } catch (error: unknown) {
      console.error("SignUp page error:", error);

      // Enhanced error message for debugging
      let errorMessage =
        (error as Error)?.message || "Sign up failed. Please try again.";

      // Add debugging info for network errors
      if (errorMessage.includes("Network error")) {
        errorMessage += "\n\nDebugging Info:\n";
        errorMessage += "• Backend URL: http://localhost:3000\n";
        errorMessage += "• Check if backend server is running\n";
        errorMessage += "• Check browser console for CORS errors\n";
        errorMessage += "• Verify CORS is configured correctly";
      }

      setApiError(errorMessage); // Show error toast for signup failures
      if (!errorMessage.includes("Network error")) {
        if (
          errorMessage.includes("already exists") ||
          errorMessage.includes("duplicate")
        ) {
          toast.error("Email already exists", {
            autoClose: 3000,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            closeOnClick: true,
          });
        } else {
          toast.error("Registration failed", {
            autoClose: 3000,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            closeOnClick: true,
          });
        }
      } else {
        toast.error("Unable to connect to server", {
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
    <div className={styles.signUpPage}>
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
          <div className={styles.signInPrompt}>
            <span>Already have an account?</span>
            <Link to="/signin" className={styles.signInBtn}>
              Log in
            </Link>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Start creating courses now</h1>
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
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.formInput} ${
                  errors.name ? styles.error : ""
                }`}
                placeholder="Full name"
                disabled={loading}
              />
              {errors.name && (
                <span className={styles.formError}>{errors.name}</span>
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
            <div className={styles.agreementSection}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="eula"
                  className={styles.checkbox}
                  required
                />
                <label htmlFor="eula" className={styles.checkboxText}>
                  I agree to Easygenerator's{" "}
                  <a href="#" className={styles.link}>
                    End User License Agreement (EULA)
                  </a>
                </label>
              </div>

              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="marketing"
                  className={styles.checkbox}
                />
                <label htmlFor="marketing" className={styles.checkboxText}>
                  I'm interested in receiving product updates and e-learning
                  tips
                </label>
              </div>
            </div>
            <button
              type="submit"
              className={styles.signUpButton}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.loadingContent}>
                  <div className={styles.spinner}></div>
                  Creating Account...
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.testimonial}>
          <div className={styles.quoteIcon}>"</div>
          <p className={styles.testimonialText}>
            If we wouldn't have started with Easygenerator, we wouldn't be able
            to produce as much content to train our customers and service
            providers as we are now.
          </p>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorAvatar}>
              {/* <img src="/api/placeholder/48/48" alt="Cecilie Tystad" /> */}
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
                C
              </div>
            </div>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>Cecilie Tystad</div>
              <div className={styles.authorTitle}>
                Training Director Sales & Service, Electrolux
              </div>
            </div>
          </div>
          <div className={styles.testimonialDots}>
            <div className={`${styles.dot} ${styles.active}`}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
