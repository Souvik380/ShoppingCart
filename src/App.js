import './App.css';
import axios from "axios"
import React from "react"
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Cards from './Components/Cards';
import Sizes from './Components/Sizes';
import Cart from './Components/Cart';

class App extends React.Component{

  constructor(){
    super()
  }

  render(){
    
    return(
      <div className='App flex'>
        <Provider store={Store}>
          <Sizes />
          <Cards />
          <Cart />
        </Provider>
      </div>
      
    )
  }
}

export default App
