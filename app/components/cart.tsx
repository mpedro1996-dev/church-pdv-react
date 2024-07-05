import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CartItem from './cart-item';
import CurrencyFormatter from './currency-formatter';

export default function Cart(){
    return(
        <>
            <div className="flex items-center gap-2 p-2 border-b">
                <FontAwesomeIcon icon={faCartShopping}/>Carrinho
            </div>
            <div className="flex flex-1 flex-col">
                <CartItem name="Pizza-frita + Refri" quantity={2} unitPrice={7.00}/>
                <CartItem name="Refri" quantity={1} unitPrice={3.50}/>                               
            </div>
            <div className="flex justify-between border-t p-2">
                <div>
                    <b>Itens:</b> 3
                </div>
                <div>
                    <b>Total:</b> <CurrencyFormatter value={17.5}/>
                </div>
            </div>
        </>
    );
}