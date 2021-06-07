import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import AsmatSearchInput from '../components/ui/AsmatSearchInput';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useQueryParams from '../../common/hooks/useQueryParams';
import { useQuery } from 'react-query';
import { searchAsmats } from '../services/resources';
import { Alert } from '@material-ui/lab';
import AsmatsList from '../components/business/AsmatsList';
import QueryKeys from '../../api/query-keys';

const useStyles = makeStyles(theme => ({
  searchInput: {
    marginTop: theme.spacing(2)
  }
}));

export default function AsmatSearchPage() {
  const classes = useStyles();
  const history = useHistory();
  const queryParams = useQueryParams();
  const searchQuery = queryParams.get('q');
  const {
    isLoading,
    isError,
    data
  } = useQuery(QueryKeys.GET_ASMATS_BY_QUERY(searchQuery || ''), () => searchQuery ? searchAsmats(searchQuery) : []);
  const handleSearchAsmats = (query: string) => history.push({ search: `q=${encodeURIComponent(query)}` });

  return (
    <section>
      <Typography component="h2" variant="h4">
        Rechercher une assistante maternelle
      </Typography>
      <Grid container justify="center" className={classes.searchInput}>
        <Grid item xs={8}>
          <AsmatSearchInput initialQuery={searchQuery}
                            disabled={isLoading}
                            onSubmit={handleSearchAsmats}/>
        </Grid>
      </Grid>
      <Box paddingTop={2}>
        {isLoading ?
          <LinearProgress color="secondary"/> :
          isError ?
            <Alert severity="error">Une erreur inattendue est survenue. Réessayez plus tard.</Alert> :
            searchQuery && (
              <AsmatsList asmats={data!}/>
            )
        }
      </Box>
    </section>
  );
}
