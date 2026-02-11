import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FlexTableRow from '../../flex-table/flex-table-row';
import { Shop } from '@/app/lib/model';
import ActionButton from '../../flex-table/action-button';
import ActivateButtons from '../../flex-table/activate-buttons';

interface ShopRowProps {
    shop: Shop,
    onEdit: (id: number) => void,
    onChangeActive: (id: number) => void
}

export default function ShopRow(props: ShopRowProps) {
    const { shop, onEdit, onChangeActive } = props;
    return (
        <FlexTableRow active={shop.active}>

            <div className="flex flex-1 text-left items-center gap-2">
                <img src={`/${shop.logo}`} alt={shop.logo} width={100} height={50} /> <a href={`/admin/shops/${shop.id}`} className="underline underline-offset-4 hover:text-blue-500">{shop.name}</a>
            </div>


            <div className="flex-1 text-right space-x-1">
                <ActionButton onAction={() => onEdit(shop.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </ActionButton>
                <ActivateButtons active={shop.active} onChangeActive={() => onChangeActive(shop.id)} />
            </div>
        </FlexTableRow>
    );
};