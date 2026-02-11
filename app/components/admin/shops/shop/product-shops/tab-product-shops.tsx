import FlexTableHeaders from "@/app/components/flex-table/flex-table-headers";
import ActivationCodeRow from "../activation-codes/activation-code-row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function TabProductShops() {

    const handleDeleteActivationCode = (id: number) => {
        console.log("Delete activation code with id:", id);
    }

    const headers = [
        "Produto",

    ];

    return (
        <>

            <div className="flex flex-row mb-2 mx-2 gap-1">
                <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1 w-auto" onClick={() => { }}><FontAwesomeIcon icon={faPlus} />Novo Código de Ativação</button>
            </div>
            <div className="mx-2 rounded border-t border-r border-l">
                <FlexTableHeaders headers={headers} hasActionButton={true} />

            </div>
        </>
    )
}