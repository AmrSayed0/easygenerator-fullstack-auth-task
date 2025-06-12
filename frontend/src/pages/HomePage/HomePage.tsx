import React from "react";
import { useAuth } from "../../contexts/useAuth";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className={styles.homePage}>
      <div className="container">
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome to the application</h1>

          {isAuthenticated && user && (
            <div className={styles.userInfo}>
              <p className={styles.greeting}>
                Hello, {user.name || user.email}! 👋
              </p>
              <p className={styles.subText}>You are successfully signed in.</p>
            </div>
          )}

          {!isAuthenticated && (
            <div className={styles.guestInfo}>
              <p className={styles.subText}>
                Please sign in or sign up to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
