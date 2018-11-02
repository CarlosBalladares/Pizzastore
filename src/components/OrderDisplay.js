import React from 'react';
import Typography from '@material-ui/core/Typography'
import { List, ListItem } from '@material-ui/core';
import { Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import TablePagination from '@material-ui/core/TablePagination';



function OrderDisplay(props){

  const {order} = props;
  const{i} =  props;

  return (
  <List>
    <ListItem>Pizza Size </ListItem>
    <ListItem>{order.size}</ListItem>
    <ListItem>Toppings </ListItem>
    {
      order.meat.map((topping)=>(
        <ListItem>{topping} </ListItem>
      ))
    }

    {
      order.nonMeat.map((topping)=>(
        <ListItem>{topping} </ListItem>
      ))
    }
    {
      (order.pop?<ListItem> Pop </ListItem>:null)
    }

    <ListItem>Cost</ListItem>
    <ListItem>{order.price}</ListItem>

    <Button onClick={()=>props.removeOrder(i)}>Remove Order</Button>
    
  </List>
  
  );
}

export default OrderDisplay;
