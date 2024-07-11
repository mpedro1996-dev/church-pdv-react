import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormatter from "./currency-formatter";
import { useSaleItemStore } from "../lib/zustand";

interface CartItemProps{
    name:string,
    unitPrice:number,
    quantity:number,
    id: number,
    disableRemove: boolean
}

export default function CartItem(props: CartItemProps){

    const {removeSaleItem} = useSaleItemStore();

    const removeItem = () => {
        removeSaleItem(props.id);
    }

    return(
        <div className='flex justify-between border-b p-1'>
            <div className='flex-1'>
                {props.quantity}x {props.name} 
            </div>
            <div className='flex-2 px-2'>
                <CurrencyFormatter value={props.unitPrice * props.quantity}/>
            </div>
            {!props.disableRemove &&
            (<div className="flex justify-center items-center border-l px-2">                
                <button type="button" className="hover:text-red-500" onClick={removeItem}><FontAwesomeIcon icon={faTrashCan}/></button>
            </div>)
            }
        </div> 
    )
}