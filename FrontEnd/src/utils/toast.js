import { toast } from "react-toastify";

// Centralizza il toast d'errore per tutte le mutazioni. Gli errori 401
// non vengono mostrati: l'utente sta uscendo / sessione scaduta, il
// redirect è già gestito altrove.
export const handleMutationError = (err, fallback) => {
  if (err.response?.status === 401) return;
  showError(err.response?.data?.error || err.message || fallback);
};

// Toast di successo
export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });
};

// Toast di errore
export const showError = (message, options = {}) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    theme: "colored",
    ...options,
  });
};

// Toast informativo
export const showInfo = (message, options = {}) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    theme: "light",
    ...options,
  });
};

// Toast warning
export const showWarning = (message, options = {}) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 2500,
    theme: "colored",
    ...options,
  });
};
