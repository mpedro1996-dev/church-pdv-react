'use client';

import CurrencyFormatter from "@/app/components/currency-formatter";
import FlexTableRow from "@/app/components/flex-table/flex-table-row";
import { Product } from "@/app/lib/model";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



interface ProductShopRowProps {
    product: Product;
    onAdd?: (id: number) => void;
    onRemove?: (id: number) => void;


}

export default function ProductShopRow({ product, onAdd, onRemove }: ProductShopRowProps) {
    return (
        <FlexTableRow active={product.active}>
            <div className="flex-1 text-left">
                {product.name}
            </div>
            <div className="flex-1 text-center">
                <CurrencyFormatter value={product.price} />
            </div>
            <div className="flex-1 text-right space-x-1">

                {onAdd && <button className="text-green-500" onClick={() => onAdd(product.id)}><FontAwesomeIcon icon={faPlus} /></button>}
                {onRemove && <button className="text-red-500" onClick={() => onRemove(product.id)}><FontAwesomeIcon icon={faMinus} /></button>}

            </div>
        </FlexTableRow >
    );
}