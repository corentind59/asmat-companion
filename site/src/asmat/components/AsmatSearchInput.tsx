import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Alert from '@material-ui/lab/Alert';
import ButtonProgress from '../../common/components/ButtonProgress';
import { Search } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

type SearchInputValues = {
  query: string;
};

const searchInputSchema: yup.SchemaOf<SearchInputValues> = yup.object().shape({
  query: yup.string().required()
});

type AsmatSearchInputProps = {
  initialQuery: string | null,
  disabled: boolean
  onSubmit: (query: string) => unknown,
};

export default function AsmatSearchInput({ initialQuery, disabled, onSubmit }: AsmatSearchInputProps) {
  const [searchError, setSearchError] = useState<string | null>(null);
  const initialValues: SearchInputValues = {
    query: initialQuery ?? ''
  };
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      onSubmit(values.query);
    },
    validationSchema: searchInputSchema
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField variant="standard"
                     fullWidth
                     size="small"
                     id="query"
                     label="Recherche"
                     placeholder="Rechercher par nom, email, n° de téléphone, etc."
                     name="query"
                     autoFocus
                     value={formik.values.query}
                     onChange={formik.handleChange}
                     disabled={disabled}/>
        </Grid>
        <Grid item xs={2}>
          <ButtonProgress type="submit"
                          variant="contained"
                          fullWidth
                          loading={disabled}
                          color="secondary">
            {() => <Search/>}
          </ButtonProgress>
        </Grid>
      </Grid>
      {searchError && <Alert severity="error">{searchError}</Alert>}
    </form>
  );
}
