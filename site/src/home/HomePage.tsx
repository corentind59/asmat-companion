import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Switch } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { MouseEventHandler, useState } from 'react';
import { ListItemIcon, MenuItem } from '@material-ui/core';
import { useAuthSession } from '../auth/context';

const drawerWidth = '20vw';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appName: {
    marginLeft: 10,
    display: 'inline-block'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflowY: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function HomePage() {
  const classes = useStyles();
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<Element | null>(null);
  const authSession = useAuthSession();
  const handleAccountClick: MouseEventHandler = event => setAccountMenuAnchor(event.currentTarget);
  const handleAccountClose: MouseEventHandler = () => setAccountMenuAnchor(null);
  const handleSignOut = async () => {
    if (authSession.isAuthenticated) {
      await authSession.signOut();
      authSession.refreshAuthSession();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box flexGrow={1} display="flex" alignItems="center">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" width={40}/>
            <Typography className={classes.appName} variant="h6" noWrap>
              Asmat Companion
            </Typography>
          </Box>
          <Box>
            <IconButton edge="end" onClick={handleAccountClick}>
              <AccountCircle/>
            </IconButton>
            <Menu anchorEl={accountMenuAnchor}
                  open={!!accountMenuAnchor}
                  onClose={handleAccountClose}
                  keepMounted>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <ExitToApp/>
                </ListItemIcon>
                Déconnexion
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}>
        <div className={classes.drawerContainer}>
          <List/>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar/>
        <Switch>

        </Switch>
      </main>
    </div>
  );
}
