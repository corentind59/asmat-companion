import { FC, useState } from 'react';
import AsmatCard from '../ui/AsmatCard';
import { Adhesion } from '../../models/adhesion';
import { ShieldAlertOutline, ShieldCheck, ShieldEditOutline, ShieldRemove } from 'mdi-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@material-ui/core';
import { DateTime } from 'luxon';
import { Cancel, Check } from '@material-ui/icons';
import ButtonProgress from '../../../common/components/ButtonProgress';

const useStyles = makeStyles(() => ({
  adherent: {
    color: green[500]
  },
  remind: {
    color: orange[500]
  },
  expired: {
    color: red[500]
  }
}));

type Props = {
  adhesion: Adhesion | null,
  onAdhere: () => unknown
};

const AsmatAdhesionCard: FC<Props> = ({ adhesion, onAdhere }) => {
  const classes = useStyles();
  const [showAdhereDialog, setShowAdhereDialog] = useState(false);
  const [adhering, setAdhering] = useState(false);
  const title = !adhesion ? 'Non adhérent(e)' :
    (adhesion.status === 'expired' ? 'Adhésion expirée' : 'Adhérent(e)');
  const icon = !adhesion ? <ShieldRemove/> :
    (adhesion.status === 'normal' ? <ShieldCheck className={classes.adherent}/> :
      (adhesion.status === 'remind' ? <ShieldAlertOutline className={classes.remind}/> :
        <ShieldAlertOutline className={classes.expired}/>));
  const handleAdhereClick = () => setShowAdhereDialog(true);
  const handleAdhereConfirm = async () => {
    setAdhering(true);
    await onAdhere();
    setAdhering(false);
    setShowAdhereDialog(false);
  };

  return (
    <AsmatCard title={title} icon={icon}>
      {adhesion && (() => {
        const adhesionDate = DateTime.fromISO(adhesion.joiningDate).setLocale('fr');
        return (
          <Typography component="p" variant="body1">
            {adhesion.status !== 'expired' && (
              <Box component="span" display="flex" justifyContent="space-between" marginBottom={1}>
                <strong>Date d'adhésion :</strong>
                <span>{adhesionDate.toLocaleString(DateTime.DATE_FULL)}</span>
              </Box>
            )}
            <Box component="span" display="flex" justifyContent="space-between">
              <strong>Date de fin d'adhésion : </strong>
              <span>{adhesionDate.plus({ year: 1 }).toLocaleString(DateTime.DATE_FULL)}</span>
            </Box>
          </Typography>
        );
      })()}
      {(!adhesion || adhesion.status !== 'normal') && (
        <Box display="flex" justifyContent="center" marginTop={1}>
          <Button variant="contained"
                  color="primary"
                  startIcon={<ShieldEditOutline/>}
                  onClick={handleAdhereClick}>
            {adhesion ? 'Ré-adhérer' : 'Adhérer'}
          </Button>
        </Box>
      )}
      <Dialog disableBackdropClick
              disableEscapeKeyDown
              open={showAdhereDialog}>
        <DialogTitle>Confirmer l'adhésion ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {(adhesion && adhesion.status === 'remind') ?
              <>
                Confirmez-vous la ré-adhésion ? L'assistante maternelle étant déjà adhérente, la date de fin d'adhésion
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
                Confirmez-vous l'adhésion ? L'assistante maternelle n'étant pas (ou plus) adhérente, l'adhésion prendra
                fin
                le <strong>
                {
                  DateTime.local().toUTC()
                    .plus({ year: 1 })
                    .setLocale('fr')
                    .toLocaleString(DateTime.DATE_FULL)
                }
              </strong>, excepté en cas de ré-adhésion suite au rappel un mois avant la date d'échéance.
              </>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonProgress loading={adhering}
                          color="primary"
                          startIcon={<Check/>}
                          onClick={() => handleAdhereConfirm()}>
            {({ loading }) => loading ? 'Adhésion...' : 'Confirmer'}
          </ButtonProgress>
          <Button startIcon={<Cancel/>}
                  onClick={() => setShowAdhereDialog(false)}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </AsmatCard>
  );
};

export default AsmatAdhesionCard;
