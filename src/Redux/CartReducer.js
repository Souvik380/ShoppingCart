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
            let newItems=[]
            console.log("STATE-->",state.clicked)
            if(!state.clicked[action.payload]){
                document.getElementById(action.payload).style.background="black"
                document.getElementById(action.payload).style.color="white"

            }else{
                document.getElementById(action.payload).style.background="white"
                document.getElementById(action.payload).style.color="black"
            }

            let newClicked=state.clicked
            newClicked[action.payload]=!newClicked[action.payload]
            

            let flags=[]
            for(let obj in state.clicked){
                if(state.clicked[obj]){
                    flags.push(obj)
                }
            }
            
            
            flags.forEach(flag=>{
                data.products.forEach(item=>{
                    item.availableSizes.forEach(size=>{
                        if(size===flag && !newItems.includes(item)){
                            newItems.push(item)
                        }
                    })
                })
            })
            

            if(newItems.length===0){
                newItems=data.products
            }
            
            return {...state,clicked:newClicked,items:newItems}

        
        case "ADD":

            let tempItems=state.cartItems
            let tempTotal=state.total
            let sum=0

            if(tempItems[action.payload] && tempItems[action.payload]['ID']!==undefined){
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
            //----------------------------
            
            //---------------------------------------
            let quant=tempItems2[action.payload]['Quantity']-1
            quant>=0?(tempItems2[action.payload]['Quantity']-=1):(tempItems2[action.payload]['Quantity']=0)
            
            
            //---------------------------------------

            //---------------------------------------
            let price=tempItems2[action.payload]['Price']-Xitems[action.payload].price
            price>=0?(tempItems2[action.payload]['Price']-=Xitems[action.payload].price):(tempItems2[action.payload]['Price']=0)
            //---------------------------------------

            //---------------------------------------
            let val=tempTotal2-Xitems[action.payload].price
            val>=0?(tempTotal2-=Xitems[action.payload].price):(tempTotal2=0)
            //---------------------------------------
            
            if(quant===0){
                tempItems2[action.payload]['ID']=undefined
            }

            let ToBeDeleted=state.selected-1
            let deletedItems

            ToBeDeleted>=0?(deletedItems=ToBeDeleted):(deletedItems=0)
            return {...state,selected:deletedItems,cartItems:tempItems2,total:tempTotal2}

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
