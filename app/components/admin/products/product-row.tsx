'use client';

import { faEdit, faKey, faLock, faStar, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexTableRow from "../../flex-table/flex-table-row";

import ActivateButtons from "../../flex-table/activate-buttons";
import ActionButton from "../../flex-table/action-button";
import { Product } from "@/app/lib/model";
import CurrencyFormatter from "../../currency-formatter";


interface ProductRowProps {
    product: Product;
    onEdit: (id: number) => void;
    onChangeActive: (id: number) => void;

}

export default function ProductRow({ product, onEdit, onChangeActive }: ProductRowProps) {
    return (
        <FlexTableRow active={product.active}>
            <div className="flex-1 text-left">
                {product.canEmitCourtesy ? <FontAwesomeIcon icon={faStar} className="text-yellow-500" /> : <FontAwesomeIcon icon={faStar} className="text-gray-400" />} {product.name}
            </div>
            <div className="flex-1 text-left">
                {product.barcode}
            </div>
            <div className="flex-1 text-left">
                <CurrencyFormatter value={product.price} />
            </div>
            <div className="flex-1 text-right space-x-1">
                <ActionButton onAction={() => onEdit(product.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </ActionButton>

                <ActivateButtons active={product.active} onChangeActive={() => onChangeActive(product.id)} />

            </div>
        </FlexTableRow >
    );
}