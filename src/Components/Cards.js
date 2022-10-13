import React, { Component } from 'react'
import { connect } from "react-redux";
import Card from './Card';

const mapStateToProps = (state) => {
    return {
      items: state.cart.items
    };
  };

class Cards extends Component {
  render() {
    
    let items=this.props.items
    // console.log(items);
    return (
      <div>
        <h1 className='w-[800px] flex justify-center font-bold'>{items.length>=2?(items.length+" Products"):(items.length+" Product")} found</h1>
        <div className='flex flex-wrap justify-around'>
          {
            items.map(item=>{
              return (<Card
                        id={item.id}
                        style={item.style} 
                        title={item.title}
                        price={item.price}
                        image={item.sku}
                        freeShipping={item.isFreeShipping}
                    />)
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cards)
