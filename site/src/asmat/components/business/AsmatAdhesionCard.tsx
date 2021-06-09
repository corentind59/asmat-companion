import { ComponentPropsWithoutRef, FC } from 'react';
import AsmatCard from '../ui/AsmatCard';
import { ShieldAlertOutline, ShieldCheck, ShieldRemove } from 'mdi-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';
import { Box, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import AsmatAdhereButton from './AsmatAdhereButton';

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

type Props = ComponentPropsWithoutRef<typeof AsmatAdhereButton>;

const AsmatAdhesionCard: FC<Props> = ({ adhesion, onAdhere }) => {
  const classes = useStyles();
  const title = !adhesion ? 'Non adhérent(e)' :
    (adhesion.status === 'expired' ? 'Adhésion expirée' : 'Adhérent(e)');
  const icon = !adhesion ? <ShieldRemove/> :
    (adhesion.status === 'normal' ? <ShieldCheck className={classes.adherent}/> :
      (adhesion.status === 'remind' ? <ShieldAlertOutline className={classes.remind}/> :
        <ShieldAlertOutline className={classes.expired}/>));

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
          <AsmatAdhereButton adhesion={adhesion} onAdhere={onAdhere}/>
        </Box>
      )}
    </AsmatCard>
  );
};

export default AsmatAdhesionCard;
