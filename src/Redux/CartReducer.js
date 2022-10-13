const data=require("../data.json")
let Xitems={}

data.products.forEach(prod=>{
    if(Xitems[prod.id]===undefined){
        Xitems[prod.id]=prod
    }
})


const initialState={
    items:data.products,
    sizes:["XS","S ","M","ML","L","XL","XXL"],
    itemsToBeDisplayed:[],
    selected:0,
    total:0,
    cartOpen:false,
    cartItems:{},

    clicked:{"XS":false,
            "S":false,
            "M":false,
            "ML":false,
            "L":false,
            "XL":false,
            "XXL":false,
        }
}

const CartReducer=(state=initialState,action)=>{
    // console.log(state.items[0]);
    switch(action.type){
        case "clicked":
            let prev=state.itemsToBeDisplayed
            let products=state.items
            let newItems=[]

            if(!state.clicked[action.payload]){
                
                document.getElementById(action.payload).style.background="black"
                document.getElementById(action.payload).style.color="white"

                if(!prev.includes(action.payload)){
                    prev.push(action.payload)
                }

            }else{
                document.getElementById(action.payload).style.background="white"
                document.getElementById(action.payload).style.color="black"

                for(let i=0;i<prev.length;i++){
                    if(prev[i]===action.payload){
                        prev.splice(i,1)
                    }
                }
            }

            if(prev.length===0){
                newItems=data.products
            }else{
                prev.forEach(size=>{
                    products.forEach(product=>{
                        product.availableSizes.forEach(productSize=>{
                            if(productSize===size){
                                newItems.push(product)
                            }
                        })
                    })
                })
            }

            let newClicked=state.clicked
            newClicked[action.payload]=!newClicked[action.payload]

            return {...state,clicked:newClicked,itemsToBeDisplayed:prev,items:newItems,}

        
        case "ADD":
            let tempItems=state.cartItems
            let tempTotal=state.total
            let sum=0

            if(tempItems[action.payload]){
                tempItems[action.payload]['Quantity']+=1
                tempItems[action.payload]['Price']+=Xitems[action.payload].price
                sum+=Xitems[action.payload].price
            }else{
                tempItems[action.payload]={}
                tempItems[action.payload]['ID']=action.payload
                tempItems[action.payload]['Quantity']=1
                tempItems[action.payload]['Price']=Xitems[action.payload].price
                tempItems[action.payload]['Title']=Xitems[action.payload].title
                tempItems[action.payload]['Image']=Xitems[action.payload].sku
                sum+=Xitems[action.payload].price
            }
            
            tempTotal+=sum
            tempTotal=Number(tempTotal.toFixed(2))
            return {...state,selected:state.selected+1,cartItems:tempItems,total:tempTotal}

        case "DEL":
            let tempItems2=state.cartItems
            let tempTotal2=state.total
            
            tempItems2[action.payload]['Quantity']-=1
            tempItems2[action.payload]['Price']-=Xitems[action.payload].price
            tempTotal2-=Xitems[action.payload].price
            
            return {...state,selected:state.selected-1,cartItems:tempItems2,total:tempTotal2}

        case "CLOSE":
            let tempItems3=state.cartItems
            let tempTotal3=state.total-(tempItems3[action.payload]['Price']*tempItems3[action.payload]['Quantity'])
            let selected2=state.selected-tempItems3[action.payload]['Quantity']

            tempItems3[action.payload]['ID']=undefined
            return {...state,total:tempTotal3,selected:selected2,cartItems:tempItems3}

        
        case "TOGGLE":
            return {...state,cartOpen:!state.cartOpen}
    }
    return state
}

export default CartReducer
