import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalEditProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

export default function ModalEdit(props: ModalEditProps) {

    return (

        <div className="transition-all fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white w-full m-96 p-4 rounded shadow-lg relative z-0 text-black flex flex-col">
                <div className="border-b rounded p-2 flex justify-between">
                    <h1 className="font-semibold">{props.title}</h1>
                    <button onClick={props.onClose}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <div className="flex flex-col gap-2 mt-1">
                    {props.children}
                </div>
            </div>
        </div>
    )

}