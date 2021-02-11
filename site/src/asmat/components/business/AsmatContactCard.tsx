import { FC } from 'react';
import { Grid, InputAdornment } from '@material-ui/core';
import { Home, MailOutline, Phone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { At, Cellphone } from 'mdi-material-ui';
import { AsmatDetailsValues } from './AsmatDetails';
import { useFormik } from 'formik';
import AsmatCard from '../ui/AsmatCard';

const useStyles = makeStyles(theme => ({
  formGroup: {
    marginBottom: theme.spacing(4)
  }
}));

type Props = {
  values: Pick<AsmatDetailsValues, 'addressStreet'
    | 'addressComplement'
    | 'addressZipCode'
    | 'addressCity'
    | 'addressZone'
    | 'email'
    | 'cellPhoneNumber'
    | 'fixPhoneNumber'>,
  onChange: (ReturnType<typeof useFormik>)['handleChange'],
  readOnly: boolean
};

const AsmatContactCard: FC<Props> = ({ values, onChange, readOnly }) => {
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
                     value={values.email}
                     onChange={onChange}
                     type="mail"
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
                     value={values.fixPhoneNumber}
                     onChange={onChange}
                     type="tel"
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
                     value={values.cellPhoneNumber}
                     onChange={onChange}
                     type="tel"
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
