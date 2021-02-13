import { toast } from 'react-toastify';
import Toast from './Toast';

export function toastSuccess(message: string) {
  toast.success(<Toast message={message}/>);
}

export function toastError(message: string) {
  toast.error(<Toast message={message} severity="error"/>);
}
