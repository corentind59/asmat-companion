import { FC, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ShieldEditOutline } from 'mdi-material-ui';
import { DateTime } from 'luxon';
import ButtonProgress from '../../../common/components/ButtonProgress';
import { Cancel, Check } from '@material-ui/icons';
import { Adhesion } from '../../models/adhesion';

type Props = {
  adhesion: Adhesion | null,
  onAdhere: () => unknown
};

const AsmatAdhereButton: FC<Props> = ({ adhesion, onAdhere }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [adhering, setAdhering] = useState(false);
  const handleButtonClicked = () => setShowDialog(true);
  const handleConfirm = async () => {
    setAdhering(true);
    await onAdhere();
    setAdhering(false);
    setShowDialog(false);
  };

  return (
    <>
      <Button variant="contained"
              color="primary"
              startIcon={<ShieldEditOutline/>}
              onClick={handleButtonClicked}>
        {adhesion ? 'Ré-adhérer' : 'Adhérer'}
      </Button>
      <Dialog disableBackdropClick
              disableEscapeKeyDown
              open={showDialog}>
        <DialogTitle>Confirmer l'adhésion ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {(adhesion && adhesion.status === 'remind') ?
              <>
                L'assistante maternelle étant déjà adhérente, la date de fin d'adhésion
                sera mise à jour à la date d'anniversaire de l'année prochaine, soit le <strong>
                {
                  DateTime.fromISO(adhesion.joiningDate)
                    .plus({ year: 2 })
                    .setLocale('fr')
                    .toLocaleString(DateTime.DATE_FULL)
                }
              </strong>.
              </> :
              <>
                L'assistante maternelle n'étant pas (ou plus) adhérente, l'adhésion prendra fin
                le <strong>
                  {
                    DateTime.local().toUTC()
                      .plus({ year: 1 })
                      .setLocale('fr')
                      .toLocaleString(DateTime.DATE_FULL)
                  }
                </strong>,
                excepté en cas de ré-adhésion suite au rappel un mois avant la date d'échéance.
              </>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonProgress loading={adhering}
                          color="primary"
                          startIcon={<Check/>}
                          onClick={() => handleConfirm()}>
            {({ loading }) => loading ? 'Adhésion...' : 'Confirmer'}
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

export default AsmatAdhereButton;
