import React from "react";
import { toast } from "react-toastify";

const ToastTestButton: React.FC = () => {
  const testToast = () => {
    // console.log("Testing toast with autoClose: 3000");
    toast.success("Test toast - should disappear in 3 seconds!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      toastId: "test-toast-" + Date.now(),
    });
  };

  const testError = () => {
    // console.log("Testing error toast with autoClose: 3000");
    toast.error("Test error - should disappear in 3 seconds!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true,
      toastId: "test-error-" + Date.now(),
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 10000,
      }}
    >
      <button
        onClick={testToast}
        style={{
          padding: "10px 15px",
          margin: "5px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Test Success Toast (3s)
      </button>
      <button
        onClick={testError}
        style={{
          padding: "10px 15px",
          margin: "5px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Test Error Toast (3s)
      </button>
    </div>
  );
};

export default ToastTestButton;
