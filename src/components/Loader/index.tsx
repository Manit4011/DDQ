import React from 'react';
import { LinearProgress, CircularProgress, Skeleton } from '@mui/material';

interface ILoader {
  type?: string;
  loadercolor?: any;
  loadervalue?: string | number;
}

const Loader: React.FC<ILoader> = ({ type, loadercolor }) => {
  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // You can adjust the height as needed
  };
  switch (type) {
    case 'linear':
      return (
        <div style={loaderStyle}>
          <LinearProgress variant="determinate" value={50} />
        </div>
      );
    case 'circle':
      return (
        <div style={loaderStyle}>
          <CircularProgress color={loadercolor} />
        </div>
      );
    default:
      return (
        <div style={loaderStyle}>
          <Skeleton style={{ width: '50%', height: '50%' }} />
        </div>
      );
  }
};

export default Loader;
