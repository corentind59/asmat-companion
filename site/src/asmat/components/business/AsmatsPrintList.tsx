import { Asmat } from '../../models/asmat';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { FC } from 'react';
import { formatAddress } from '../../services/behaviors';
import NotProvided from '../../../common/components/NotProvided';

type Props = {
  asmats: Asmat[],
};

const AsmatsPrintList: FC<Props> = ({ asmats }) => (
  <TableContainer className="print-only">
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell>Adresse</TableCell>
          <TableCell>Nombre d'accueils</TableCell>
          <TableCell>Disponibilité</TableCell>
          <TableCell>Téléphone</TableCell>
          <TableCell>Adresse email</TableCell>
        </TableRow>
      </TableHead>
      {asmats.length > 0 &&
      <TableBody>
        {asmats.map(asmat => (
          <TableRow key={asmat._id}>
            <TableCell>
              {`${asmat.lastName} ${asmat.firstName}`}
            </TableCell>
            <TableCell>{formatAddress(asmat.address)}</TableCell>
            <TableCell>{asmat.receptions ?? <NotProvided/>}</TableCell>
            <TableCell>{!asmat.availability ?
              <NotProvided feminize/> :
              <Grid container direction="column">
                <Grid item>{`${asmat.availability.baby} bébé${asmat.availability.baby > 1 && 's'}`}</Grid>
                <Grid
                  item>{`${asmat.availability.scholar} périscolaire${asmat.availability.scholar > 1 && 's'}`}</Grid>
              </Grid>
            }</TableCell>
            <TableCell>
              {!asmat.fixPhoneNumber && !asmat.cellPhoneNumber ?
                <NotProvided/> :
                <Grid container direction="column">
                  <Grid item>{asmat.fixPhoneNumber && `Fixe : ${asmat.fixPhoneNumber}`}</Grid>
                  <Grid item>{asmat.cellPhoneNumber && `Portable : ${asmat.cellPhoneNumber}`}</Grid>
                </Grid>
              }
            </TableCell>
            <TableCell>{asmat.email ?? <NotProvided feminize/>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      }
    </Table>
  </TableContainer>
);

export default AsmatsPrintList;
