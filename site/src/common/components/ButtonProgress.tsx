import { Button, ButtonProps, CircularProgress, styled } from '@material-ui/core';
import React, { FC, forwardRef, ReactNode } from 'react';

const StyledProgress = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12
});

type InjectedButtonProps = {
  loading: boolean
};

type Props = ButtonProps & {
  loading: boolean,
  children?: (props: InjectedButtonProps) => ReactNode
};

const ButtonProgress: FC<Props> = forwardRef(({
                                                loading,
                                                disabled,
                                                children,
                                                ...rest
                                              }, ref) => (
  <Button disabled={disabled || loading}
          innerRef={ref}
          {...rest}>
    {children?.({ loading })}
    {loading && <StyledProgress size={24} color="inherit"/>}
  </Button>
));

export default ButtonProgress;
