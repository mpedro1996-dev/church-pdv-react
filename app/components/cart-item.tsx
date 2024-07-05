import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormatter from "./currency-formatter";

interface CartItemProps{
    name:string,
    unitPrice:number,
    quantity:number
}

export default function CartItem(props: CartItemProps){

    return(
        <div className='flex justify-between border-b p-1'>
            <div className='flex-1'>
                {props.quantity}x {props.name} 
            </div>
            <div className='flex-2 px-2'>
                <CurrencyFormatter value={props.unitPrice * props.quantity}/>
            </div>
            <div className="border-l px-2">
                <FontAwesomeIcon icon={faTrashCan}/>
            </div>
        </div> 
    )
}