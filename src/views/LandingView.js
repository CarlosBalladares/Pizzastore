
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

const styles = {
  root:{
  }
};


function LandingView(props){
  const {classes} = props;
  return (
    <div className={classes.root}>
      <Typography>Welcome to the pizza store</Typography>
      <Typography color="default">Now you can order online</Typography>
      <Button 
        component={Link}
        to ={{
          pathname: `order/`,
        }} 
      > Order 
    </Button>
    </div>
  );
};

export default withStyles(styles)(LandingView);
