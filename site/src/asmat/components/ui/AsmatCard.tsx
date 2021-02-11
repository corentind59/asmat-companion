import { FC, ReactNode } from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%'
  },
  cardTitle: {
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  cardTitleIcon: {
    maxHeight: 24,
    marginRight: theme.spacing(1),
    color: grey[500]
  }
}));

type Props = {
  icon: ReactNode,
  title: string
};

const AsmatCard: FC<Props> = ({ icon, title, children }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.cardTitle} component="h3" variant="h5">
          <Box display="flex" alignItems="center">
            <span className={classes.cardTitleIcon}>{icon}</span>
            <span>{title}</span>
          </Box>
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default AsmatCard;
