
import CurrencyFormatter from "../currency-formatter"
import { faBarcode, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useSaleItemStore } from "../../lib/zustand";
import { Product as ProductModel } from "@/app/lib/model";


interface ProductProps {
    product: ProductModel;
}

export default function Product(props: ProductProps) {

    const product = props.product;
    const [quantity, setQuantity] = useState(0);
    const [isSaleItem, setIsSaleItem] = useState(false);
    const { saleItems, addSaleItem, removeSaleItem, alterQuantity } = useSaleItemStore();


    const addItem = () => {
        var qty = quantity + 1;
        setQuantity(qty)

        if (qty === 1) {
            addSaleItem({
                product: product,
                quantity: qty
            })
        } else {
            alterQuantity(product.id, qty)
        }
    }

    const removeItem = () => {
        var qty = quantity - 1;
        setQuantity(qty);

        if (qty === 0) {
            removeSaleItem(product.id)
        }
        else {
            alterQuantity(product.id, qty)
        }
    }

    useEffect(() => {

        var item = saleItems.find((saleItem) => saleItem.product.id === product.id);

        if (!item) {
            setIsSaleItem(false);
            setQuantity(0)
        } else {
            setIsSaleItem(item.quantity > 0)
            setQuantity(item.quantity);
        }



    }, [saleItems, product])



    return (
        <div className="flex flex-col w-100 border rounded">
            <div className="p-2">
                <div className="flex font-bold text-sm">
                    {product.name}
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <FontAwesomeIcon icon={faBarcode} />Codigo: {product.barcode}
                </div>
                <div className="flex text-sm">
                    <CurrencyFormatter value={product.price} />
                </div>
            </div>
            {isSaleItem === false ? (
                <div className="flex items-center justify-center border-t p-2">
                    <button type="button" className="border rounded px-2 py-1" onClick={addItem}><FontAwesomeIcon icon={faPlus} /></button>

                </div>
            ) :
                (
                    <div className="flex items-center justify-center gap-4 border-t p-2">
                        <button type="button" className="border rounded px-2 py-1" onClick={removeItem}><FontAwesomeIcon icon={faMinus} /></button>
                        <span>{quantity}</span>
                        <button type="button" className="border rounded px-2 py-1" onClick={addItem}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                )}

        </div>
    );

}