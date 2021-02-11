import { FC, useState } from 'react';
import * as yup from 'yup';
import { DataReader } from '../../../api/types';
import { Asmat } from '../../models/asmat';
import { Button, Fade, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import AsmatContactCard from './AsmatContactCard';
import { TEL_VALIDATOR } from '../../../common/components/validators';
import { useFormik } from 'formik';
import AsmatAvailabilityCard from './AsmatAvailabilityCard';
import { Save } from '@material-ui/icons';

export type AsmatDetailsValues = {
  addressStreet: string;
  addressComplement?: string;
  addressZipCode: string;
  addressCity: string;
  addressZone?: string;
  email?: string;
  cellPhoneNumber?: string;
  fixPhoneNumber?: string;
  receptions?: number;
  availabilityCommunicated: boolean;
  availabilityBaby?: number;
  availabilityScholar?: number;
};

const asmatDetailsSchema: yup.SchemaOf<AsmatDetailsValues> = yup.object().shape({
  addressStreet: yup.string().required('L\'adresse est requise.'),
  addressComplement: yup.string().optional(),
  addressZipCode: yup.string().required('Le code postal est requis.'),
  addressCity: yup.string().required('La commune est requise.'),
  addressZone: yup.string().optional(),
  email: yup.string().optional().email('Le format de l\'adresse mail est invalide.'),
  cellPhoneNumber: yup.string().optional().matches(TEL_VALIDATOR, 'Le format du numéro est invalide.'),
  fixPhoneNumber: yup.string().optional().matches(TEL_VALIDATOR, 'Le format du numéro est invalide.'),
  receptions: yup.number().optional().positive('Le nombre d\'accueils doit être positif.'),
  availabilityCommunicated: yup.boolean().required(),
  availabilityBaby: yup.number().optional().positive('La disponibilité doit être positive.'),
  availabilityScholar: yup.number().optional().positive('La disponibilité doit être positive.')
});

type Props = {
  asmatReader: DataReader<Asmat>
};

const AsmatDetails: FC<Props> = ({ asmatReader }) => {
  const asmat = asmatReader.read();
  const [readOnly, setReadOnly] = useState(true);
  const initialValues: AsmatDetailsValues = {
    addressStreet: asmat.address.street,
    addressComplement: asmat.address.complement ?? '',
    addressZipCode: asmat.address.zipCode,
    addressCity: asmat.address.city,
    addressZone: asmat.address.zone ?? '',
    email: asmat.email ?? '',
    cellPhoneNumber: asmat.cellPhoneNumber ?? '',
    fixPhoneNumber: asmat.fixPhoneNumber ?? '',
    receptions: asmat.receptions ?? 0,
    availabilityCommunicated: !!asmat.availability,
    availabilityBaby: asmat.availability?.baby,
    availabilityScholar: asmat.availability?.scholar
  };
  const formik = useFormik({
    initialValues,
    onSubmit(values) {

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
    <Grid container direction="column" alignItems="stretch" spacing={3}>
      <Grid item container justify="space-between" alignItems="center" wrap="nowrap">
        <Grid item>
          <Typography component="h2" variant="h4">
            {asmat.lastName} {asmat.firstName}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Fade in={!readOnly}>
              <Button type="submit"
                      variant="contained"
                      color="secondary"
                      startIcon={<Save/>}>
                Sauvegarder
              </Button>
            </Fade>
            <FormControlLabel label="Mode édition : "
                              labelPlacement="start"
                              control={
                                <Switch checked={!readOnly}
                                        onChange={handleReadOnlySwitchToggled}/>
                              }/>
          </Grid>
        </Grid>
      </Grid>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid container alignItems="stretch" wrap="wrap" spacing={2}>
          <Grid item sm={12} lg={7}>
            <AsmatContactCard values={formik.values}
                              onChange={formik.handleChange}
                              readOnly={readOnly}/>
          </Grid>
          <Grid item sm={12} lg={5}>
            <AsmatAvailabilityCard values={formik.values}
                                   onChange={formik.handleChange}
                                   readOnly={readOnly}/>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default AsmatDetails;
