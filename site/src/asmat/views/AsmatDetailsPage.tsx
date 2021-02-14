import { Link, useParams } from 'react-router-dom';
import AsmatDetails from '../components/business/AsmatDetails';
import { Alert } from '@material-ui/lab';
import { Box, Button } from '@material-ui/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { adhereById, getAsmatById, updateAsmatById } from '../services/resources';
import { AsmatDetailsSkeleton } from '../components/ui/AsmatDetailsSkeleton';
import { Asmat } from '../models/asmat';
import { toastError, toastSuccess } from '../../common/toast';

export default function AsmatDetailsPage() {
  const { asmatId } = useParams<{ asmatId: string }>();
  const queryClient = useQueryClient();
  const { isLoading, isError: isQueryError, data } = useQuery(['asmat', asmatId], () => getAsmatById(asmatId));
  const { mutateAsync: update } = useMutation(['updateAsmat', asmatId], updateAsmatById, {
    onSuccess(updatedAsmat) {
      queryClient.setQueryData(['asmat', asmatId], updatedAsmat);
      toastSuccess('L’assistante maternelle a été mise à jour.');
    },
    onError(error) {
      toastError('La modification de l\'assistante maternelle a échouée. Veuillez réessayer plus tard.');
      console.error(error);
    }
  });
  const { mutateAsync: adhere } = useMutation(['adhere', asmatId], adhereById, {
    onSuccess(updatedAsmat) {
      queryClient.setQueryData(['asmat', asmatId], updatedAsmat);
      toastSuccess('L’assistante maternelle a été mise à jour.');
    },
    onError(error) {
      toastError('L\'adhésion de l\'assistante maternelle a échouée. Veuillez réessayer plus tard.');
      console.error(error);
    }
  });
  const handleUpdateAsmat = (asmat: Asmat) => update({ id: asmatId, asmat });
  const handleAdhere = () => adhere(asmatId);

  return (
    <section>
      {isLoading ?
        <AsmatDetailsSkeleton/> :
        (isQueryError ?
            <Box maxWidth={600} margin="auto">
              <Alert severity="error"
                     action={
                       <Button component={Link} to="/">
                         Retour au tableau de bord
                       </Button>
                     }>
                Cette page n'existe pas.
              </Alert>
            </Box> :
            <AsmatDetails asmat={data!}
                          onUpdate={handleUpdateAsmat}
                          onAdhere={handleAdhere}/>
        )}
    </section>
  );
}