import { FC } from 'react';
import { Grid, MenuItem, Theme, useMediaQuery } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { ClockOutline } from 'mdi-material-ui';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import AsmatCard from '../ui/AsmatCard';
import { makeStyles } from '@material-ui/core/styles';
import { AsmatUpdateValues } from '../../models/asmat-form';
import { numberOrBlank } from '../../../common/form-control';

const useStyles = makeStyles(theme => ({
  formGroup: {
    marginBottom: theme.spacing(4)
  }
}));

type AsmatAvailabilityValues = Pick<AsmatUpdateValues, 'receptions'
  | 'availabilityCommunicated'
  | 'availabilityBaby'
  | 'availabilityScholar'>;

type Props = {
  values: AsmatAvailabilityValues,
  onChange: (ReturnType<typeof useFormik>)['handleChange'],
  touched: FormikTouched<AsmatAvailabilityValues>,
  errors: FormikErrors<AsmatAvailabilityValues>,
  readOnly: boolean,
  disabled: boolean
};

const availabilityCommunicatedOptions = [
  {
    label: 'Non communiquée',
    value: false
  },
  {
    label: 'Communiquée',
    value: true
  }
];

const AsmatAvailabilityCard: FC<Props> = ({ values, onChange, touched, errors, readOnly, disabled }) => {
  const classes = useStyles();
  const lgOrUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  return (
    <AsmatCard title="Disponibilité" icon={<ClockOutline/>}>
      <Grid container alignItems="center" spacing={1} className={classes.formGroup}>
        <Grid item xs={8} md={5}>
          <TextField variant="standard"
                     fullWidth
                     id="receptions"
                     label="Nombre d'accueils"
                     name="receptions"
                     value={numberOrBlank(values.receptions)}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.receptions && errors.receptions}
                     error={touched.receptions && !!errors.receptions}
                     InputProps={{ readOnly }}
                     type="number"/>
        </Grid>
      </Grid>
      <Grid container alignItems="flex-start" spacing={1}>
        <Grid item xs={12} lg={7}>
          <TextField variant="standard"
                     fullWidth
                     select
                     id="availabilityCommunicated"
                     label="Disponibilité"
                     name="availabilityCommunicated"
                     value={+values.availabilityCommunicated}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.availabilityCommunicated && errors.availabilityCommunicated}
                     error={touched.availabilityCommunicated && !!errors.availabilityCommunicated}
                     InputProps={{ readOnly }}>
            {availabilityCommunicatedOptions.map(option => (
              <MenuItem key={+option.value} value={+option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} lg={5} container direction={lgOrUp ? 'column' : 'row'} spacing={1}>
          <Grid item xs={6} sm={4} lg={12}>
            <TextField variant="standard"
                       fullWidth
                       id="availabilityBaby"
                       label="Bébé(s)"
                       name="availabilityBaby"
                       value={numberOrBlank(values.availabilityBaby)}
                       onChange={onChange}
                       InputProps={{ readOnly }}
                       disabled={!values.availabilityCommunicated || disabled}
                       helperText={touched.availabilityBaby && errors.availabilityBaby}
                       error={touched.availabilityBaby && !!errors.availabilityBaby}
                       type="number"/>
          </Grid>
          <Grid item xs={6} sm={4} lg={12}>
            <TextField variant="standard"
                       fullWidth
                       id="availabilityScholar"
                       label="Périscolaire(s)"
                       name="availabilityScholar"
                       value={numberOrBlank(values.availabilityScholar)}
                       onChange={onChange}
                       InputProps={{ readOnly }}
                       disabled={!values.availabilityCommunicated || disabled}
                       helperText={touched.availabilityScholar && errors.availabilityScholar}
                       error={touched.availabilityScholar && !!errors.availabilityScholar}
                       type="number"/>
          </Grid>
        </Grid>
      </Grid>
    </AsmatCard>
  );
};

export default AsmatAvailabilityCard;
