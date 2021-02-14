import { FC } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import { Home, MailOutline, Phone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { At, Cellphone } from 'mdi-material-ui';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import AsmatCard from '../ui/AsmatCard';
import { AsmatUpdateValues } from '../../models/asmat-form';

const useStyles = makeStyles(theme => ({
  formGroup: {
    marginBottom: theme.spacing(4)
  }
}));

type AsmatContactValues = Pick<AsmatUpdateValues, 'addressStreet'
  | 'addressComplement'
  | 'addressZipCode'
  | 'addressCity'
  | 'addressZone'
  | 'email'
  | 'cellPhoneNumber'
  | 'fixPhoneNumber'>;

type Props = {
  values: AsmatContactValues,
  onChange: (ReturnType<typeof useFormik>)['handleChange'],
  touched: FormikTouched<AsmatContactValues>,
  errors: FormikErrors<AsmatContactValues>,
  readOnly?: boolean,
  disabled: boolean,
};

const AsmatContactCard: FC<Props> = ({ values, onChange, touched, errors, readOnly, disabled }) => {
  const classes = useStyles();
  return (
    <AsmatCard title="Contact" icon={<MailOutline/>}>
      <Grid container alignItems="center" spacing={1} className={classes.formGroup}>
        <Grid item xs={12}>
          <TextField variant="standard"
                     fullWidth
                     multiline
                     id="addressStreet"
                     label="Adresse"
                     placeholder="N° et libellé de voie"
                     name="addressStreet"
                     value={values.addressStreet}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.addressStreet && errors.addressStreet}
                     error={touched.addressStreet && !!errors.addressStreet}
                     InputProps={{
                       readOnly,
                       startAdornment: (
                         <InputAdornment position="start"><Home/></InputAdornment>
                       )
                     }}/>
        </Grid>
        <Grid item xs={12}>
          <TextField variant="standard"
                     fullWidth
                     multiline
                     size="small"
                     id="addressComplement"
                     label="Complément d'adresse"
                     name="addressComplement"
                     value={values.addressComplement}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.addressComplement && errors.addressComplement}
                     error={touched.addressComplement && !!errors.addressComplement}
                     InputProps={{ readOnly }}/>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <TextField variant="standard"
                     fullWidth
                     id="addressZipCode"
                     label="Code postal"
                     name="addressZipCode"
                     value={values.addressZipCode}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.addressZipCode && errors.addressZipCode}
                     error={touched.addressZipCode && !!errors.addressZipCode}
                     InputProps={{ readOnly }}/>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField variant="standard"
                     fullWidth
                     id="addressCity"
                     label="Commune"
                     name="addressCity"
                     value={values.addressCity}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.addressCity && errors.addressCity}
                     error={touched.addressCity && !!errors.addressCity}
                     InputProps={{ readOnly }}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField variant="standard"
                     fullWidth
                     id="addressZone"
                     label="Zone"
                     name="addressZone"
                     value={values.addressZone}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.addressZone && errors.addressZone}
                     error={touched.addressZone && !!errors.addressZone}
                     InputProps={{ readOnly }}/>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={1} className={classes.formGroup}>
        <Grid item xs={12} md={10} lg={8}>
          <TextField variant="standard"
                     fullWidth
                     id="email"
                     label="Adresse mail"
                     name="email"
                     type="mail"
                     value={values.email}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.email && errors.email}
                     error={touched.email && !!errors.email}
                     InputProps={{
                       readOnly,
                       startAdornment: (
                         <InputAdornment position="start"><At fontSize="small"/></InputAdornment>
                       )
                     }}/>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} md={6} lg={5}>
          <TextField variant="standard"
                     fullWidth
                     id="fixPhoneNumber"
                     label="Téléphone fixe"
                     name="fixPhoneNumber"
                     type="tel"
                     value={values.fixPhoneNumber}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.fixPhoneNumber && errors.fixPhoneNumber}
                     error={touched.fixPhoneNumber && !!errors.fixPhoneNumber}
                     InputProps={{
                       readOnly,
                       startAdornment: (
                         <InputAdornment position="start"><Phone/></InputAdornment>
                       )
                     }}/>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <TextField variant="standard"
                     fullWidth
                     id="cellPhoneNumber"
                     label="Téléphone portable"
                     name="cellPhoneNumber"
                     type="tel"
                     value={values.cellPhoneNumber}
                     onChange={onChange}
                     disabled={disabled}
                     helperText={touched.cellPhoneNumber && errors.cellPhoneNumber}
                     error={touched.cellPhoneNumber && !!errors.cellPhoneNumber}
                     InputProps={{
                       readOnly,
                       startAdornment: (
                         <InputAdornment position="start"><Cellphone/></InputAdornment>
                       )
                     }}/>
        </Grid>
      </Grid>
    </AsmatCard>
  );
};

export default AsmatContactCard;
