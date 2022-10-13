import React, { Component } from 'react'
import {connect} from "react-redux"

const mapStateToProps=(state)=>{
  return {
      selected:state.cart.selected
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    add:(id)=>dispatch({type:"ADD",payload:id})
  }
}

class Card extends Component {

  render() {
    
    const image=require(`../static/products/${this.props.image}_1.jpg`)

    return (
        <div className='m-4'>
          <img src={image} className="h-[300px]"/>
          <p>{this.props.title}</p>
          <p className='text-2xl font-bold '><span>$</span>{this.props.price}</p>
          <div className='hover:bg-orange-500 bg-black flex justify-center'>
            <button className='text-white text-xl font-bold py-3' onClick={()=>this.props.add(this.props.id)}>Add to Cart</button>
          </div>
        </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card)
