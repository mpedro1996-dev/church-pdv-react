'use client';

import { faEdit, faKey, faLock, faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexTableRow from "../../flex-table/flex-table-row";
import { User } from "@/app/lib/model";
import ActivateButtons from "../../flex-table/activate-buttons";
import ActionButton from "../../flex-table/action-button";

interface UserRowProps {
    user: User
    onEdit: (id: number) => void;
    onChangeActive: (id: number) => void;
    onResetPassword: (id: number) => void;

}

export default function UserRow({ user, onEdit, onChangeActive, onResetPassword }: UserRowProps) {
    return (
        <FlexTableRow active={user.active}>
            <div className="flex-1 text-left">
                {user.name}
            </div>
            <div className="flex-1 text-left">
                {user.userName}
            </div>
            <div className="flex-1 text-right space-x-1">
                <ActionButton onAction={() => onEdit(user.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </ActionButton>

                <ActivateButtons active={user.active} onChangeActive={() => onChangeActive(user.id)} />

                <ActionButton className="text-black hover:text-gray-500" onAction={() => onResetPassword(user.id)}>
                    <FontAwesomeIcon icon={faKey} />
                </ActionButton>
            </div>
        </FlexTableRow >
    );
}