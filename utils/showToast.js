import { toast } from "react-toastify";

export default function showToast(message, state) {
  const options = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  state ? toast.success(message, options) : toast.error(message, options);
}
