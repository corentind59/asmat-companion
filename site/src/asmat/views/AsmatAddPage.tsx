import { Box, Typography } from '@material-ui/core';
import AsmatAddForm from '../components/business/AsmatAddForm';
import { AsmatCreationInput } from '../models/asmat';
import { useMutation } from 'react-query';
import { createAsmat } from '../services/resources';
import { useHistory } from 'react-router-dom';
import { toastSuccess } from '../../common/toast';

export default function AsmatAddPage() {
  const history = useHistory();
  const mutation = useMutation(['addAsmat'], createAsmat, {
    onSuccess(asmat) {
      history.push(`/asmats/${asmat._id}`);
      toastSuccess(`${asmat.firstName} ${asmat.lastName} a été enregistré avec succès.`);
    }
  });
  const handleAddAsmat = (asmat: AsmatCreationInput) => mutation.mutateAsync(asmat);

  return (
    <section>
      <Typography component="h2" variant="h4">
        Enregistrer une nouvelle assistante maternelle
      </Typography>
      <Box marginTop={2}>
        <AsmatAddForm onAdd={handleAddAsmat}/>
      </Box>
    </section>
  );
}
