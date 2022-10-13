import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ImCross} from "react-icons/im"

const mapStateToProps=(state)=>{
    return {state}
}

const mapDispatchToProps=(dispatch)=>{
    return {
        add:(id)=>dispatch({type:"ADD",payload:id}),
        del:(qty)=>dispatch({type:"DEL",payload:qty}),
        close:(id)=>dispatch({type:"CLOSE",payload:id})
    }
}

class SelectedCartItems extends Component {
  render() {
    let objs=this.props.cartItems
    console.log(objs);
    let objsArray=[]
    
    for(let k in objs){
        for(let t in objs[k]){
        }
        objsArray.push(objs[k])
    }

    console.log("~~@#@~",objsArray)

    return(
        <ul className='flex flex-col justify-around '>
        {
            objsArray.map(obj=>(
                
                obj.ID!==undefined && (<li className='border-2 border-white-500 flex justify-between items-center'>
                    <div className='flex space-x-3'>
                        <img src={require(`../static/products/${obj.Image}_2.jpg`)} />

                        <div className=' flex flex-col mt-10'>
                            <div className=' w-[400px] flex justify-between space-x-5 ml-12'>
                                <p className='font-bold'>{obj.Title}</p>
                                <p className='font-bold text-orange-500'>{Number(obj.Price.toFixed(2))}</p>
                                <p className='font-bold'>{obj.Quantity}</p>
                            </div>

                            <div className='flex justify-center space-x-3'>
                                <button className='text-2xl font-bold' onClick={()=>this.props.add(obj.ID)}>+</button>
                                <button className='text-2xl font-bold ' onClick={()=>this.props.del(obj.ID)}>-</button>
                            </div>
                        </div>
                    </div>

                    <button>
                        <ImCross onClick={()=>this.props.close(obj.ID)} />
                    </button>
                </li>)
            ))
        }
        </ul>
    )
   
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SelectedCartItems)