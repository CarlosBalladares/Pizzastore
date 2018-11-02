import React from 'react';
import Typography from '@material-ui/core/Typography'
import { List, ListItem } from '@material-ui/core';
import { Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const styles ={
  root:{
    'flex':1,
    'margin':10
  }
}

function OrderSummary(props) {
    const {orders} = props;
    const total = orders.reduce((acc, order)=>acc+order.price, 0);

    if(orders.length===0){
      return(
        <div>
          <Typography variant="h4">Order Summary</Typography>
          <Typography>You can make an order in the orders pane</Typography>
        </div>
      );
    }

    return(
      <div>
        <Typography variant="h4">Order Summary</Typography>
        
        
        {
          orders.map( (order, i)=>(
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

              <Button 
                onClick={()=>props.removeOrder(i)}
                variant="outlined"
                color="secondary"
                disableRipple
              >
                Remove Order
              </Button>
              
            </List>
          ))
        }

        {/* <OrderDisplay order={orders[0]} i={0}></OrderDisplay> */}
        
        
        <Typography variant="h4">Order Total {total}</Typography>
      </div>
    
    );
}


export default withStyles(styles)(OrderSummary);