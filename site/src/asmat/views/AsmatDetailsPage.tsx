import { Link, useParams } from 'react-router-dom';
import AsmatDetails from '../components/business/AsmatDetails';
import { Alert } from '@material-ui/lab';
import { Box, Button } from '@material-ui/core';
import { AsmatDetailsSkeleton } from '../components/ui/AsmatDetailsSkeleton';
import { Asmat } from '../models/asmat';
import { useAsmatDetailsQueries } from '../hooks/useAsmatDetailsQueries';

export default function AsmatDetailsPage() {
  const { asmatId } = useParams<{ asmatId: string }>();
  const {
    asmat,
    isLoadingAsmat,
    isAsmatQueryError,
    update,
    adhere,
    unsubscribe
  } = useAsmatDetailsQueries(asmatId);
  const handleUpdateAsmat = (asmat: Asmat) => update({ id: asmatId, asmat });
  const handleAdhere = () => adhere(asmatId);
  const handleUnsubscribe = () => unsubscribe(asmatId);

  return (
    <section>
      {isLoadingAsmat ?
        <AsmatDetailsSkeleton/> :
        (isAsmatQueryError ?
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
            <AsmatDetails asmat={asmat!}
                          onUpdate={handleUpdateAsmat}
                          onAdhere={handleAdhere}
                          onUnsubscribe={handleUnsubscribe}/>
        )}
    </section>
  );
}
