import { FC } from 'react';
import { Typography } from '@material-ui/core';

type NotProvidedProps = {
  pluralize?: boolean,
  feminize?: boolean
};

const NotProvided: FC<NotProvidedProps> = ({ pluralize, feminize }) => (
  <Typography component="span" variant="body2" color="textSecondary">
    Non renseigné{feminize && 'e'}{pluralize && 's'}
  </Typography>
);

export default NotProvided;
