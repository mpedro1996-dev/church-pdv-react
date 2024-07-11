import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartItem from './cart-item';
import CurrencyFormatter from './currency-formatter';
import { useSaleItemStore } from '../lib/zustand';

interface CartProps {
    disableRemove:boolean
}

export default function Cart(props: CartProps){

    const {saleItems} = useSaleItemStore();

    const calculateTotal = () => {
        return saleItems.reduce((total, item) => {
          return total + item.quantity * item.product.price;
        }, 0);
      };

    return(
        <>
            <div className="flex items-center gap-2 p-2 border-b">
                <FontAwesomeIcon icon={faCartShopping}/>Carrinho
            </div>
            <div className="flex flex-1 flex-col">
                {saleItems.map((saleItem)=>(
                    <CartItem key={saleItem.product.id} id={saleItem.product.id} name={saleItem.product.name} quantity={saleItem.quantity} unitPrice={saleItem.product.price} disableRemove={props.disableRemove}/>
                ))}                        
            </div>
            <div className="flex justify-between border-t p-2">
                <div>
                    <b>Itens:</b> {saleItems.length}
                </div>
                <div>
                    <b>Total:</b> <CurrencyFormatter value={calculateTotal()}/>
                </div>
            </div>
        </>
    );
}