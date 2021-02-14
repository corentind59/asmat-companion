import { FC } from 'react';
import { Grid } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import AsmatCard from '../ui/AsmatCard';
import { AsmatCreationValues } from '../../models/asmat-form';

type Props = {
  values: AsmatCreationValues,
  onChange: (ReturnType<typeof useFormik>)['handleChange'],
  touched: FormikTouched<AsmatCreationValues>,
  errors: FormikErrors<AsmatCreationValues>,
  disabled: boolean,
};

const AsmatContactCard: FC<Props> = ({ values, onChange, touched, errors, disabled }) => (
  <AsmatCard title="Identité" icon={<PersonAdd/>}>
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={12} lg={6}>
        <TextField variant="standard"
                   fullWidth
                   multiline
                   id="firstName"
                   label="Prénom"
                   name="firstName"
                   value={values.firstName}
                   onChange={onChange}
                   disabled={disabled}
                   helperText={touched.firstName && errors.firstName}
                   error={touched.firstName && !!errors.firstName}/>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField variant="standard"
                   fullWidth
                   multiline
                   id="lastName"
                   label="Nom"
                   name="lastName"
                   value={values.lastName}
                   onChange={onChange}
                   disabled={disabled}
                   helperText={touched.lastName && errors.lastName}
                   error={touched.lastName && !!errors.lastName}/>
      </Grid>
    </Grid>
  </AsmatCard>
);

export default AsmatContactCard;
