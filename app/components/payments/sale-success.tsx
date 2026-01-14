import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SaleSucessProps{
    message:string | null
}


export default function SaleSucess(props:SaleSucessProps){
    return(
    <div className="transition-all absolute w-full h-screen opacity-70 inset-0 z-[100] bg-green-800 flex flex-col gap-4 justify-center items-center text-white">
        <span className="text-9xl">
            <FontAwesomeIcon icon={faCheck}/>
        </span>
        {props.message &&
            (
                <h1 className="text-xl">
                    {props.message}
                </h1>
            )
        }    
    </div>
    )
}