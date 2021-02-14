import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import { Link, useLocation } from 'react-router-dom';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ComponentProps, ElementType, useState } from 'react';
import { AccountPlusOutline, HumanBabyChangingTable } from 'mdi-material-ui';
import { ExpandLess, ExpandMore, Search } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type ListItemButtonProps<C extends ElementType = 'button'> = ListItemProps<C> & {
  label: string,
  icon: JSX.Element
}

function ListItemButton<C extends ElementType>({ label, icon, children, ...rest }: ListItemButtonProps<C>) {
  return (
    <ListItem component="button"
              {...rest}
              button>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label}/>
      {children}
    </ListItem>
  );
}

type ListItemLinkProps = ListItemButtonProps<Link> & ComponentProps<Link> & {
  to: string
}

function ListItemLink({ to, ...rest }: ListItemLinkProps) {
  const { pathname } = useLocation();
  return (
    <ListItemButton component={Link}
                    to={to}
                    selected={pathname === to}
                    {...rest}/>
  );
}

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function NavigationMenu() {
  const classes = useStyles();
  const [isAsmatExpanded, setAsmatExpanded] = useState(false);
  const handleExpandAsmat = () => setAsmatExpanded(!isAsmatExpanded);

  return (
    <List component="nav">
      <ListItemLink label="Tableau de bord" icon={<DashboardIcon/>} to="/"/>
      <ListItemButton label="Assistantes maternelles" icon={<HumanBabyChangingTable/>} onClick={handleExpandAsmat}>
        {isAsmatExpanded ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <Collapse in={isAsmatExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nested}>
          <ListItemLink label="Rechercher" icon={<Search/>} to="/asmats/search"/>
          <ListItemLink label="Ajouter" icon={<AccountPlusOutline/>} to="/asmats/add"/>
        </List>
      </Collapse>
    </List>
  );
}
