import { Button, ButtonProps, CircularProgress } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

type InjectedButtonProps = {
  loading: boolean
};

type ButtonProgressProps = ButtonProps & {
  loading: boolean,
  children?: (props: InjectedButtonProps) => ReactNode
};

export default function ButtonProgress({ loading, children, ...rest }: ButtonProgressProps) {
  const classes = useStyles();

  return (
    <Button disabled={loading} {...rest}>
      {children?.({ loading })}
      {loading && <CircularProgress size={24} color="inherit" className={classes.buttonProgress}/>}
    </Button>
  );
}
