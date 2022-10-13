import React, { Component } from 'react'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {AiFillCloseCircle} from "react-icons/ai"
import {connect} from "react-redux"
import CartItems from './CartItems'

const mapStateToProps=(state)=>{
  return {
    selected:state.cart.selected,
    open:state.cart.cartOpen
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    cartToggle:()=>dispatch({type:"TOGGLE"})
  }
}

class Cart extends Component {
  
  render() {
    
    return (
      this.props.open?(
          <div className='flex justify-end'>
            <span className='absolute mr-[700px]'>
              <button  onClick={()=>this.props.cartToggle()}>
                <AiFillCloseCircle size="30px" />
              </button>
            </span>
            <CartItems />
          </div>
      ):(<div className='fixed ml-[1200px]'>
          <button onClick={()=>this.props.cartToggle()}>
            <AiOutlineShoppingCart size="50px"/>
              {this.props.selected}
          </button>
        </div>)
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
