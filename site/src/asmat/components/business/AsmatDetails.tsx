import { FC, useState } from 'react';
import * as yup from 'yup';
import { Asmat } from '../../models/asmat';
import { FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import AsmatContactCard from './AsmatContactCard';
import { TEL_VALIDATOR } from '../../../common/validators';
import { useFormik } from 'formik';
import AsmatAvailabilityCard from './AsmatAvailabilityCard';
import { Save } from '@material-ui/icons';
import { AsmatDetailsValues } from '../../models/asmat-form';
import ButtonProgress from '../../../common/components/ButtonProgress';
import { fromAsmatDetailsValues, toAsmatDetailsValues } from '../../services/behaviors';

const asmatDetailsSchema: yup.SchemaOf<AsmatDetailsValues> = yup.object().shape({
  addressStreet: yup.string().required('L\'adresse est requise.'),
  addressComplement: yup.string().optional(),
  addressZipCode: yup.string().required('Le code postal est requis.'),
  addressCity: yup.string().required('La commune est requise.'),
  addressZone: yup.string().optional(),
  email: yup.string().optional().email('Le format de l\'adresse mail est invalide.'),
  cellPhoneNumber: yup.string().optional().matches(TEL_VALIDATOR, 'Le format du numéro est invalide.'),
  fixPhoneNumber: yup.string().optional().matches(TEL_VALIDATOR, 'Le format du numéro est invalide.'),
  receptions: yup.number().optional().min(0, 'Le nombre d\'accueils doit être positif.'),
  availabilityCommunicated: yup.boolean().required(),
  availabilityBaby: yup.number().optional().min(0, 'La disponibilité doit être positive.'),
  availabilityScholar: yup.number().optional().min(0, 'La disponibilité doit être positive.')
});

type Props = {
  asmat: Asmat,
  onUpdate: (updatedAsmat: Asmat) => unknown
};

const AsmatDetails: FC<Props> = ({ asmat, onUpdate }) => {
  const [readOnly, setReadOnly] = useState(true);
  const initialValues: AsmatDetailsValues = toAsmatDetailsValues(asmat);
  const formik = useFormik({
    initialValues,
    async onSubmit(values) {
      await onUpdate({
        ...asmat,
        ...fromAsmatDetailsValues(values)
      });
      setReadOnly(true);
    },
    validationSchema: asmatDetailsSchema
  });
  const handleReadOnlySwitchToggled = () => {
    if (readOnly) {
      return void setReadOnly(false);
    }
    formik.resetForm();
    setReadOnly(true);
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container direction="column" alignItems="stretch" spacing={3}>
        <Grid item container justify="space-between" alignItems="center" wrap="nowrap">
          <Grid item>
            <Typography component="h2" variant="h4">
              {asmat.lastName} {asmat.firstName}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <ButtonProgress type="submit"
                              disabled={readOnly}
                              loading={formik.isSubmitting}
                              variant="contained"
                              color="secondary"
                              startIcon={<Save/>}>
                {({ loading }) => loading ? 'Sauvegarde...' : 'Sauvegarder'}
              </ButtonProgress>
              <FormControlLabel label="Mode édition : "
                                labelPlacement="start"
                                control={
                                  <Switch checked={!readOnly}
                                          onChange={handleReadOnlySwitchToggled}/>
                                }/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems="stretch" wrap="wrap" spacing={2}>
          <Grid item sm={12} lg={7}>
            <AsmatContactCard values={formik.values}
                              onChange={formik.handleChange}
                              readOnly={readOnly}
                              disabled={formik.isSubmitting}/>
          </Grid>
          <Grid item sm={12} lg={5}>
            <AsmatAvailabilityCard values={formik.values}
                                   onChange={formik.handleChange}
                                   readOnly={readOnly}
                                   disabled={formik.isSubmitting}/>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AsmatDetails;
