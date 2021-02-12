import { AsmatSummary } from '../../models/asmat';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { LazyDataReader } from '../../../api/types';
import { memo } from 'react';
import { formatAddress } from '../../services/behaviors';
import NotProvided from '../../../common/components/NotProvided';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    maxHeight: 600
  }
});

type AsmatsListProps = {
  asmatsSummaryReader: LazyDataReader<AsmatSummary[]>
};

function AsmatsList({ asmatsSummaryReader }: AsmatsListProps) {
  const asmats = asmatsSummaryReader.read();
  const classes = useStyles();

  if (!asmats) {
    return null;
  }

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>N° de téléphone</TableCell>
            </TableRow>
          </TableHead>
          {asmats.length > 0 ?
            <>
              <TableBody>
                {asmats.map(asmat => (
                  <TableRow key={asmat._id} hover>
                    <TableCell>
                      <Link to={`/asmats/${asmat._id}`}>{asmat.lastName}</Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/asmats/${asmat._id}`}>{asmat.firstName}</Link>
                    </TableCell>
                    <TableCell>{formatAddress(asmat.address)}</TableCell>
                    <TableCell>
                      {!asmat.fixPhoneNumber && !asmat.cellPhoneNumber ?
                        <NotProvided/> :
                        <Grid container alignItems="center">
                          <Grid item>{asmat.fixPhoneNumber && `Fixe : ${asmat.fixPhoneNumber}`}</Grid>
                          <Grid item>{asmat.cellPhoneNumber && `Portable : ${asmat.cellPhoneNumber}`}</Grid>
                        </Grid>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    {asmats.length} assistante{asmats.length > 1 && 's'} maternelle{asmats.length > 1 && 's'} trouvée{asmats.length > 1 && 's'}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </> :
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography component="strong" variant="body2">
                    Aucune assistante maternelle n'a été trouvée.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          }
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default memo(AsmatsList);
