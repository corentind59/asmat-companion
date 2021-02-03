import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MouseEventHandler, useState } from 'react';
import { useAuthSession } from '../../auth/context';

export default function AccountInfo() {
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<Element | null>(null);
  const authSession = useAuthSession();
  const handleAccountClick: MouseEventHandler = event => setAccountMenuAnchor(event.currentTarget);
  const handleAccountClose: MouseEventHandler = () => setAccountMenuAnchor(null);
  const handleSignOut = async () => {
    if (authSession.isAuthenticated) {
      await authSession.signOut();
      authSession.refreshAuthSession();
    }
  };

  return (
    <>
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
    </>
  );
}
