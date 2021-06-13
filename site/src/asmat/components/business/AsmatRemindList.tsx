import { Asmat } from '../../models/asmat';
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { FC, memo } from 'react';
import NotProvided from '../../../common/components/NotProvided';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { ShieldAlertOutline } from 'mdi-material-ui';
import AsmatUnsubscribeButton from './AsmatUnsubscribeButton';
import AsmatAdhereButton from './AsmatAdhereButton';

const formatAdhesionEndDate = (joiningDate: string) => DateTime.fromISO(joiningDate)
  .setLocale('fr')
  .plus({ year: 1 })
  .toLocaleString(DateTime.DATE_FULL);

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: 640
  },
  actionCell: {
    padding: 0
  }
}));

type Props = {
  asmats: Asmat[],
};

const AsmatsRemindList: FC<Props> = ({ asmats }) => {
  const classes = useStyles();
  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Adresse email</TableCell>
              <TableCell>Date de fin d'adhésion</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {asmats
              .sort((a, b) => a.adhesion!.joiningDate.localeCompare(b.adhesion!.joiningDate))
              .map(asmat => {
                const adhesionExpired = asmat.adhesion!.status === 'expired';
                return (
                  <TableRow hover key={asmat._id}>
                    <TableCell>
                      <Link to={`/asmats/${asmat._id}`}>
                        {`${asmat.lastName} ${asmat.firstName}`}
                      </Link>
                    </TableCell>
                    <TableCell>{asmat.email ?? <NotProvided feminize/>}</TableCell>
                    <TableCell>
                      <Grid container alignItems="center">
                        {formatAdhesionEndDate(asmat.adhesion!.joiningDate)}
                        {adhesionExpired && (
                          <ShieldAlertOutline color="error"/>
                        )}
                      </Grid>
                    </TableCell>
                    <TableCell className={classes.actionCell}>
                      <AsmatAdhereButton adhesion={asmat.adhesion} onAdhere={() => {
                      }} buttonStyle="icon"/>
                      {adhesionExpired && (
                        <AsmatUnsubscribeButton onUnsubscribe={() => {
                        }} buttonStyle="icon"/>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(AsmatsRemindList);
