'use client';

import { faEdit, faLock, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexTableRow from "../../flex-table-row";
import User from "@/app/lib/model";

interface UserRowProps {
    user: User
    onEdit: (id: number) => void;
    onChangeActive: (id: number) => void;

}

export default function UserRow({ user, onEdit, onChangeActive }: UserRowProps) {
    return (
        <FlexTableRow active={user.active}>
            <div className="flex-1 text-left">
                {user.name}
            </div>
            <div className="flex-1 text-left">
                {user.userName}
            </div>
            <div className="flex-1 text-right space-x-1">
                <button type="button" className="text-blue-600 hover:text-blue-800" onClick={() => onEdit(user.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                {user.active &&
                    <button type="button" className="text-red-600 hover:text-red-800">
                        <FontAwesomeIcon icon={faLock} onClick={() => onChangeActive(user.id)} />
                    </button>
                }

                {!user.active &&
                    <button type="button" className="text-green-600 hover:text-green-800">
                        <FontAwesomeIcon icon={faUnlock} onClick={() => onChangeActive(user.id)} />
                    </button>
                }
            </div>
        </FlexTableRow>
    );
}