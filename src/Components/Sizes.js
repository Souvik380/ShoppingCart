import React, { Component } from 'react'
import { connect } from "react-redux";
import Size from './Size'

const mapStateToProps=(state)=>{
    return {
        sizes:state.cart.sizes
    }
}

class Sizes extends Component {
    render() {
        return (
        <div>
            <h2 className='text-black font-bold'>Sizes:</h2>
            <div className='grid grid-rows-2 grid-flow-col gap-2'>
                {
                    this.props.sizes.map(size=>{
                        return(
                            <Size 
                                size={size}
                            />
                        )
                    })
                }
            </div>
            <p className='mt-8'>Leave a star on Github if this <br />repository was useful :</p>
        </div>
        )
    }
}

export default connect(mapStateToProps)(Sizes)
