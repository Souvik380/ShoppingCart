import React, { Component } from 'react'
import { connect } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import SelectedCartItems from './SelectedCartItems'


const mapStateToProps=(state)=>{
    return {
      selected: state.cart.selected,
      open: state.cart.cartOpen,
      cartItems: state.cart.cartItems,
      total:state.cart.total
    }
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return{
      cartToggle:()=>dispatch({type:"TOGGLE"})
    }
  }

class CartItems extends Component {

  handler=()=>{
    if(this.props.total===0){
      alert("Add some products in the cart")
    }else{
      alert(`"Checkout -Subtotal: ${this.props.total}"`)
    }
  }
    
  render() {
    return (
    
      <div className='flex flex-col justify-around absolute bg-gray-900 h-full w-[700px] '>
        
        <div className='flex justify-around'>
            <div>
                <AiOutlineShoppingCart color='white' size="30px" />
                <p className='text-white'>{this.props.selected}</p>
            </div>
            <p className='text-white font-bold text-2xl'>Cart</p>
        </div>

        <p className='text-white'>Add some items in the cart <br />:)</p>

        <div className='cart-items text-white overflow-auto'>
          <SelectedCartItems cartItems={this.props.cartItems} />
        </div>

        <div className='flex flex-col'>
            <div className='flex justify-around'>
                <p className='text-white font-bold text-2xl'>SUBTOTAL</p>
                <p className='text-orange-500 font-bold text-2xl'>${Number(this.props.total.toFixed(2))}</p>
            </div>
            <button className='text-white font-bold text-2xl bg-black p-3' onClick={()=>this.handler()}>CHECKOUT</button>
        </div>

      </div>
     
      
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartItems)
