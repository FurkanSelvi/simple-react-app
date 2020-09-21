import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../../components/Layout/data'

const drawerWidth = 240;

const ProtectedHome = (props) => {
  const { } = props;
  const classes = useStyles();


  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography paragraph>
        izinli sayfa
        </Typography>
    </main>
  );
}

export default ProtectedHome;
