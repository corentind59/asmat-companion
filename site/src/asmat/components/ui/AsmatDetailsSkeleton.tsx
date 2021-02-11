import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    height: 300
  },
  cardTitle: {
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  cardTitleIcon: {
    marginRight: theme.spacing(1),
  }
}));

export function AsmatDetailsSkeleton() {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="stretch" spacing={3}>
      <Grid item container justify="space-between" alignItems="center" wrap="nowrap">
        <Grid item>
          <Typography variant="h4">
            <Skeleton animation="wave" width={240}/>
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="stretch" wrap="wrap" spacing={2}>
        <Grid item sm={12} lg={7}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle} component="h3" variant="h5">
                <Box display="flex" alignItems="center">
                  <Skeleton className={classes.cardTitleIcon} animation="wave" variant="circle" width={40} height={40} />
                  <Skeleton animation="wave" width={160}/>
                </Box>
              </Typography>
              <Skeleton animation="wave" width="60%" />
              <Skeleton animation="wave" width="80%" />
              <Skeleton animation="wave" width="70%" />
              <br />
              <Skeleton animation="wave" width="50%" />
              <Skeleton animation="wave" width="65%" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} lg={5}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardTitle} component="h3" variant="h5">
                <Box display="flex" alignItems="center">
                  <Skeleton className={classes.cardTitleIcon} animation="wave" variant="circle" width={40} height={40} />
                  <Skeleton animation="wave" width={200}/>
                </Box>
              </Typography>
              <Skeleton animation="wave" width="40%" />
              <br />
              <Skeleton animation="wave" width="90%" />
              <Skeleton animation="wave" width="50%" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
