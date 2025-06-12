// Toast configuration and custom styles
export const toastConfig = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  theme: "light" as const,
};

export const successToastConfig = {
  ...toastConfig,
  className: "custom-success-toast",
};

export const errorToastConfig = {
  ...toastConfig,
  className: "custom-error-toast",
};

export const infoToastConfig = {
  ...toastConfig,
  className: "custom-info-toast",
};
