import { useQuery } from 'react-query';
import { DateTime } from 'luxon';
import { getAsmatsByAdhesionEndDateBefore } from '../services/resources';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AsmatRemindList from '../components/business/AsmatRemindList';

export default function AsmatRemindsPage() {
  const maxAdhesionDate = DateTime.utc().plus({ month: 1 });
  const {
    isLoading: isLoadingAsmats,
    isError: isAsmatError,
    data: asmats
  } = useQuery('getAsmatsByAdhesionEndDate', () => getAsmatsByAdhesionEndDateBefore(maxAdhesionDate));

  return (
    <section>
      <Typography component="h2" variant="h4">
        Rappels d'adhésion
      </Typography>
      <Box paddingTop={2}>
        {isLoadingAsmats ?
        <LinearProgress/> :
        (isAsmatError ?
            <Box maxWidth={600} margin="auto">
              <Alert severity="error">
                Une erreur inattendue est survenue. Réessayez plus tard.
              </Alert>
            </Box> :
            <AsmatRemindList asmats={asmats!}/>
        )}
      </Box>
    </section>
  );
}
