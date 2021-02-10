import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import AsmatSearchInput from '../components/AsmatSearchInput';
import { makeStyles } from '@material-ui/core/styles';
import { Suspense, unstable_useTransition as useTransition, useEffect } from 'react';
import AsmatsList from '../components/AsmatsList';
import { searchAsmats } from '../services/resources';
import useLazyAsyncResource from '../../api/hooks/useLazyAsyncResource';
import { useHistory } from 'react-router-dom';
import useQueryParams from '../../common/hooks/useQueryParams';
import Alert from '@material-ui/lab/Alert';
import ErrorBoundary from '../../common/components/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  searchInput: {
    marginTop: theme.spacing(2)
  }
}));

export default function AsmatSearchPage() {
  const classes = useStyles();
  const history = useHistory();
  const queryParams = useQueryParams();
  const query = queryParams.get('q');
  const [asmatsSummaryReader, updateAsmatsSummaryReader] = useLazyAsyncResource(searchAsmats);
  const [startSearching, isSearching] = useTransition();
  useEffect(() => {
    if (query) {
      startSearching(() => {
        updateAsmatsSummaryReader(query);
      });
    }
  }, [query]);
  const handleSearchAsmats = (query: string) => history.push({ search: `q=${encodeURIComponent(query)}` });

  return (
    <section>
      <Typography component="h2" variant="h5">
        Rechercher une assistante maternelle
      </Typography>
      <Grid container justify="center" className={classes.searchInput}>
        <Grid item xs={8}>
          <AsmatSearchInput initialQuery={query}
                            disabled={isSearching}
                            onSubmit={handleSearchAsmats}/>
        </Grid>
      </Grid>
      <Box paddingTop={2}>
        {isSearching && <LinearProgress color="secondary"/>}
        <ErrorBoundary fallback={
          <Alert severity="error">Une erreur inattendue est survenue. Réessayez plus tard.</Alert>
        }>
          <Suspense fallback={null}>
            <AsmatsList asmatsSummaryReader={asmatsSummaryReader}/>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </section>
  );
}
