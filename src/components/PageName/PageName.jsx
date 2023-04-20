import { Typography } from '@mui/material';

export const PageName = props => {
  const { children } = props;
  return (
    <Typography variant="h5" component="h3" sx={{ py: '20px' }}>
      {children}
    </Typography>
  );
};
