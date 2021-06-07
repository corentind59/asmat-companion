import { Link, useParams } from 'react-router-dom';
import AsmatDetails from '../components/business/AsmatDetails';
import { Alert } from '@material-ui/lab';
import { Box, Button } from '@material-ui/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { adhereById, getAsmatById, updateAsmatById } from '../services/resources';
import { AsmatDetailsSkeleton } from '../components/ui/AsmatDetailsSkeleton';
import { Asmat } from '../models/asmat';
import { toastError, toastSuccess } from '../../common/toast';
import QueryKeys from '../../api/query-keys';

export default function AsmatDetailsPage() {
  const { asmatId } = useParams<{ asmatId: string }>();
  const queryClient = useQueryClient();
  const { isLoading, isError: isQueryError, data } = useQuery(QueryKeys.GET_ASMAT_BY_ID(asmatId), () => getAsmatById(asmatId));
  const { mutateAsync: update } = useMutation(QueryKeys.UPDATE_ASMAT(asmatId), updateAsmatById, {
    onSuccess(updatedAsmat) {
      queryClient.resetQueries(QueryKeys.ALL_ASMATS)
        .then(() => queryClient.setQueryData(QueryKeys.GET_ASMAT_BY_ID(asmatId), updatedAsmat));
      toastSuccess('L’assistante maternelle a été mise à jour.');
    },
    onError(error) {
      toastError('La modification de l\'assistante maternelle a échouée. Veuillez réessayer plus tard.');
      console.error(error);
    }
  });
  const { mutateAsync: adhere } = useMutation(QueryKeys.UPDATE_ASMAT_ADHESION(asmatId), adhereById, {
    onSuccess(updatedAsmat) {
      queryClient.resetQueries(QueryKeys.ALL_ASMATS)
        .then(() => queryClient.setQueryData(QueryKeys.GET_ASMAT_BY_ID(asmatId), updatedAsmat));
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
