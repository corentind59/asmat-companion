import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MouseEventHandler, useState } from 'react';
import { useAuthContext } from '../../auth/context';
import { Grid, Typography } from '@material-ui/core';
import { Auth } from '@aws-amplify/auth';

export default function AccountInfo() {
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<Element | null>(null);
  const authSession = useAuthContext();
  const handleAccountClick: MouseEventHandler = event => setAccountMenuAnchor(event.currentTarget);
  const handleAccountClose: MouseEventHandler = () => setAccountMenuAnchor(null);
  const handleSignOut = async () => {
      await Auth.signOut();
      authSession.refreshAuthSession();
  };

  if (!authSession.isAuthenticated) {
    return null;
  }

  const { given_name, family_name } = authSession.authenticationInfo.userInfo;

  return (
    <Grid container alignItems="center">
      <Typography component="span" variant="subtitle1">
        {`${given_name} ${family_name}`}
      </Typography>
      <IconButton edge="end" onClick={handleAccountClick}>
        <AccountCircleIcon/>
      </IconButton>
      <Menu anchorEl={accountMenuAnchor}
            open={!!accountMenuAnchor}
            onClose={handleAccountClose}
            keepMounted>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon/>
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
    </Grid>
  );
}
