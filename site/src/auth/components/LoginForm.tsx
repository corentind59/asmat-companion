import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

export type LoginFormValues = {
  username: string;
  password: string;
};

const loginFormSchema: yup.SchemaOf<LoginFormValues> = yup.object().shape({
  username: yup.string()
    .required('Le nom d\'utilisateur est requis.'),
  password: yup.string()
    .required('Le mot de passe est requis.')
});

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => unknown
};

export default function LoginForm(props: LoginFormProps) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const initialValues: LoginFormValues = {
    username: '',
    password: ''
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);
      try {
        await props.onSubmit(values);
      } catch (e: any) {
        setAuthError(e?.message || 'Une erreur inattendue est survenue. Réessayer plus tard ou contacter un administrateur.');
      }
      formikHelpers.setFieldValue('password', '', false);
      setLoading(false);
    },
    validationSchema: loginFormSchema
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
      <TextField variant="outlined"
                 margin="normal"
                 fullWidth
                 id="email"
                 label="Nom d'utilisateur ou adresse mail"
                 name="username"
                 autoComplete="email"
                 autoFocus
                 value={formik.values.username}
                 onChange={formik.handleChange}
                 error={formik.touched.username && !!formik.errors.username}
                 helperText={formik.touched.username && formik.errors.username}
                 disabled={isLoading}/>
      <TextField variant="outlined"
                 margin="normal"
                 fullWidth
                 name="password"
                 label="Mot de passe"
                 type="password"
                 id="password"
                 autoComplete="current-password"
                 value={formik.values.password}
                 onChange={formik.handleChange}
                 error={formik.touched.password && !!formik.errors.password}
                 helperText={formik.touched.password && formik.errors.password}
                 disabled={isLoading}/>
      { authError && <Alert severity="error">{authError}</Alert>}
      <Button type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              className={classes.submit}>
        {isLoading ? 'Connexion...' : 'Se connecter'}
        {isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Mot de passe oublié ?
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
