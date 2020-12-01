import {toast} from "react-toastify";

export const popupAlert = (code, msg, kind) => {
    if (kind === 'success') {
        toast.success(code + ': ' + msg, {
            position: 'top-right',
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    } else {
        toast.error(code + ': ' + msg, {
            position: 'top-right',
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};
