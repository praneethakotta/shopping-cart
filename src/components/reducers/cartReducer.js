import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:Item1, addedLabel: false},
        {id:2,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2, addedLabel: false},
        {id:3,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3, addedLabel: false},
        {id:4,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4, addedLabel: false},
        {id:5,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5, addedLabel: false},
        {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6, addedLabel: false},
        {id:7,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:Item1, addedLabel: false},
        {id:8,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2, addedLabel: false},
        {id:9,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3, addedLabel: false},
        {id:10,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4, addedLabel: false},
        {id:11,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5, addedLabel: false},
        {id:12,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6, addedLabel: false},
        {id:13,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:Item1, addedLabel: false},
        {id:14,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2, addedLabel: false},
        {id:15,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3, addedLabel: false},
        {id:16,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4, addedLabel: false},
        {id:17,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5, addedLabel: false},
        {id:18,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6, addedLabel: false}
    ],
    addedItems:[],
    total: 0
}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity +=1
            existed_item.quantity += 1 
            return JSON.parse(JSON.stringify({
                ...state,  
                total: state.total + addedItem.price
            }))
        }
         else{
            addedItem.quantity = 1;
            addedItem.addedLabel = true;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return JSON.parse(JSON.stringify({
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }))
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        let itemToBeModifiedInState = state.items.find(item => itemToRemove.id === item.id)
        itemToBeModifiedInState.addedLabel = false
        itemToBeModifiedInState.quantity = 0
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.addedItems.find(item=> item.id === action.id)
        let itemToBeModifiedInState = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          itemToBeModifiedInState.quantity += 1 
          let newTotal = state.total + addedItem.price
          return JSON.parse(JSON.stringify({
              ...state,
              total: newTotal
          }))
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.addedItems.find(item=> item.id === action.id)
        let itemToBeModifiedInState = state.items.find(item=> item.id === action.id)
 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1) {
            itemToBeModifiedInState.addedLabel = false
            itemToBeModifiedInState.quantity = 0
            let new_addeditems = state.addedItems.filter(item=>item.id !== action.id)
            // let new_items = state.items.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return JSON.parse(JSON.stringify({
                ...state,
                addedItems: new_addeditems,
                total: newTotal
            }))
        }
        else {
            addedItem.quantity -= 1
            itemToBeModifiedInState.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }

    return state
}

export default cartReducer