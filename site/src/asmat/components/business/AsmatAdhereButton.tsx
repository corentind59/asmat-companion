import { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { ShieldEditOutline } from 'mdi-material-ui';
import { DateTime } from 'luxon';
import { Adhesion } from '../../models/adhesion';
import ConfirmDialog from '../../../common/components/ConfirmDialog';

type Props = {
  adhesion: Adhesion | null,
  onAdhere: () => unknown
};

const AsmatAdhereButton: FC<Props> = ({ adhesion, onAdhere }) => {
  const [showDialog, setShowDialog] = useState(false);
  const handleButtonClicked = () => setShowDialog(true);
  const handleConfirm = async () => {
    await onAdhere();
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
      <ConfirmDialog open={showDialog}
                     title="Confirmer l'adhésion ?"
                     onConfirm={handleConfirm}
                     onCancel={() => setShowDialog(false)}
                     submittingLabel="Adhésion...">
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
      </ConfirmDialog>
    </>
  );
};

export default AsmatAdhereButton;
