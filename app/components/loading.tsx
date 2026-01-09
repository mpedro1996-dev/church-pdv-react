import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoadingProps{
    message:string | null
}


export default function Loading(props:LoadingProps){
    return(
    <div className="transition-all fixed inset-0 z-[100] w-full h-screen opacity-70 bg-black flex flex-col gap-4 justify-center items-center text-white">
        <span className="text-9xl animate-spin">
            <FontAwesomeIcon icon={faSpinner}/>
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