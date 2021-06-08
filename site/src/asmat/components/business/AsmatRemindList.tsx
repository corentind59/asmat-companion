import { Asmat } from '../../models/asmat';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  makeStyles
} from '@material-ui/core';
import { FC, memo } from 'react';
import NotProvided from '../../../common/components/NotProvided';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { ShieldAlertOutline } from 'mdi-material-ui';

const formatAdhesionEndDate = (joiningDate: string) => DateTime.fromISO(joiningDate)
  .setLocale('fr')
  .plus({ year: 1 })
  .toLocaleString(DateTime.DATE_FULL);

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: 640
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
            </TableRow>
          </TableHead>
          <TableBody>
            {asmats
              .sort((a, b) => a.adhesion!.joiningDate.localeCompare(b.adhesion!.joiningDate))
              .map(asmat => (
              <TableRow key={asmat._id} hover>
                <TableCell>
                  <Link to={`/asmats/${asmat._id}`}>
                    {`${asmat.lastName} ${asmat.firstName}`}
                  </Link>
                </TableCell>
                <TableCell>{asmat.email ?? <NotProvided feminize/>}</TableCell>
                <TableCell>
                  <Grid container alignItems="center">
                    {formatAdhesionEndDate(asmat.adhesion!.joiningDate)}
                    {asmat.adhesion!.status === 'expired' && (
                      <ShieldAlertOutline color="error"/>
                    )}
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(AsmatsRemindList);
