import { useMutation, useQuery, useQueryClient } from 'react-query';
import QueryKeys from '../../api/query-keys';
import { adhereById, getAsmatById, unsubscribeById, updateAsmatById } from '../services/resources';
import { toastError, toastSuccess } from '../../common/toast';
import { Asmat } from '../models/asmat';

export function useAsmatDetailsQueries(asmatId: string) {
  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingAsmat,
    isError: isAsmatQueryError,
    data: asmat
  } = useQuery(QueryKeys.GET_ASMAT_BY_ID(asmatId), () => getAsmatById(asmatId));

  const handleSuccess = (updatedAsmat: Asmat) => {
    queryClient.resetQueries(QueryKeys.ALL_ASMATS)
      .then(() => queryClient.setQueryData(QueryKeys.GET_ASMAT_BY_ID(asmatId), updatedAsmat));
    toastSuccess('L’assistante maternelle a été mise à jour.');
  };
  const handleError = (error: unknown) => {
    toastError('La modification de l\'assistante maternelle a échouée. Veuillez réessayer plus tard.');
    console.error(error);
  };

  const { mutateAsync: update } = useMutation(QueryKeys.UPDATE_ASMAT(asmatId), updateAsmatById, {
    onSuccess: handleSuccess,
    onError: handleError
  });
  const { mutateAsync: adhere } = useMutation(QueryKeys.UPDATE_ASMAT_ADHESION(asmatId), adhereById, {
    onSuccess: handleSuccess,
    onError: handleError
  });
  const { mutateAsync: unsubscribe } = useMutation(QueryKeys.UPDATE_ASMAT_UNSUBSCRIPTION(asmatId), unsubscribeById, {
    onSuccess: handleSuccess,
    onError: handleError
  });

  return {
    asmat,
    isLoadingAsmat,
    isAsmatQueryError,
    update,
    adhere,
    unsubscribe
  };
}
