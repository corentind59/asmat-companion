import { Link, useParams } from 'react-router-dom';
import useAsyncResource from '../../api/hooks/useAsyncResource';
import { getAsmatById } from '../services/resources';
import { Suspense } from 'react';
import AsmatDetails from '../components/business/AsmatDetails';
import { AsmatDetailsSkeleton } from '../components/ui/AsmatDetailsSkeleton';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Alert } from '@material-ui/lab';
import { Box, Button } from '@material-ui/core';

export default function AsmatDetailsPage() {
  const { asmatId } = useParams<{ asmatId: string }>();
  const [asmatReader] = useAsyncResource(getAsmatById, asmatId);

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
          <AsmatDetails asmatReader={asmatReader}/>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
