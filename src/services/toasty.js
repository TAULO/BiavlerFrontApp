import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const $toast = useToast();

function toastSuccess(content) {
    $toast.success(content)
}

function toastError(content) {
    $toast.error(content)
} 

function toastWarning(content) {
    $toast.warning(content)
}

export { toastSuccess, toastError, toastWarning }