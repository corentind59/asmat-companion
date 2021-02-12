import { Link, useParams } from 'react-router-dom';
import useAsyncResource from '../../api/hooks/useAsyncResource';
import { getAsmatById, updateAsmatById } from '../services/resources';
import { Suspense, unstable_useTransition as useTransition, useCallback, useState } from 'react';
import AsmatDetails from '../components/business/AsmatDetails';
import { AsmatDetailsSkeleton } from '../components/ui/AsmatDetailsSkeleton';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Alert } from '@material-ui/lab';
import { Box, Button } from '@material-ui/core';
import { Asmat } from '../models/asmat';
import { ApiFunction } from '../../api/types';

export default function AsmatDetailsPage() {
  const { asmatId } = useParams<{ asmatId: string }>();
  const [asmatReader] = useAsyncResource(getAsmatById, asmatId);
  // const [startUpdating, isUpdating] = useTransition();

  const handleAsmatUpdate = (asmatValues: Asmat) => {}
  //   void startUpdating(() => {
  //   setAsmatProvider((id: string) => updateAsmatById(id, asmatValues));
  // });

  return (
    <section>
      <ErrorBoundary fallback={
        <Box maxWidth={600} margin="auto">
          <Alert severity="error"
                 action={
                   <Button component={Link} to="/">
                     Retour au tableau de bord
                   </Button>
                 }>
            Cette page n'existe pas.
          </Alert>
        </Box>
      }>
        <Suspense fallback={<AsmatDetailsSkeleton/>}>
          <AsmatDetails asmatReader={asmatReader}
                        onUpdate={handleAsmatUpdate}/>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
