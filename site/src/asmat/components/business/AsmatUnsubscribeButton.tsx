import { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { ShieldRemoveOutline } from 'mdi-material-ui';
import ConfirmDialog from '../../../common/components/ConfirmDialog';

type Props = {
  onUnsubscribe: () => unknown
};

const AsmatUnsubscribeButton: FC<Props> = ({ onUnsubscribe }) => {
  const [showDialog, setShowDialog] = useState(false);
  const handleButtonClicked = () => setShowDialog(true);
  const handleConfirm = async () => {
    await onUnsubscribe();
    setShowDialog(false);
  };

  return (
    <>
      <Button variant="contained"
              startIcon={<ShieldRemoveOutline/>}
              onClick={handleButtonClicked}>
        Arrêter
      </Button>
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
