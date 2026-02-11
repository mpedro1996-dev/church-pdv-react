import ActionButton from "@/app/components/flex-table/action-button";
import FlexTableRow from "@/app/components/flex-table/flex-table-row";
import { ActivationCode } from "@/app/lib/model";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActivationCodeRowProps {
    activationCode: ActivationCode,
    onDelete: (id: number) => void,

}

export default function ActivationCodeRow({ activationCode, onDelete }: ActivationCodeRowProps) {
    return (

        <FlexTableRow active={activationCode.active}>

            <div className="flex-1 text-left">
                {activationCode.code}
            </div>
            <div className="flex-1 text-right space-x-1">
                <ActionButton className="text-red-500" onAction={() => onDelete(activationCode.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </ActionButton>
            </div>
        </FlexTableRow>
    )


}