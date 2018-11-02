import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OrderPane from '../components/OrderPane';
import OrderSummary from '../components/OrderSummary';


const styles = {
  root:{
    'text-align':'center'
  },
  orderSection:{
    'position':'relative',
    'top':100,
    'width':'800',
    'display': 'flex',
    'justify-content': 'center',
    'flex-direction':'row',
  }
}
class OrderingView extends Component{
  constructor(props){
    super(props);
    this.state={
      orders:[], 
      promo : this.hasSpecialPromo(),
      isPromOrder:false,
      
    };

    this.addOrder    = this.addOrder.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.hasSpecialPromo = this.hasSpecialPromo.bind(this);
    this.applyPromo = this.applyPromo.bind(this);

  }

  hasSpecialPromo(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    

    let i = 1;
    let count=0;
    while(i<=date.getDate() && count<1 && date.getDay() ===6){
      let tempdate = new Date( month +" "+(i++)+" " + year);
      if(tempdate.getDay() === 6){
        count++;
      }
    }
    return count ===2;
  }

  applyPromo(){

    this.setState({
      promo:false,
      isPromOrder:true
    });

  }

  addOrder(order){
    this.setState({
      isPromOrder:false,
      orders:[...this.state.orders, order]
    });
  }

  removeOrder(order){
    console.log("removing");
    console.log(this.state.orders[order]);
    if(order<0 || order>this.state.orders.length-1) return;

    let orders = [...this.state.orders];
    orders.splice(order, 1);

    

    this.setState({
      orders:orders,
      promo:this.state.orders[order].promo|| this.state.promo
    });
  }

  render(){
    const {classes} = this.props;
    let redeemButton;
    if(this.state.promo){
      redeemButton= <Button onClick={ this.applyPromo } > Redeem Promo</Button>;
    }else{
      redeemButton=null;
    }
    console.log((this.state.isPromOrder?"promo order":"regular"))
    return(
      <div className={classes.root}>
        <Typography variant="h2"> Make your order</Typography>
        <div className={classes.orderSection}>
          <OrderPane handleOrder={this.addOrder} promo={this.state.isPromOrder}  />
          <OrderSummary 
            removeOrder={this.removeOrder} 
            orders={this.state.orders} 
          />
          {redeemButton}
        </div>
        
      </div>
    );
  }
}


export default withStyles(styles) (OrderingView);