import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TopicButton  from './ToppingButton.js';

import menu from '../config/menu';

const styles = {
  root:{
  },
  orderButton:{
    '&hover':{
      'background-color':'white'
    }
  }
  
}

class Order extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      size:"",
      meat:[],
      nonMeat:[],
      pop:false,
      promo:this.props.promo,
      price:0
    };

    this.toggleMeatTopping    = this.toggleMeatTopping.bind(this);
    this.togglenonMeatTopping = this.togglenonMeatTopping.bind(this);
    this.setSize    =  this.setSize.bind(this);
    this.togglePop  =  this.togglePop.bind(this);
    this.flushOrder =  this.flushOrder.bind(this);
    

  }

  componentWillReceiveProps(props){
    this.setState({
      ...props
    });
  }

  toggleMeatTopping(name){
    
    let index = this.state.meat.indexOf(name);
    if (index === -1){
      this.setState({
        meat:[...this.state.meat, name]
      })
    }else{
      let rem = [...this.state.meat];
      rem.splice(index, 1);
      this.setState({
        meat:rem
      })
    }
  }

  togglenonMeatTopping(name){
   
    let index = this.state.nonMeat.indexOf(name);
    if (index === -1){
      this.setState({
        nonMeat:[...this.state.nonMeat,  name]
      })
    }else{
      let rem = [...this.state.nonMeat];
      rem.splice(index, 1);
      this.setState({
        nonMeat:rem
      })
    }
  }
  setSize(size){
    this.setState({
      size:size
    })
  }
  togglePop(){
    this.setState({
      pop:!this.state.pop
    })
  }
  flushOrder(){
    this.setState({
      size:"",
      meat:[],
      nonMeat:[],
      pop:false
    });
    this.props.handleOrder(this.state);
  }
  getOrderTotal(){
    if( this.state.size === "") return -1;

    const size_index    = menu.size.options.indexOf(this.state.size);
    const pizza_price = menu.size.prices[size_index];
    const mtp = this.state.meat.length*menu.toppings.meat.price;
    const nmtp = this.state.nonMeat.length*menu.toppings.nonMeat.price;
    const pop = (this.state.pop?menu.pop.price:0);
    if(this.state.size ==="large" && this.state.promo){
      this.state.price =menu.promoPrice;

      return menu.promoPrice;
    }
    
    this.state.price=pizza_price+mtp+nmtp+pop;

    

    return pizza_price+mtp+nmtp+pop;
  }
  render(){
    const {size}     = menu;
    const {toppings} = menu;
    const {classes}  = this.props;
    const total = this.getOrderTotal();
    console.log((this.state.promo?"promo order":"regular"))
    return(
      <div className={classes.root}>
        
        <Typography variant="h4" gutterBottom>Choose your pizza size</Typography>
        {size.options.map((size)=><TopicButton value={size} selected={this.state.size ===size} onClick={()=>this.setSize(size)}>{size}</TopicButton>)}

        <Typography variant="h5" gutterBottom>Choose toppings</Typography>

        <Typography variant="h5" gutterBottom>Non-Meat</Typography>
        
        {
          toppings.nonMeat.options.map(
          (val)=>{
            console.log(this.state.nonMeat);
            let index = this.state.nonMeat.indexOf(val);
          
            return <TopicButton 
                  value={val} 
                  disabled = {this.state.size===""}
                  selected={index !==-1}
                  onClick={()=>this.togglenonMeatTopping(val)} >
                    {val} 
                  </TopicButton>})
        }

       <Typography variant="h5" gutterBottom>Meat</Typography>
        
        {
          toppings.meat.options.map(
            (val)=>{
              console.log(this.state.meat);
              let index = this.state.meat.indexOf(val);
            
              return (<TopicButton 
                      value    = {val} 
                      disabled = {this.state.size===""}
                      selected = {index !==-1}
                      onClick  = {()=>this.toggleMeatTopping(val)} 
                    >
                      {val} 
                    </TopicButton>);
            }
          )
        }

        <Typography variant="h5" gutterBottom>Pop?</Typography>
        <TopicButton 
          selected={this.state.pop} 
          onClick={this.togglePop}
          disabled = {this.state.size===""}  
        >
          Add pop
        </TopicButton>

       
        <Typography variant="h6" gutterBottom>{(total === -1?"Choose your pizza":`Pizza Cost: ${total}`)}</Typography>
        <Button 
          className={classes.orderButton}
          color="secondary" 
          disableRipple
          onClick={()=>this.flushOrder()}
          disabled={this.state.size===""}
          variant={"outlined"}
        
        >Add Order</Button>
      </div>
    );
  }
}

export default withStyles(styles) (Order);