'use client';

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexTableRow from "../../flex-table-row";

interface UserRowProps {
    id: number;
    name: string;
    username: string;
}

export default function UserRow({ id, name, username }: UserRowProps) {
    return (
        <FlexTableRow>
            <div className="flex-1 text-left">
                {name}
            </div>
            <div className="flex-1 text-left">
                {username}
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
}