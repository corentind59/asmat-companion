import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ButtonProgress from '../../common/components/ButtonProgress';

export type NewPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  passwordRequirementListItem: {
    paddingBottom: 0,
    paddingTop: 0
  }
}));

type NewPasswordFormProps = {
  onSubmit: (password: string) => unknown
};

const getValidPasswordRequirements = (password: string) => ({
  length: password.length >= 8,
  lowerChar: !!password.match(/[a-z]/),
  upperChar: !!password.match(/[A-Z]/),
  digit: !!password.match(/\d/)
});
const requirementsLabels: { [K in keyof ReturnType<typeof getValidPasswordRequirements>]: string; } = {
  length: 'minimum 8 caractères',
  lowerChar: 'minimum 1 lettre minuscule',
  upperChar: 'minimum 1 lettre majuscule',
  digit: 'minimum 1 chiffre'
};

export default function NewPasswordForm(props: NewPasswordFormProps) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const initialValues: NewPasswordFormValues = {
    password: '',
    confirmPassword: ''
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);
      try {
        await props.onSubmit(values.password);
      } catch (e: any) {
        setAuthError(e?.message || 'Une erreur inattendue est survenue. Réessayer plus tard ou contacter un administrateur.');
      }
      formikHelpers.setValues(initialValues, false);
      setLoading(false);
    },
    validate: values => {
      const requirements = getValidPasswordRequirements(values.password);
      if (Object.values(requirements).some(isValid => !isValid)) {
        return {
          password: 'Le mot de passe ne remplit pas les critères'
        };
      }
      if (values.password !== values.confirmPassword) {
        return {
          confirmPassword: 'Les mots de passe ne correspondent pas'
        };
      }
    }
  });
  const requirements = getValidPasswordRequirements(formik.values.password);

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
      <Typography variant="subtitle1">Le mot de passe doit contenir :</Typography>
      <List disablePadding>
        {Object.keys(requirements).map((req) => (
          <ListItem key={req} className={classes.passwordRequirementListItem}>
            <ListItemIcon>
              <Checkbox edge="start"
                        readOnly
                        checked={requirements[req as keyof typeof requirements]}
                        tabIndex={-1}
                        disableRipple/>
            </ListItemIcon>
            <ListItemText primary={requirementsLabels[req as keyof typeof requirementsLabels]}/>
          </ListItem>
        ))}
      </List>
      <TextField variant="outlined"
                 margin="normal"
                 fullWidth
                 name="password"
                 label="Nouveau mot de passe"
                 type="password"
                 autoComplete="off"
                 value={formik.values.password}
                 onChange={formik.handleChange}
                 error={formik.touched.password && !!formik.errors.password}
                 helperText={formik.touched.password && formik.errors.password}
                 disabled={isLoading}/>
      <TextField variant="outlined"
                 margin="normal"
                 fullWidth
                 name="confirmPassword"
                 label="Confirmer le mot de passe"
                 type="password"
                 autoComplete="off"
                 value={formik.values.confirmPassword}
                 onChange={formik.handleChange}
                 error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                 helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                 disabled={isLoading}/>
      {authError && <Alert severity="error">{authError}</Alert>}
      <ButtonProgress type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      loading={isLoading}
                      className={classes.submit}>
        {({ loading }) => loading ? 'Changement en cours...' : 'Changer le mot de passe'}
      </ButtonProgress>
    </form>
  );
}
