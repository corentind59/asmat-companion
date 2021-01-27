import Typography from '@material-ui/core/Typography';
import LoginForm, { LoginFormValues } from '../components/LoginForm';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import NewPasswordForm from '../components/NewPasswordForm';
import { useHistory, useParams } from 'react-router-dom';
import useLoginFlow from '../hooks/useLoginFlow';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  form: {
    marginTop: theme.spacing(1)
  },
  bold: {
    fontWeight: 'bold'
  }
}));

export default function LoginPage() {
  const classes = useStyles();
  const [currentForm, setCurrentForm] = useState<'login' | 'new-password'>('login');
  const { login, setNewPassword } = useLoginFlow();
  const history = useHistory();
  const { redirect } = useParams<{ redirect?: string }>();

  const redirectOnLogin = () => history.push(redirect ? decodeURIComponent(redirect) : '/');
  const handleLogin = async ({ username, password }: LoginFormValues) => {
    const result = await login(username, password);
    if (result === 'NEW_PASSWORD_REQUIRED') {
      return setCurrentForm('new-password');
    }
    return redirectOnLogin()
  };
  const handleNewPassword = async (password: string) => {
    await setNewPassword(password);
    return redirectOnLogin();
  };

  return (
    <Container component="main" className={classes.paper}>
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" height={120}/>
      <Typography component="h1" variant="h4" className={classes.title}>
        Asmat Companion
      </Typography>
      {currentForm === 'login' && <Typography component="h2" variant="h5">
        Connectez-vous
      </Typography>}
      {currentForm === 'new-password' &&
      <Typography component="p" variant="body1">
        C'est la première fois que vous vous connectez sur Asmat Companion. Vous devez choisir un nouveau mot
        de passe pour vos prochaines connexions.
      </Typography>}
      <Container className={classes.form} maxWidth="xs">
        {currentForm === 'login' && <LoginForm onSubmit={handleLogin}/>}
        {currentForm === 'new-password' && <NewPasswordForm onSubmit={handleNewPassword}/>}
      </Container>
    </Container>
  );
}
