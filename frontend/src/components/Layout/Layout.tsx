import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/useAuth";
// import ConnectionStatus from "../ConnectionStatus/ConnectionStatus";
import styles from "./Layout.module.scss";
import "react-toastify/dist/ReactToastify.css";
// import "../../styles/toast.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, signOut, user, loading } = useAuth();
  const location = useLocation();

  // Hide navbar on authentication pages
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className={`${styles.layout} ${isAuthPage ? styles.authLayout : ""}`}>
      {/* <ConnectionStatus /> */}
      {!isAuthPage && (
        <nav className={styles.navbar}>
          <div className={styles.navContainer}>
            <Link to="/" className={styles.logo}>
              MyApp
            </Link>

            <div className={styles.navButtons}>
              {loading ? (
                <div className={styles.loading}>Loading...</div>
              ) : isAuthenticated ? (
                <div className={styles.userSection}>
                  {user?.name && (
                    <span className={styles.userName}>
                      Welcome, {user.name}
                    </span>
                  )}
                  <button
                    onClick={handleSignOut}
                    className={`btn danger ${styles.signOutBtn}`}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className={styles.authButtons}>
                  <Link to="/signin" className="btn outline">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn primary">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
      <main className={isAuthPage ? styles.authMain : styles.main}>
        {children}
      </main>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        newestOnTop={false}
        rtl={false}
        position="top-right"
        theme="light"
      />
    </div>
  );
};

export default Layout;
