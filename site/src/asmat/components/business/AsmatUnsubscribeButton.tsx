import { FC, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ShieldRemoveOutline } from 'mdi-material-ui';
import ButtonProgress from '../../../common/components/ButtonProgress';
import { Cancel, Check } from '@material-ui/icons';

type Props = {
  onUnsubscribe: () => unknown
};

const AsmatUnsubscribeButton: FC<Props> = ({ onUnsubscribe }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [unsubscribing, setUnsubscribing] = useState(false);
  const handleButtonClicked = () => setShowDialog(true);
  const handleConfirm = async () => {
    setUnsubscribing(true);
    await onUnsubscribe();
    setUnsubscribing(false);
    setShowDialog(false);
  };

  return (
    <>
      <Button variant="contained"
              startIcon={<ShieldRemoveOutline/>}
              onClick={handleButtonClicked}>
        Arrêter
      </Button>
      <Dialog disableBackdropClick
              disableEscapeKeyDown
              open={showDialog}>
        <DialogTitle>Confirmer l'arrêt de l'adhésion ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            L'assistante maternelle sera retirée de la liste des adhérentes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonProgress loading={unsubscribing}
                          color="primary"
                          startIcon={<Check/>}
                          onClick={() => handleConfirm()}>
            {({ loading }) => loading ? 'Chargement...' : 'Confirmer'}
          </ButtonProgress>
          <Button startIcon={<Cancel/>}
                  onClick={() => setShowDialog(false)}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AsmatUnsubscribeButton;
