import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FlexTableRow from '../../flex-table-row';

interface MinistryRowProps {
    id: number;
    name: string;
    acronym: string;
}

export default function MinistryRow(props: MinistryRowProps) {
    const { id, name, acronym } = props;
    return (
        <FlexTableRow>

            <div className="flex-1 text-left">
                {props.name}
            </div>
            <div className="flex-1 text-left">
                {props.acronym}
            </div>

            <div className="flex-1 text-right space-x-1">
                <button type="button" className="text-blue-600 hover:text-blue-800">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button type="button" className="text-red-600 hover:text-red-800">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </FlexTableRow>
    );
};