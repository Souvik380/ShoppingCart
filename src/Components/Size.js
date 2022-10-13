import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps=(state)=>{
    return {
        shirts:state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      clicked:  (qty) => dispatch({ type: "clicked" ,payload:qty}),
      changeColor:(size)=>dispatch({type:"change",payload:size})
    };
  };

class Size extends Component {

  render() {
   
    return (
      <div className='btn border-4 rounded-full p-3' id={this.props.size} onClick={()=>this.props.clicked(this.props.size)} >
        <button className={this.props.size} >
          <input type="checkbox" value={this.props.size} hidden/>
          <span type="checkmark">{this.props.size}</span>
        </button>
      </div>
    )

    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Size)
