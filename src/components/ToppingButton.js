import React from 'react';
import { Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = {
  button:{
    "&hover":{
      "background-color":"white",
      
    },
    "margin-left":5,
  }
}

function ToppingButton(props){
  const {selected} = props; 
  const {handleClick} = props; 
  const {classes}=props
  return (
    <Button 
      onClick={handleClick} 
      color  ={!selected?"default":"primary"} 
      variant={"outlined"}
      disableTouchRipple
      className={classes.button}
      {...props} 
    />
  );
}

export default withStyles(styles)(ToppingButton);
