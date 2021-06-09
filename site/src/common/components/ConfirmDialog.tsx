import { FC, PropsWithChildren, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ButtonProgress from './ButtonProgress';
import { Cancel, Check } from '@material-ui/icons';

type Props = PropsWithChildren<{
  open: boolean;
  title: string;
  confirmLabel?: string;
  submittingLabel?: string;
  cancelLabel?: string;
  onConfirm: () => unknown;
  onCancel: () => unknown;
}>;

const ConfirmDialog: FC<Props> = ({
                                    open,
                                    title,
                                    confirmLabel = 'Confirmer',
                                    submittingLabel = 'Chargement...',
                                    cancelLabel = 'Annuler',
                                    onConfirm,
                                    onCancel,
                                    children
                                  }) => {
  const [submitting, setSubmitting] = useState(false);
  const handleConfirm = async () => {
    setSubmitting(true);
    await onConfirm();
    setSubmitting(false);
  };

  return (
    <Dialog disableBackdropClick
            disableEscapeKeyDown
            open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonProgress loading={submitting}
                        color="primary"
                        startIcon={<Check/>}
                        onClick={() => handleConfirm()}>
          {({ loading }) => loading ? submittingLabel : confirmLabel}
        </ButtonProgress>
        <Button startIcon={<Cancel/>} onClick={() => onCancel()}>
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
