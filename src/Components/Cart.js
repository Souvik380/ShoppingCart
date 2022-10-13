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
            <AiOutlineShoppingCart className='bg-slate-900' color="white" size="50px" values={this.props.selected} />
            <div className='absolute top-8 left-8 text-xl px-2 rounded-full bg-orange-300'>{this.props.selected}</div>
          </button>
        </div>)
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
