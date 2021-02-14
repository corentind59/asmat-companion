import { FC } from 'react';
import { useFormik } from 'formik';
import { AsmatCreationValues } from '../../models/asmat-form';
import * as yup from 'yup';
import AsmatIdentityCard from './AsmatIdentityCard';
import { Box, Grid } from '@material-ui/core';
import ButtonProgress from '../../../common/components/ButtonProgress';
import { Add } from '@material-ui/icons';
import { Asmat, AsmatInput } from '../../models/asmat';
import AsmatContactCard from './AsmatContactCard';
import { TEL_VALIDATOR } from '../../../common/validators';
import { fromAsmatCreationValues } from '../../services/behaviors';

const asmatCreationSchema: yup.SchemaOf<AsmatCreationValues> = yup.object().shape({
  firstName: yup.string().required('Le prénom est requis.'),
  lastName: yup.string().required('Le nom est requis.'),
  addressStreet: yup.string().required('L\'adresse est requise.'),
  addressComplement: yup.string().ensure(),
  addressZipCode: yup.string().required('Le code postal est requis.'),
  addressCity: yup.string().required('La commune est requise.'),
  addressZone: yup.string().ensure(),
  email: yup.string().ensure().email('Le format de l\'adresse mail est invalide.'),
  cellPhoneNumber: yup.string().ensure().notRequired()
    .matches(TEL_VALIDATOR, { message: 'Le format du numéro est invalide.', excludeEmptyString: true })
    .test('onePhoneRequired',
      'Un numéro de téléphone doit être fourni.',
      function () {
        return this.parent.cellPhoneNumber || this.parent.fixPhoneNumber;
      }),
  fixPhoneNumber: yup.string().ensure().notRequired()
    .matches(TEL_VALIDATOR, { message: 'Le format du numéro est invalide.', excludeEmptyString: true })
    .test('onePhoneRequired',
      'Un numéro de téléphone doit être fourni.',
      function () {
        return this.parent.cellPhoneNumber || this.parent.fixPhoneNumber;
      })
});

type Props = {
  onAdd: (asmat: AsmatInput) => unknown
};

const AsmatAddForm: FC<Props> = ({ onAdd }) => {
  const initialValues: AsmatCreationValues = {
    firstName: '',
    lastName: '',
    addressStreet: '',
    addressComplement: '',
    addressZipCode: '',
    addressCity: '',
    addressZone: '',
    email: '',
    fixPhoneNumber: '',
    cellPhoneNumber: ''
  };
  const formik = useFormik({
    initialValues,
    async onSubmit(values) {
      await onAdd(fromAsmatCreationValues(values));
    },
    validateOnBlur: true,
    validationSchema: asmatCreationSchema
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container direction="column" alignItems="stretch" spacing={2}>
        <Grid item>
          <AsmatIdentityCard values={formik.values}
                             onChange={formik.handleChange}
                             touched={formik.touched}
                             errors={formik.errors}
                             disabled={formik.isSubmitting}/>
        </Grid>
        <Grid item>
          <AsmatContactCard values={formik.values}
                            onChange={formik.handleChange}
                            touched={formik.touched}
                            errors={formik.errors}
                            disabled={formik.isSubmitting}/>
        </Grid>
      </Grid>
      <Box marginTop={1}>
        <Grid container justify="flex-end" alignItems="center">
          <ButtonProgress loading={formik.isSubmitting}
                          type="submit"
                          variant="contained"
                          color="secondary"
                          startIcon={<Add/>}>
            {({ loading }) => loading ? 'Ajout...' : 'Ajouter'}
          </ButtonProgress>
        </Grid>
      </Box>
    </form>
  );
};

export default AsmatAddForm;
