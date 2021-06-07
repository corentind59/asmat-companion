import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Redirect, Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import DashboardPage from '../../dashboard/views/DashboardPage';
import AccountInfo from '../components/AccountInfo';
import NavigationMenu from '../components/NavigationMenu';
import AsmatSearchPage from '../../asmat/views/AsmatSearchPage';
import AsmatDetailsPage from '../../asmat/views/AsmatDetailsPage';
import AsmatAddPage from '../../asmat/views/AsmatAddPage';
import AsmatListPrintPage from '../../asmat/views/AsmatListPrintPage';

const drawerWidth = '20vw';
const drawerMinWidth = '256px';

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
    minWidth: drawerMinWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    minWidth: drawerMinWidth
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

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={`${classes.appBar} screen-only`}>
        <Toolbar>
          <Box flexGrow={1} display="flex" alignItems="center">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" width={40} className="screen-only"/>
            <Typography className={classes.appName} variant="h6" noWrap>
              Asmat Companion
            </Typography>
          </Box>
          <Box>
            <AccountInfo/>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer className={`${classes.drawer} screen-only`}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}>
        <div className={classes.drawerContainer}>
          <Toolbar className="screen-only"/>
          <NavigationMenu/>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar className="screen-only"/>
        <Switch>
          <Route path="/asmats/search" exact component={AsmatSearchPage}/>
          <Route path="/asmats/add" exact component={AsmatAddPage}/>
          <Route path="/asmats/print" exact component={AsmatListPrintPage}/>
          <Route path="/asmats/:asmatId" exact component={AsmatDetailsPage}/>
          <Route path="/" exact component={DashboardPage}/>
          <Redirect to="/"/>
        </Switch>
      </main>
    </div>
  );
}
