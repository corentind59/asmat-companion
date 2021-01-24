import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LoginForm, { LoginFormValues } from '../components/LoginForm';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import NewPasswordForm from '../components/NewPasswordForm';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../context';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
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
  const [user, setUser] = useState<any>(null);
  const { reloadAuth } = useAuth();
  const history = useHistory();
  const { redirect = '/' } = useParams<{redirect?: string}>();

  const redirectOnLogin = () => {
    reloadAuth();
    history.push(redirect);
  };
  const handleLogin = async (values: LoginFormValues) => {
    try {
      const authUser = await Auth.signIn(values.username, values.password);
      if (authUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setUser(authUser);
        return setCurrentForm('new-password');
      }
      return redirectOnLogin();
    } catch (e: any) {
      if (e.code === 'NotAuthorizedException') {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect.');
      }
      throw e;
    }
  };
  const handleNewPassword = async (password: string) => {
    await Auth.completeNewPassword(user, password);
    return redirectOnLogin();
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h4" className={classes.title}>
        Asmat Companion
      </Typography>
      {currentForm === 'login' && <Typography component="h1" variant="h5">
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
    </div>
  );
}
