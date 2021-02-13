import { FC } from 'react';
import { Alert, Color } from '@material-ui/lab';
import { ToastContentProps } from 'react-toastify';

type Props = Pick<ToastContentProps, 'closeToast'> & {
  severity?: Color,
  message: string
};

const Toast: FC<Props> = ({ closeToast, severity = 'success', message }) => (
  <Alert severity={severity} onClose={closeToast}>
    {message}
  </Alert>
);

export default Toast;
