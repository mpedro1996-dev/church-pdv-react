import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FlexTableRow from '../../flex-table/flex-table-row';
import { Ministry } from '@/app/lib/model';
import ActionButton from '../../flex-table/action-button';
import ActivateButtons from '../../flex-table/activate-buttons';

interface MinistryRowProps {
    ministry: Ministry,
    onEdit: (id: number) => void,
    onChangeActive: (id: number) => void
}

export default function MinistryRow(props: MinistryRowProps) {
    const { ministry, onEdit, onChangeActive } = props;
    return (
        <FlexTableRow active={ministry.active}>

            <div className="flex-1 text-left">
                {ministry.name}
            </div>
            <div className="flex-1 text-left">
                {ministry.acronym}
            </div>

            <div className="flex-1 text-right space-x-1">
                <ActionButton onAction={() => onEdit(ministry.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </ActionButton>
                <ActivateButtons active={ministry.active} onChangeActive={() => onChangeActive(ministry.id)} />
            </div>
        </FlexTableRow>
    );
};