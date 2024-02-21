import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const $toast = useToast();

function toastSuccess(content, duration = 2000) {
    $toast.success(content, { duration })
}

function toastError(content, duration = 2000) {
    $toast.error(content, { duration })
} 

function toastWarning(content) {
    $toast.warning(content)
}

export { toastSuccess, toastError, toastWarning }