import { FC, useState } from 'react';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { ShieldRemove, ShieldRemoveOutline } from 'mdi-material-ui';
import ConfirmDialog from '../../../common/components/ConfirmDialog';

type Props = {
  onUnsubscribe: () => unknown;
  buttonStyle?: 'button' | 'icon';
};

const AsmatUnsubscribeButton: FC<Props> = ({ onUnsubscribe, buttonStyle = 'button' }) => {
  const [showDialog, setShowDialog] = useState(false);
  const handleButtonClicked = () => setShowDialog(true);
  const handleConfirm = async () => {
    await onUnsubscribe();
    setShowDialog(false);
  };

  return (
    <>
      {buttonStyle === 'icon' ?
        <Tooltip title="Arrêter l'adhésion">
          <IconButton color="primary"
                      onClick={handleButtonClicked}>
            <ShieldRemove/>
          </IconButton>
        </Tooltip> :
        <Button variant="contained"
                startIcon={<ShieldRemoveOutline/>}
                onClick={handleButtonClicked}>
          Arrêter
        </Button>
      }
      <ConfirmDialog open={showDialog}
                     title="Confirmer l'arrêt de l'adhésion ?"
                     onConfirm={handleConfirm}
                     onCancel={() => setShowDialog(false)}>
        L'assistante maternelle sera retirée de la liste des adhérentes.
      </ConfirmDialog>
    </>
  );
};

export default AsmatUnsubscribeButton;
